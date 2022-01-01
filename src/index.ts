import http from 'http';
import express from 'express';
import morgan from 'morgan';
import { ApolloServer, gql} from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { schema } from './schema';

import { dbConnect } from './helpers/dbConnect';

(async function () {
    const app = express();
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    const port = process.env.PORT || 3100;
    dbConnect();

    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: async ({ req }:any) => {
            return {
                token: req.headers.authorization || ""
            }
        }
    });

    await server.start();

    server.applyMiddleware({ app });
    httpServer.listen({ port });
    console.log('🚀 server run in port ==> ', port);

})()
