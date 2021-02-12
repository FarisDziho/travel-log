const mongoose = require('mongoose');
const { Schema } = mongoose;

const logEntrySchema = new Schema({
  title: {
    type: String,  
    required:true,
  },
  description: String,
  latitude:{
    type: Number,
    required:true,
  },
  longitude:{
    type: Number,
    required:true,
  },
  createdAt: { type: Date, default: Date.now },
});

const logEntry = mongoose.model('logEntry' , logEntrySchema);

module.exports = logEntry;