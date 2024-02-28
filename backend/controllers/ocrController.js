const { ocrSpace } = require('ocr-space-api-wrapper');
const Ingredient = require('../models/ingredient');

async function img_to_text (req, res) {
    const possible_prefix = ["ingredient", "ingredients", "ingredients:", "ingredient:"]
    let regexPattern = new RegExp(".*?(" + possible_prefix.join("|") + ")");

  try {
    const {buffer, mimetype} = req.file
    console.log(req.file)
    const base64String =  buffer.toString('base64');
    const dataUrl = `data:${mimetype};base64,${base64String}`;
    // console.log(dataUrl)
    
    // Using your personal API key + local file
    const res2 =  await ocrSpace(dataUrl, 
    { apiKey: 'K87754763988957' });
    console.log(res2);
    results = res2.ParsedResults;
    
    // should probably check for failing conditions, errors etc...
    // get the results
    let output_text = results[0].ParsedText
    output_text = output_text.toLowerCase()

    // remove words before "ingredient:"
    output_text = output_text.replace(regexPattern, "")

    // remove \r\n in text
    output_text = output_text.replace(/\r\n/g, ""); 

    // split based on '.' or ',' and remove whitespaces preceding and trailing it
    const ingredients = output_text.split(/[,.]/).map(s => s.trim());

    return res.status(200).json({data : ingredients});

    // return res.status(200).json({data : "empty"});
} catch (error) {
    console.error(error);
    return res.status(200).json({data : "empty"});
  }
}
async function get_text (req, res) {
    const possible_prefix = ["ingredient", "ingredients", "ingredients:", "ingredient:"]
    let regexPattern = new RegExp(".*?(" + possible_prefix.join("|") + ")");

  try {
    // Using your personal API key + local file
    const res2 =  await ocrSpace(test_ingredient_list, 
    { apiKey: 'K87754763988957' });
    results = res2.ParsedResults;

    // should probably check for failing conditions, errors etc...
    // get the results
    let output_text = results[0].ParsedText
    output_text = output_text.toLowerCase()

    // remove words before "ingredient:"
    output_text = output_text.replace(regexPattern, "")

    // remove \r\n in text
    output_text = output_text.replace(/\r\n/g, ""); 

    // split based on '.' or ',' and remove whitespaces preceding and trailing it
    const ingredients = output_text.split(/[,.]/).map(s => s.trim());

    return res.status(200).json({data : ingredients});
} catch (error) {
    console.error(error);
  }
}

module.exports = {get_text, img_to_text}

const test_ingredient_list = "https://www.christinahello.com/wp-content/uploads/2016/01/IMG_9982.jpg"

//also works for 
// data:image/jpeg;base64,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