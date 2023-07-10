//import express library 
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ScrapeDataintoDB from "./models/data.js";
import mongoose from "mongoose";
import Earthquake from "./models/dataschema.js";
import path from "path";
// Initialize Express
var app = express();
dotenv.config();

// Configure middleware
// Parse request body as JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.get("/earthquakedata",async(req,res)=>{
    try{
    const result=await Earthquake.find().lean();
    
    const geojsonData = {
    type: 'EarthquakedataCollection',
    objects:{
    output:{
      type: 'GeometryCollection',
      geometrics: result.map((earthquake) => ({
        type: 'Point',
         properties: {
        DateTime: earthquake.DateTime,
        Region: earthquake.Region,
        Magnitude: earthquake.Magnitude,
         },
        coordinates: [earthquake.Longitude, earthquake.Latitude],
      }))
    },
    },
    }
    res.status(200).json({
        statusCode:200,
        data: geojsonData,
    });
} catch (error) {
  console.error('Error fetching data:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
})

//connection to mongodb

mongoose.connect(process.env.DATABASE)
.then(()=>console.log("connected to mongodb"))
 .catch(e=>console.log(e));

 
 //check if data already exists in the database if yes skip the scrape data function else call the scrap data function
const dataCount = await Earthquake.countDocuments();
  if (dataCount === 0) {
    // Data not found, scrape and store the data
    ScrapeDataintoDB();
  } else {
    console.log('Data already exists in the database. Skipping scrape data function.');
  }
// Start the server
var PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
