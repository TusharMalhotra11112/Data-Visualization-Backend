const { query } = require('express');
const dataModel = require('../model/data')
const asyncHandeler = require('express-async-handler');
const { default: mongoose } = require('mongoose');

const setData = asyncHandeler(async(req,res)=>{
    const Data = await req.body;
    if(!Data){
        console.log("No Data Provided");
        res.send("No Data Provided");
        return
    }
    for(let i=0;i<Data.length;i++){

        var end_year=Data[i].end_year
        var intensity=Data[i].intensity
        var sector=Data[i].sector
        var topic=Data[i].topic
        var insight=Data[i].insight
        var url=Data[i].url
        var region=Data[i].region
        var start_year=Data[i].start_year
        var impact=Data[i].impact
        var added=Data[i].added
        var published=Data[i].published
        var country=Data[i].country
        var relevance=Data[i].relevance
        var pestle=Data[i].pestle
        var source=Data[i].source
        var title=Data[i].title
        var likelihood=Data[i].likelihood

        const data = await dataModel.create({end_year,intensity,sector,topic,insight,url,region,start_year,impact,added,published,country,relevance,pestle,source,title,likelihood});
        
        if(data){
            console.log("uploaded");
        }
        else{
            console.log("not uploaded");
        }

    }
    res.send("done");
})

const Upload = asyncHandeler(async(req,res)=>{
    const Data = await req.body;
    if(!Data){
        console.log("No Data Provided");
        res.send("No Data Provided");
        return
    }
    var end_year=Data.end_year
    var intensity=Data.intensity
    var sector=Data.sector
    var topic=Data.topic
    var insight=Data.insight
    var url=Data.url
    var region=Data.region
    var start_year=Data.start_year
    var impact=Data.impact
    var added=Data.added
    var published=Data.published
    var country=Data.country
    var relevance=Data.relevance
    var pestle=Data.pestle
    var source=Data.source
    var title=Data.title
    var likelihood=Data.likelihood

    const data = await dataModel.create({end_year,intensity,sector,topic,insight,url,region,start_year,impact,added,published,country,relevance,pestle,source,title,likelihood});
    
    if(data){
        console.log("uploaded");
    }
    else{
        console.log("not uploaded");
    }

    res.send("done");
})

const getIntensity = asyncHandeler(async(req,res)=>{
    const dt = await req.body.appliedFilter
    const query={
        $and:[
            {"start_year":{$ne:null}},
            {"end_year":{$ne:null}},
            {"end_year":{$lt:dt.end_year}},
            {"intensity":{$ne:null}},
        ]
    }
    
    if(dt.topic!==null){query["topic"]={$eq:dt.topic}}
    if(dt.sector!==null){query["sector"]={$eq:dt.sector}}
    if(dt.region!==null){query["region"]={$eq:dt.region}}
    if(dt.source!==null){query["source"]={$eq:dt.source}}
    const data = await dataModel.find(query).limit(50)
    res.send(data)
})

const getLikelyhood = asyncHandeler(async(req,res)=>{
    const dt = await req.body.appliedFilter
    const query = {
        $and:[
            {"likelihood":{$ne:null}},
            {"title":{$ne:null}},
        ]
    }

    if(dt.topic!==null){query["topic"]={$eq:dt.topic}}
    if(dt.sector!==null){query["sector"]={$eq:dt.sector}}
    if(dt.region!==null){query["region"]={$eq:dt.region}}
    if(dt.source!==null){query["source"]={$eq:dt.source}}

    const data = await dataModel.find(query).limit(30)
    res.send(data);
})

const getCountry = asyncHandeler(async(req,res)=>{
    const dt = await req.body.appliedFilter
    const query={
        $and:[
            {"end_year":{$lt:dt.end_year}},
            {"country":{$ne:""}},
            {"country":{$ne:null}}
        ]
    }
    
    if(dt.topic!==null){query["topic"]={$eq:dt.topic}}
    if(dt.sector!==null){query["sector"]={$eq:dt.sector}}
    // if(dt.region!==null){query["region"]={$eq:dt.region}}
    if(dt.source!==null){query["source"]={$eq:dt.source}}
    const data = await dataModel.find(query).limit(40)
    
    res.send(data)
})

