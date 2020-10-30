import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//


export const isAHoe = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});

  response.send({"isAHoe":"Kenneth and Rio"});
});

