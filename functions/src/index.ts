import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//


export const isAHoe = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});

  response.send({"isAHoe":"Kenneth and Rio"});
});




     
 
export const readFirebaseDatabase = functions.https.onRequest(async (request, response) => {
      functions.logger.info("Reading Data from the Firestore Database", {structuredData: true});

      const admin = require('firebase-admin');
      admin.initializeApp();
    
    const currentFile = await admin.firestore().collection('users').doc('userValues').get();
    currentFile.forEach((doc: { id: any; data: () => any; }) =>{
      console.log(doc.id,'=>', doc.data());
    });


       response.send({currentFile});
       


    
    });


    export const insertIntoDatabase = functions.https.onRequest((request, response) => {
      functions.logger.info("Insert data into database", {structuredData: true});

      const admin = require('firebase-admin');
      admin.initializeApp();

      const infoPayload = request.body;

      const docInsert = admin.firestore().collection('user').doc();

      const fName = infoPayload.fName;

      const lName = infoPayload.lName;

      if(lName != null && fName != null){

      if(lName == 'Briggs' && fName == 'Derio' || lName == "Ashwood" && fName == "Kenneth"){
      response.send({
        Message: "Invalid names."
      });
   
      
    }else{
      docInsert.set(infoPayload).then(()=> {
        functions.logger.info("Successfully inserted into the database", {structuredData: true});
        // expected output: "Success!"
      }).catch( (mistake: string) => {
        functions.logger.info("Unsuccessfully inserted into the database" + mistake, {structuredData: true});
          // expected output: "Success!"
           
        }
      )

      response.send({
        Message: "Data inserted"
      });

 }
  }else{
      response.send({
        Message: "No data matched the required format."
      });
    }



    });

  


