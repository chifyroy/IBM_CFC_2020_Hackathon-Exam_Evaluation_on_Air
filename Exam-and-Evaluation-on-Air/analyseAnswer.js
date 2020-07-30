//import DiscoveryV1 from 'ibm-watson/discovery/v1';
//import { IamAuthenticator } from 'ibm-watson/auth';

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({ apikey: '7bIS3c1uMcTZfpRAbwXZg5CoO0MCek7l4Jzr1kyPrHVJ' }),
  url: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/2bc79229-6475-4d5b-8a7d-b63c866c30b9',
});

const analyzeParams = {
  //'url': 'www.ibm.com',
  'text': 'The camel has many adaptive traits for their life in the desert.The camel has many adaptive traits for their life in the desert.They have wide feet for walking in sand. They have long eyelashes and thin, slit throat that they can close to protect them from blowing sand. They are adapted to survive a long time without water and food.Camel humps are made up of fat, not water.The fat can also be not mobilized for energy',
  'features': {
    'entities': {
      /*'emotion': true,
      'sentiment': true,
      'limit': 2,*/
      'model': '9f086d7c-22a7-4b10-ac35-d5d13a48939e',
    },
    /*'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2,
    },*/
  },
};

naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });