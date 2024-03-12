
const generatEmbeddings = async (word) => {
    let { pipeline } = await import('@xenova/transformers');

    const pipe = await pipeline('feature-extraction','Supabase/gte-small');

    const output = await pipe(word, {
        pooling: 'mean',
        normalize: true,
      });

    const embedding = JSON.stringify(Array.from(output.data));
    return embedding
} 

module.exports = {generatEmbeddings}