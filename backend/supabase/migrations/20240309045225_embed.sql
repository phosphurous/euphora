create function public.embed()
returns trigger
language plpgsql
as $$
declare
  ingredient_name text = TG_ARGV[0];
  embedding_column text = TG_ARGV[1];
  batch_size int = case when array_length(TG_ARGV, 1) >= 3 then TG_ARGV[2]::int else 5 end;
  timeout_milliseconds int = case when array_length(TG_ARGV, 1) >= 4 then TG_ARGV[3]::int else 5 * 60 * 1000 end;
  batch_count int = ceiling((select count(*) from inserted) / batch_size::float);
begin
  -- Loop through each batch and invoke an edge function to handle the embedding generation
  for i in 0 .. (batch_count-1) loop
  perform
    net.http_post(
      url := supabase_url() || '/functions/v1/embed',
      headers := jsonb_build_object(
        'Content-Type', 'application/json'
      ),
      body := jsonb_build_object(
        'ids', (select json_agg(ds.ingredient_id) from (select ingredient_id from inserted limit batch_size offset i*batch_size) ds),
        'table', 'ingredient',
        'contentColumn', ingredient_name,
        'embeddingColumn', embedding_column
      ),
      timeout_milliseconds := timeout_milliseconds
    );
  end loop;

  return null;
end;
$$;


create trigger embed_ingredient
  after insert on ingredient
  referencing new table as inserted
  for each statement
  execute procedure public.embed(ingredient_name, embedding);