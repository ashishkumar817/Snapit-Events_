import { createClient } from '@supabase/supabase-js';

export type GalleryImageRecord = {
  id: string;
  url: string;
  category: string;
  subCategory: string | null;
  altText: string;
  created_at: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
