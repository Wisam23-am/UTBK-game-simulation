import { supabase } from '@/lib/supabase/client';

// Development mode flag
export const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

// Mock user for development
export const DEV_USER = {
  id: 'dev-user-00000000-0000-0000-0000-000000000001',
  email: 'dev@utbk-game.com',
  username: 'DevTester',
  full_name: 'Development User',
  avatar_url: '',
  school: 'Dev School',
  target_university: 'Dev University',
  total_games: 0,
  best_score: 0,
};

// Get current user (with dev mode support)
export async function getCurrentUser() {
  if (DEV_MODE) {
    console.log('🔧 DEV MODE: Using mock user');
    return { user: DEV_USER, error: null };
  }

  try {
    // Check if session exists first to reduce warnings
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return { user: null, error: null };
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Auth error:', error);
      return { user: null, error };
    }

    return { user, error: null };
  } catch (error) {
    console.error('Get user error:', error);
    return { user: null, error };
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  if (DEV_MODE) {
    return true;
  }

  const { user } = await getCurrentUser();
  return !!user;
}

// Get user profile from database (auto-create if not exists)
export async function getUserProfile(userId?: string) {
  if (DEV_MODE && !userId) {
    return { profile: DEV_USER, error: null };
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId || DEV_USER.id)
    .single();

  if (error) {
    // If profile not found, create it automatically
    if (error.code === 'PGRST116') {
      console.log('⚠️ Profile not found for user:', userId, '- Creating new profile...');
      
      // Get user data from auth
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Create new profile
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: user.id,
            username: user.email?.split('@')[0] || 'user',
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            avatar_url: user.user_metadata?.avatar_url || '',
            school: '',
            target_university: '',
            total_games: 0,
            best_score: 0,
          }])
          .select()
          .single();
        
        if (createError) {
          console.error('❌ Error creating profile:', createError);
          return { profile: null, error: createError };
        }
        
        console.log('✅ Profile created successfully:', newProfile);
        return { profile: newProfile, error: null };
      }
      
      return { profile: null, error: null };
    }
    
    console.error('❌ Get profile error:', error);
    return { profile: null, error };
  }

  return { profile, error: null };
}

// Sign out user
export async function signOut() {
  if (DEV_MODE) {
    console.log('🔧 DEV MODE: Simulating sign out');
    localStorage.clear();
    return { error: null };
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error);
  }
  return { error };
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  updates: Partial<typeof DEV_USER>
) {
  if (DEV_MODE) {
    console.log('🔧 DEV MODE: Simulating profile update', updates);
    return { profile: { ...DEV_USER, ...updates }, error: null };
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Update profile error:', error);
    return { profile: null, error };
  }

  return { profile, error: null };
}
