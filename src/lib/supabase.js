import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jhxdamqubuulffbdusvm.supabase.co';
const supabaseKey = 'sb_publishable_PAZXb7BOgGY7i9QMkXbGXg_MzeD5jXb';

export const supabase = createClient(supabaseUrl, supabaseKey);
