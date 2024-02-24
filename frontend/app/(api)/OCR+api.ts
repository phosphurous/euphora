const { ocrSpace } = require('ocr-space-api-wrapper');
import { ExpoRequest, ExpoResponse } from 'expo-router/server';

export async function GET(request: ExpoRequest) {
    try {
      // Using the OCR.space default free API key (max 10reqs in 10mins) + remote file
    
      // Using your personal API key + local file
      const res2 = await ocrSpace('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKVeBi3Bhm5rxgYw9LscBLeUZ1grK9wj9NfQ&usqp=CAU', { apiKey: 'K87754763988957' });
      console.log(res2);
      return ExpoResponse.json({ hello: 'ok' });
    } catch (error) {
      console.error(error);

      return ExpoResponse.json({ hello: 'not ok' });
    }
}
