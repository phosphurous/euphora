npx supabase secrets list
supabase functions serve [flags]

select vault.create_secret(
  'insert-SUPABASE-URL-HERE',
  'supabase_url'
);

select * 
from vault.decrypted_secrets 
order by created_at desc 
limit 3;

select
  vault.update_secret(
    'secret-uuid here',
    'SECRET-HERE',
    'SECRET-NAME-HERE'
  );


combo

npx supabase db reset
npx supabase migrations up
npx supabase functions serve --no-verify-jwt
