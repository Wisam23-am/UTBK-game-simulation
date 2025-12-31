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
  username: string,
  fullName?: string
) {
  const supabase = await createClient();

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
    full_name: fullName || username,
    avatar_url: '',
    school: '',
    target_university: '',
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
