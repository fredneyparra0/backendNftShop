import { model, Schema } from 'mongoose';

import { newsCollection } from '../nameCollections';

export const SchemaNews = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: new Date
    },
    dateOfUpdated: {
        type: Date,
        default: new Date
    }
});

export const modelNews =  model(newsCollection, SchemaNews);