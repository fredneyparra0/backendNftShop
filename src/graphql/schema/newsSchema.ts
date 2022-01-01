import { composeWithMongoose } from 'graphql-compose-mongoose';

import { modelNews } from '../../models/newsModel';
import * as useCases from '../useCases/newsUseCase';
import { authToken } from '../../helpers/validateToken';

const NewsTC = composeWithMongoose(modelNews);

NewsTC.addResolver({
    name: 'getAllNotices',
    type: [NewsTC],
    resolve: async ({ source, args, context }:any) => {
        return await useCases.findAllNews();
    }
});

NewsTC.addResolver({
    name: 'getOneNews',
    args: { idNews: 'String' },
    type: NewsTC,
    resolve: async ({ source, args, context }:any) => {
        return await useCases.findOneNews(args.idNews);
    }
});

NewsTC.addResolver({
    name: 'createOneNotice',
    args: { content: "JSON" },
    type: NewsTC,
    resolve: async ({ source, args, context }:any) => {
        authToken(context.token);
        return await useCases.createOneNews(args.content);
    }
});

NewsTC.addResolver({
    name: 'updateOneNotice',
    args: { idNews: "String" ,content: "JSON" },
    type: NewsTC,
    resolve: async ({source, args, context}:any) => {
        authToken(context.token);
        return await useCases.updateOneNews(args.idNews, args.content);
    }
});

NewsTC.addResolver({
    name: 'deleteOneNews',
    args: { idNews: "String" },
    type: NewsTC,
    resolve: async ({ source, args, context }:any) => {
        authToken(context.token);
        return await useCases.deteleOneNews(args.idNews);
    }
});

export const newsQuery = {
    newsAll: NewsTC.getResolver('getAllNotices'),
    newsOneById: NewsTC.getResolver('getOneNews')
}

export const newsMutation = {
    createOneNews: NewsTC.getResolver('createOneNotice'),
    updateOneNews: NewsTC.getResolver('updateOneNotice'),
    deleteOneNews: NewsTC.getResolver('deleteOneNews')
}