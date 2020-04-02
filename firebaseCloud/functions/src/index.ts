import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export const firstLogin = functions.auth.user().onCreate((user, context) => {
    const x =1;
    console.log(x);
});