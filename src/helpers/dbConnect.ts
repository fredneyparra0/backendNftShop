import { connect } from 'mongoose';

export const dbConnect = async () => {
    var options = {
        user: 'fredney',
        pass: 'estrella1215'
        }

    try {
        await connect(process.env.URI || 'mongodb://localhost/nftShop')
        //await connect('mongodb://nftShop:estrella1215@localhost/nftShop');
        //await connect('mongodb://root:estrella1215@localhost:27017/nftShop')
        console.log('connected successfully to database');
    } catch (err) {
        console.log('*** Error to connect *** ', err);
    }
}