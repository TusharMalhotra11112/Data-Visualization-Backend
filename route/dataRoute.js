const express = require('express')
const { getLikelyhood , setData, getCountry, getIntensity, getRegional, getTopic, getRelevance, Upload, getSector, getSource, getTopicList, getSectorList, getRegionList, getSourceList } = require('../controller/dataController')
const Router = express.Router();

Router.get('/set',setData);
Router.post('/upload',Upload);

Router.post('/getIntensity',getIntensity);
Router.post('/getLikelyhood',getLikelyhood);
Router.post('/getRelevance',getRelevance);
Router.post('/getCountry',getCountry);
Router.post('/getTopic',getTopic);
Router.post('/getRegional',getRegional);
Router.post('/getSector',getSector);
Router.post('/getSource',getSource);

Router.post('/getTopicList',getTopicList);
Router.post('/getSectorList',getSectorList);
Router.post('/getRegionList',getRegionList);
Router.post('/getSourceList',getSourceList);


module.exports = Router 