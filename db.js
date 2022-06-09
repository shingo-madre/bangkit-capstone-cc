// const firebase = require('firebase');
// const config = require('./config');

// const db = firebase.initializeApp(config.firebaseConfig);

const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'protean-torus-344012',
  keyFilename: './protean-torus-344012-3d77ed15505c.json',
});

module.exports = db;


