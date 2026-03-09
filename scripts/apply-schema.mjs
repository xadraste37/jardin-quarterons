/**
 * Applies the Supabase schema by running the SQL via the pg REST API.
 * Uses SUPABASE_SERVICE_ROLE_KEY from .env.local
 *
 * NOTE: If this script fails, run supabase/schema.sql manually in:
 * https://supabase.com/dashboard/project/blkzckjwlpuxqckduypi/sql/new
 */
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test by checking if tables exist
const { error } = await supabase.from('qj_parcours').select('id').limit(1);

if (error?.code === 'PGRST205') {
  console.log('❌ Tables not found in Supabase.');
  console.log('\nPlease run the SQL schema manually:');
  console.log('1. Go to: https://supabase.com/dashboard/project/blkzckjwlpuxqckduypi/sql/new');
  console.log('2. Paste the contents of: supabase/schema.sql');
  console.log('3. Click "Run"');
  console.log('4. Then run: npm run seed');
  process.exit(1);
} else if (error) {
  console.error('Unexpected error:', error);
  process.exit(1);
} else {
  console.log('✅ Tables already exist. Ready to seed!');
  console.log('Run: npm run seed');
}
