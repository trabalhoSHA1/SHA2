import { createClient } from '@supabase/supabase-js';
require('dotenv').config();
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
