require('dotenv').config({
    path: 'variables.env'
});
const admin = require("firebase-admin");

const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


let serviceAccount = null;

try {
    serviceAccount = require(`../${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
} catch (error) {
    console.log("No serviceAccount... set")
}

if (!serviceAccount) throw new Error('No serviceAccount set for Firebase, did you set process.env.GOOGLE_APPLICATION_CREDENTIALS ? ');

if (serviceAccount && !serviceAccount.private_key) throw new Error('No private_key in the Firebase service account, did you set a valid JSON service account in your project');


exports.admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

exports.db = getFirestore();