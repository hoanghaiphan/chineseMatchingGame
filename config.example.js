/**
 * Shared image library config (Supabase).
 *
 * Setup:
 * 1. Create a free project at https://supabase.com
 * 2. Run supabase/schema.sql in the SQL Editor
 * 3. Copy this file to config.js and fill in your project URL + anon key
 * 4. Deploy config.js with the site (anon key is safe for browser use with RLS)
 *
 * config.js is gitignored by default if you add it — keep secrets out of public repos
 * only if you use a restricted service role (do NOT put service_role in the browser).
 * The anon key is designed to be public when RLS policies are set correctly.
 */
window.IMAGE_LIBRARY_CONFIG = {
  // Project Settings → API → Project URL
  supabaseUrl: 'https://YOUR_PROJECT_REF.supabase.co',
  // Project Settings → API → anon public key
  supabaseAnonKey: 'YOUR_ANON_KEY',
  // Table name from schema.sql
  table: 'chinese_word_images',
};
