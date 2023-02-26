const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    offer_id: { type: String, required: true},
    offer_title: { type: String, required: true },
    offer_description: { type: String, required: true },
    offer_image: { type: String, required: true },
    offer_sort_order: { type: String, required: true },
    content:{
        item_id: String ,
        quantity: Number,
    },
    schedule:{
        days_of_week: Number,
        dates_of_month: Number,
        months_of_year: Number,
    },

});

const model = mongoose.model('post', Post)

module.exports = model;