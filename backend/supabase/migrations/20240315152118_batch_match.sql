CREATE OR REPLACE FUNCTION batch_match (
  embedding_list json[],
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  query_ingredient TEXT,
  ingredient_id BIGINT,
  ingredient_name TEXT,
  similarity FLOAT
)
LANGUAGE SQL STABLE
AS $$
WITH query_embeddings AS (
  SELECT
    elem->>'query_ingredient' AS query_ingredient,
    (elem->>'embedding')::vector(384) AS query_embedding
  FROM
    unnest(embedding_list) AS elem
)
SELECT
  q.query_ingredient AS query_ingredient,
  i.ingredient_id,
  i.ingredient_name,
  1 - (i.embedding <=> q.query_embedding) AS similarity
FROM
  query_embeddings q
JOIN
  ingredient i ON 1 - (i.embedding <=> q.query_embedding) > match_threshold
ORDER BY
  (i.embedding <=> q.query_embedding) ASC
LIMIT
  match_count;
$$;
