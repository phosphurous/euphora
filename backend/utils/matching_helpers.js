
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

const generateBatchEmbed = async (listOfWords) => {
    let { pipeline } = await import('@xenova/transformers');
    const pipe = await pipeline('feature-extraction','Supabase/gte-small');

    const output = [];
    for (const word of listOfWords) {
        const embed = await pipe(word, {
            pooling: 'mean',
            normalize: true,
          })
          const embedding = JSON.stringify(Array.from(embed.data));
          output.push(embedding)
    }
    return output;
}

module.exports = {generatEmbeddings, generateBatchEmbed}