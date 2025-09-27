import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project values
const SUPABASE_URL = 'https://wztqimzxyfsedozseqxt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6dHFpbXp4eWZzZWRvenNlcXh0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Njk2NjYzNSwiZXhwIjoyMDcyNTQyNjM1fQ.AQjnD_miVhCQUsdTpYgJXcQLN5bRwFioDt3CU-M_FCI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
