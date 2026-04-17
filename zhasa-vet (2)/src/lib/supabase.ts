import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only initialize the client if we have valid credentials to prevent startup crash
// If keys are missing, we export a proxy that logs a helpful error when used
export const supabase = (supabaseUrl && supabaseUrl.startsWith('http')) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : new Proxy({} as any, {
      get: () => {
        console.warn('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
        return () => ({
          from: () => ({
            select: () => Promise.resolve({ data: [], error: null }),
            insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
            order: () => Promise.resolve({ data: [], error: null }),
            eq: () => Promise.resolve({ data: [], error: null }),
            match: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
            delete: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
          }),
        });
      }
    });

export const isSupabaseConfigured = !!(supabaseUrl && supabaseUrl.startsWith('http') && supabaseAnonKey);
