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

  // Validate password strength (server-side validation)
  const passwordRegex = {
    minLength: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  if (!passwordRegex.minLength) {
    return { user: null, error: 'Password harus minimal 8 karakter' };
  }
  if (!passwordRegex.hasLetter) {
    return { user: null, error: 'Password harus mengandung huruf' };
  }
  if (!passwordRegex.hasNumber) {
    return { user: null, error: 'Password harus mengandung angka' };
  }
  if (!passwordRegex.hasSpecialChar) {
    return { user: null, error: 'Password harus mengandung karakter khusus (!@#$%^&*)' };
  }

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
  console.log('Creating profile with data:', { 
    userId: authData.user.id, 
    username, 
    fullName, 
    school: school || '', 
    targetUniversity: targetUniversity || '' 
  });

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
    // Even if profile creation fails, return success since auth user is created
    // User can update profile later
    return { 
      user: authData.user, 
      error: 'Akun dibuat tapi gagal menyimpan data profil. Silakan update profil Anda di halaman profil.'
    };
  }

  console.log('Profile created successfully');

  return { user: authData.user, error: null };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

// Export aliases for convenience
export { signInAction as signIn, signUpAction as signUp, signOutAction as signOut };
