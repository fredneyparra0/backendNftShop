import { Schema, model, Mongoose } from 'mongoose';
import { newsCollection, ProductsCollection, user } from '../nameCollections';

export const SchemaProduct = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: newsCollection
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        maxlength: 250
    },
    image: {
        type: String
    },
    priceEth: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    dateOfCreated: {
        type: Date, 
        default: new Date
    },
    dateUpdated: {
        type: Date,
        default: new Date
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
});

export const modelProduct = model(ProductsCollection, SchemaProduct);