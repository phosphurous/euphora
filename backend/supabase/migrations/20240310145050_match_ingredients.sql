create or replace function match_ingredients (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  ingredient_id bigint,
  ingredient_name text,
  similarity float
)
language sql stable
as $$
  select
    ingredient.ingredient_id,
    ingredient.ingredient_name,
    1 - (ingredient.embedding <=> query_embedding) as similarity
  from ingredient
  where 1 - (ingredient.embedding <=> query_embedding) > match_threshold
  order by (ingredient.embedding <=> query_embedding) asc
  limit match_count;
$$;
