'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
  	//: process.env.MONGOLAB_URI
    uri: process.env.MONGOLAB_URI || 'mongodb://localhost/newfincopen-dev'
  },

  // Seed database on startup
  seedDB: true

};
