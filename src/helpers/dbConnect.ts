import { connect } from 'mongoose';

export const dbConnect = async () => {
    try {
        await connect(process.env.URI || 'mongodb://localhost/nftShop');
        console.log('connected successfully to database');
    } catch (err) {
        console.log('*** Error to connect *** ', err);
    }
}