import { model, Schema } from 'mongoose';
import { user } from '../nameCollections';

export const SchemaUser = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    pass: {
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
    }
});

export const modelUser = model(user, SchemaUser);