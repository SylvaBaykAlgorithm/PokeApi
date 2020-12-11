import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
   
 
export const readFirebaseDatabase = functions.https.onRequest(async (request, response) => {
      functions.logger.info("Reading Data from the Firestore Database", {structuredData: true});
    
    const currentFile = await admin.firestore().collection('users').doc('userValues').get();
    


       response.send(currentFile.data());
       


    
    });


    export const insertIntoDatabase = functions.https.onRequest((request, response) => {
      functions.logger.info("Insert data into database", {structuredData: true});

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
    };

 });

  
    export const getDataFromDatabase = functions.https.onRequest( async (request, response) => {
      functions.logger.info("Reading Data from the Firestore Database", {structuredData: true});

    
      const queryRequest = request.query.databaseId;
      if(!(queryRequest)){
        response.send({
          Message: "No data matched the required format."
        });

      const queryInsert = await admin.firestore().collection('user').doc(queryRequest).get();
      //const docInsert = admin.firestore().collection('user').doc();
      
        if(queryInsert.exists){
          response.send(queryInsert.data());
        }else{
          response.send({
            Message: "There is no file in the db with that ID."
          });
        }
      }


    });

    export const getDataFromPokemonDatabase = functions.https.onRequest( async (request, response) => {
      functions.logger.info("Reading Pokemon Data from the Firestore Database using query request", {structuredData: true});

      const pokemonRequest = request.query.pokemonName;

      if(!(pokemonRequest)){
        response.send({
          Message: "No request given."
        });
      }

      const pokemonData = await admin.firestore().collection('pokemonDatabase').doc(pokemonRequest).get();

      if(pokemonData.exists){
        response.send(pokemonData.data());

      }else{
        response.send({
          Message: "No sucha pokemon!"
        });
      }

    });
    
    export const InsertDataIntoPokemonDatabase = functions.https.onRequest((request, response) => {
      functions.logger.info("Inserting data into Pokemon Database", {structuredData: true});

      const pokemonInfo = request.body;

      if (!(pokemonInfo)){
        response.send({
          Message: "No information to add."
        });
      }
      const pokemonName = pokemonInfo.name;
      const pokemonWeight = pokemonInfo.weight;
      const pokemonNum = pokemonInfo.listNumber;
      const pokemonHeight = pokemonInfo.height;
      const pokemonEvolve = pokemonInfo.evolve;

      if(pokemonHeight == null){
        response.send({
          Message: "No height to insert."
        });
      }
      if(pokemonWeight == null){
        response.send({
          Message: "No weight to insert."
        });
      }

      if(pokemonEvolve == null){
        response.send({
          Message: "Can not determin whether the pokemon evolve or not."
        });
      }
      
      if(pokemonNum == null){
        response.send({
          Message: "No list number to insert."
        });
      }

      const pokemonInsert = admin.firestore().collection('pokemonDatabase');

      pokemonInsert.doc(pokemonName).set(pokemonInfo).then(()=> {
        functions.logger.info("Successfully inserted into the database", {structuredData: true});
        // expected output: "Success!"
      }).catch( (mistake: string) => {
        functions.logger.info("Unsuccessfully inserted into the database" + mistake, {structuredData: true});
          // expected output: "No Success!"
           
        }
      );
      response.send({
        Message: "Pokemon inserted into database."
      });


    });

    export const DeleteDataFromPokemonDatabase = functions.https.onRequest((request, response) => {
      functions.logger.info("Inserting data into Pokemon Database", {structuredData: true});
      
      const pokemonName = request.body.name;

      const pokemonDoc = admin.firestore().collection('pokemonDatabase').doc(pokemonName);

      if(!(pokemonDoc)){
        response.send({
          Message: "No Pokemon to delete."

        });
      };

      pokemonDoc.delete().then(() => {
        functions.logger.info("Successfully deleted data from the database", {structuredData: true});
        // expected output: "Success!"
      }).catch( (mistake: string) => {
        functions.logger.info("Unsuccessfully deleted data from the database" + mistake, {structuredData: true});
          // expected output: "No Success!"
           
        
      });

      response.send({
        Message: "Pokemon removed."

      });



    });

    // export const getAllFromDatabase = functions.https.onRequest(async (request, response) => {

    //   const pokemonFile =  await admin.fiestore().collection('pokemonDatabase').get();

    //   response.send(pokemonFile.data());

    // });
