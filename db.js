// const firebase = require('firebase');
// const config = require('./config');

// const db = firebase.initializeApp(config.firebaseConfig);

const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'protean-torus-344012',
  keyFilename: '\protean-torus-344012-36c039628269.json',
});

module.exports = db;


