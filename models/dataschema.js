import mongoose from "mongoose";
const DBSchema = new mongoose.Schema({
    DateTime: String,
    Region:{
      type: String,
      unique:true,
    },
    Magnitude: Number,
    Latitude: Number,
    Longitude: Number,
  });
  
  const Earthquake = mongoose.model('earthquakedata', DBSchema);

  export default Earthquake;