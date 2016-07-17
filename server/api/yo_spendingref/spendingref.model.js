'use strict';

import mongoose from 'mongoose';

var SpendingrefSchema = new mongoose.Schema({
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

export default mongoose.model('Spendingref', SpendingrefSchema);
