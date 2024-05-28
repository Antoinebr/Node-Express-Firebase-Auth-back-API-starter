const { db } = require('../services/firebase.js');



exports.getUserData = async (uid) => {

    const docRef = db.collection('users').doc(uid);

    const doc = await docRef.get();

    if (doc.exists) {
        return doc.data();
    }


    return uid;

}




exports.saveTokenForUser = async (uid,tokens) => {

    const docRef = db.collection('users').doc(uid)

    const response = await docRef.set({['tokens']: tokens},{merge: true});

    return response;

}



exports.getUserHubSpotTokens = async (uid) => {

    const docRef = db.collection('users').doc(uid);

    const doc = await docRef.get();

    if (!doc.exists) throw new Error(`This user ${uid} doesn't exist in the db`);

    const response = await doc.data();

    if (!response.tokens && response.tokens.accessToken && !response.tokens.refreshToken)  throw new Error(`This user ${uid} doesn't have tokens set`);

    return response.tokens;
}






exports.getUserAccessToken = async (uid) => {

    if (!uid) throw new Error(`No uid set as a parameter for getUserAccessToken() we got : -> ${uid} <- with type ${typeof uid}`);

    const docRef = db.collection('users').doc(uid)

    const doc = await docRef.get();

    console.log('User Access Token from fireStore', doc.data().tokens);

    if (doc.exists) {
        if(doc.data().tokens){

            return doc.data().tokens;
        }

    }


}