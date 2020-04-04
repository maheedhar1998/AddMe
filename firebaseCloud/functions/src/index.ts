import * as functions from 'firebase-functions';
// import * as firebase from 'firebase';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export const firstLogin = functions.auth.user().onCreate((user, context) => {
    //firebase.database().ref();
    return {user: user, context: context};
});