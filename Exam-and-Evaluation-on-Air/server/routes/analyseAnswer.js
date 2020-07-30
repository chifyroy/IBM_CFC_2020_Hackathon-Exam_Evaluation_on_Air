const express = require('express');
const router = express.Router();
const dbDetails = require('../../dist/assets/data/dbDetails.json');

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: dbDetails.dbDetails[0].version,
  authenticator: new IamAuthenticator({ apikey: dbDetails.dbDetails[0].apiKey }),
  url: dbDetails.dbDetails[0].url,
});

  router.get('/analyseAnswer', function(req, res){
  const analyzeParams = {
    'text': 'The camel has many adaptive traits for their life in the desert.The camel has many adaptive traits for their life in the desert.They have wide feet for walking in sand. They have long eyelashes and thin, slit throat that they can close to protect them from blowing sand. They are adapted to survive a long time without water and food.Camel humps are made up of fat, not water.The fat can also be not mobilized for energy',
    'features': {
      'entities': {
        'model': '9f086d7c-22a7-4b10-ac35-d5d13a48939e',
      },
    },
  };

  naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults.result, null, 2));
    res.send(JSON.stringify(analysisResults.result, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
});

  router.get('/analyseAnswer/:modelId/:text', function(req, res){
    const analyzeParams = {
      'text': req.params.text,
      'features': {
        'entities': {
          'model': req.params.modelId,
        },
      },
    };
  
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      console.log(JSON.stringify(analysisResults.result, null, 2));
      res.send(JSON.stringify(analysisResults.result, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });
  });


  router.get('/analyseAnswer/:text', function(req, res){
    const analyzeParams = {
      'text': req.params.text,
      'features': {
        'entities': {
          'model': dbDetails.dbDetails[0].modelId,
        },
      },
    };
  
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      console.log(JSON.stringify(analysisResults.result, null, 2));
      res.send(JSON.stringify(analysisResults.result, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
      res.send(err);
    });
  });

  module.exports = router;