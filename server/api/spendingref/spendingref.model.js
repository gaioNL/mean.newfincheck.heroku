'use strict';

//import mongoose from 'mongoose';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

console.log("passa PRIMA Spendingref.model ");

var SpendingrefSchema = new Schema({
country: {
    type: String,
    required: true,
    default: '' 
},
agegroup: {
    type: String,
    required: true,
    default: '' 
},
status: {
    type: String,
    required: true,
    default: '' 
},
incomegroup:{
    type: String,
    required: true,
    default: '' 
},
housetype: {
    type: String,
    required: true,
    default: '' 
},
cartype: {
    type: String,
    required: true,
    default: '' 
},
house: {
    type: Number
},
utilities: {
    type: Number
},
insurance: {
    type: Number 
},
education: {
    type: Number
},
transport: {
    type: Number 
},
housing: {
    type: Number 
}
}, 
    {
    timestamps: true
});

console.log("passa DOPO Spendingref.model " + SpendingrefSchema);

//export default mongoose.model('Spendingref', SpendingrefSchema);
//module.exports.default = mongoose.model('Spendingref', SpendingrefSchema);

var Spendingrefs = mongoose.model('Spendingref', SpendingrefSchema);

module.exports = Spendingrefs;