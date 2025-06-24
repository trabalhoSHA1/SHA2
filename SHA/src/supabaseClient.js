import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://seu-projeto.supabase.co'; // troque pelo seu URL do Supabase
const supabaseAnonKey = 'chave-anonima-aqui'; // troque pela sua anon key do Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
