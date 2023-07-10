import axios from "axios";
import mongoose from "mongoose";
import Earthquake from "./dataschema.js";
const ApiURL= 'https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json'

const ScrapeDataintoDB=async()=>{
    try{
        //fetch the data from the api
        const Apiresponse=await axios.get(ApiURL);
        const data = Apiresponse.data.Infogempa.gempa;

        // Store each earthquake data in MongoDB using Mongoose
        for (const earthquake of data) {
            const newEarthquakedetails = new Earthquake({
             DateTime: earthquake.DateTime,
            Region: earthquake.Wilayah,
            Magnitude: earthquake.Magnitude,
            Latitude: parseFloat(earthquake.Lintang),
            Longitude: parseFloat(earthquake.Bujur),
        });
  
        await newEarthquakedetails.save();
        }   
        console.log('Data stored successfully in MongoDB!');
    }catch (error) {
        console.error('Error scraping and storing data:', error);
    }

}

export default ScrapeDataintoDB;