const getRegional = asyncHandeler(async(req,res)=>{
    const dt = await req.body.appliedFilter
    const query={
        $and:[
            {"end_year":{$lt:dt.end_year}},
            {"region":{$ne:null}},
            {"region":{$ne:""}}
        ]
    }
    
    if(dt.topic!==null){query["topic"]={$eq:dt.topic}}
    if(dt.sector!==null){query["sector"]={$eq:dt.sector}}
    if(dt.source!==null){query["source"]={$eq:dt.source}}
    const data = await dataModel.find(query)
    res.send(data)
})

const getRelevance = asyncHandeler(async(req,res)=>{
    const dt = await req.body.appliedFilter
    const query={
        $and:[
            {"relevance":{$ne:null}},
            {"relevance":{$ne:""}},
            {"region":{$ne:null}},
            {"region":{$ne:""}}
        ]
    }
    if(dt.topic!==null){query["topic"]={$eq:dt.topic}}
    if(dt.sector!==null){query["sector"]={$eq:dt.sector}}
    if(dt.source!==null){query["source"]={$eq:dt.source}}

    const data = await dataModel.find(query)
    res.send(data)
})

const getTopic = asyncHandeler(async(req,res)=>{
    const dt = await req.body.appliedFilter
    const query={
        $and:[
            {"end_year":{$lt:dt.end_year}},
            {"topic":{$ne:null}},
            {"topic":{$ne:""}}
        ]
    }
    
    if(dt.sector!==null){query["sector"]={$eq:dt.sector}}
    if(dt.region!==null){query["region"]={$eq:dt.region}}
    if(dt.source!==null){query["source"]={$eq:dt.source}}
    const data = await dataModel.find(query)
    res.send(data)
})

const getSector =asyncHandeler(async(req,res)=>{
    const dt = await req.body.appliedFilter
    const query ={
        $and:[
            {"end_year":{$lt:dt.end_year}},
            {"sector":{$ne:""}},
            {"sector":{$ne:" "}},
            {"sector":{$ne:null}},
        ]
    }
    if(dt.topic!==null){query["topic"]={$eq:dt.topic}}
    if(dt.region!==null){query["region"]={$eq:dt.region}}
    if(dt.source!==null){query["source"]={$eq:dt.source}}
    
    const data = await dataModel.find(query)
    res.send(data)
})

const getSource =asyncHandeler(async(req,res)=>{
    const dt = await req.body.appliedFilter
    const query={
        $and:[
            // {"end_year":{$lt:dt.end_year}},
            {"source":{$ne:""}},
            {"source":{$ne:" "}},
            {"source":{$ne:null}},
        ]
    }
    if(dt.topic!==null){query["topic"]={$eq:dt.topic}}
    if(dt.sector!==null){query["sector"]={$eq:dt.sector}}
    if(dt.region!==null){query["region"]={$eq:dt.region}}
    const data = await dataModel.find(query)
    res.send(data)
})

const getTopicList = asyncHandeler(async(req,res)=>{
    const query={
        $and:[
            {"topic":{$ne:null}},
            {"topic":{$ne:""}}
        ]
    }
    const data = await dataModel.find(query)
    res.send(data)
})

const getSectorList =asyncHandeler(async(req,res)=>{
    const query ={
        $and:[
            {"sector":{$ne:""}},
            {"sector":{$ne:" "}},
            {"sector":{$ne:null}},
        ]
    }
    const data = await dataModel.find(query)
    res.send(data)
})

const getRegionList = asyncHandeler(async(req,res)=>{
    const query={
        $and:[
            {"region":{$ne:null}},
            {"region":{$ne:""}}
        ]
    }
    
    const data = await dataModel.find(query)
    res.send(data)
})

const getSourceList =asyncHandeler(async(req,res)=>{
    const query={
        $and:[
            {"source":{$ne:""}},
            {"source":{$ne:" "}},
            {"source":{$ne:null}},
        ]
    }
    const data = await dataModel.find(query)
    res.send(data)
})
module.exports = {setData,Upload,getLikelyhood,getCountry,getIntensity,getRegional,getTopic,getRelevance,getSector,getSource,getTopicList,getSectorList,getRegionList,getSourceList}