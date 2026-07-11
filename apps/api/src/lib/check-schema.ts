// Check remote Supabase schema

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzbtmvzidmrnbcgyonlu.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6YnRtdnppZG1ybmJjZ3lvbmx1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjU4NDcwNywiZXhwIjoyMDk4MTYwNzA3fQ.Lyux_w1TegynR20Q-uci5rNbs0ojeNWCMlzWuQDCAb4';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function checkSchema() {
  // Get all tables
  const { data: tables, error } = await supabase
    .rpc('get_tables');
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log('Tables:', tables);
}

checkSchema();
