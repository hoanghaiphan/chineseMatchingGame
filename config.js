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
  supabaseUrl: 'https://bvizbknpmqczwdygaope.supabase.co',
  // Project Settings → API → anon public key
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aXpia25wbXFjendkeWdhb3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NDk5NjIsImV4cCI6MjEwMDMyNTk2Mn0.g_AUO5RAsv1HGRTqrEgEWCo3N7TkYZgW8xnfuYFoEa0',
  // Table name from schema.sql
  table: 'chinese_word_images',
};
