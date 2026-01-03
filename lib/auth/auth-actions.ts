'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signInAction(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { user: null, error: error.message };
  }

  return { user: data.user, error: null };
}

export async function signUpAction(
  email: string,
  password: string,
  fullName: string,
  school?: string,
  targetUniversity?: string
) {
  const supabase = await createClient();

  // Generate username from full name (lowercase, no spaces)
  const username = fullName.toLowerCase().replace(/\s+/g, '') || email.split('@')[0];

  // 1. Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return { user: null, error: authError.message };
  }

  if (!authData.user) {
    return { user: null, error: 'Failed to create user' };
  }

  // 2. Create profile
  const { error: profileError } = await supabase.from('profiles').insert({
    id: authData.user.id,
    username,
    full_name: fullName,
    school: school || '',
    target_university: targetUniversity || '',
    avatar_url: '',
  });

  if (profileError) {
    console.error('Profile creation error:', profileError);
    // User created but profile failed - they can update later
  }

  return { user: authData.user, error: null };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

// Export aliases for convenience
export { signInAction as signIn, signUpAction as signUp, signOutAction as signOut };
