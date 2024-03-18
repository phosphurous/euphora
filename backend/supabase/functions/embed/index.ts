
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { env, pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.5.0'

env.useBrowserCache = false;
env.allowLocalModels = false;


const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

const pipe = await pipeline(
'feature-extraction',
'Supabase/gte-small',
);

// Deno.serve(async (req) => {
//     // Extract input string from JSON body
//     const { input } = await req.json();
  
//     // Generate the embedding from the user input
//     const output = await pipe(input, {
//       pooling: 'mean',
//       normalize: true,
//     });
  
//     // Extract the embedding output
//     const embedding = Array.from(output.data);
  
//     // Return the embedding
//     return new Response(
//       JSON.stringify({ embedding }),
//       { headers: { 'Content-Type': 'application/json' } }
//     );
//   });



Deno.serve(async (req) => {

    console.log("supabase", supabaseUrl, supabaseAnonKey)
    if (!supabaseUrl || !supabaseAnonKey) {
        return new Response(
          JSON.stringify({
            error: 'Missing environment variables.',
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

  
    const { ids, table, contentColumn, embeddingColumn } = await req.json();
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log("checkpoint 0")

    const { data: rows, error: selectError } = await supabase
    .from(table)
    .select(`ingredient_id, ${contentColumn}` as '*')
    .in('ingredient_id', ids)
    .is(embeddingColumn, null);
    console.log("checkpoint 1")

  if (selectError) {
    return new Response(JSON.stringify({ error: selectError }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  console.log("checkpoint 2")


  for (const row of rows) {
    const { ingredient_id, ingredient_name: content } = row;
    console.log("this is row", row, "followed by content", content)

    if (!content) {
      console.error(`No content available in column '${contentColumn}'`);
      continue;
    }

    // Generate the embedding from the user input
    const output = await pipe(content, {
        pooling: 'mean',
        normalize: true,
      });

    const embedding = JSON.stringify(Array.from(output.data));

    const { error } = await supabase
      .from(table)
      .update({
        [embeddingColumn]: embedding,
      })
      .eq('ingredient_id', ingredient_id);

      if (error) {
        console.error(
          `Failed to save embedding on '${table}' table with id ${ingredient_id}`
        );
      }
    console.log("checkpoint 3")
    
    console.log(
        `Generated embedding ${JSON.stringify({
          table,
          ingredient_id,
          contentColumn,
          embeddingColumn,
        })}`
      );
    }
    console.log("checkpoint 4")

    
  return new Response(null, {
    status: 204,
    headers: { 'Content-Type': 'application/json' },
  });

  });



