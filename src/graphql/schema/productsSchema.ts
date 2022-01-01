import { composeWithMongoose } from 'graphql-compose-mongoose';

import * as useCases from '../useCases/ProductsUseCase';
import { modelProduct } from '../../models/productModel';
import { authToken } from '../../helpers/validateToken';
import { GraphQLBoolean } from 'graphql';

const ProductsTC = composeWithMongoose(modelProduct);

ProductsTC.addResolver({
    name: 'getAllProducts',
    args: {},
    type: [ProductsTC],
    resolve: async ({ source, args, context }:any) => {
        return await useCases.getAllProducts();
    }
});

ProductsTC.addResolver({
    name: 'getProductById',
    args: { idProduct: "String" },
    type: ProductsTC,
    resolve: async ({source, args, context}:any) => {
        return await useCases.getProductById(args.idProduct);
    }
});

ProductsTC.addResolver({
    name: 'createProduct',
    args: { data: 'JSON' },
    type: ProductsTC,
    resolve: async ({source, args, context}:any) => {
        return await useCases.createProduct(args.data);
    }
});

ProductsTC.addResolver({
    name: 'deleteProduct',
    args: { idProduct: 'String' },
    type: GraphQLBoolean,
    resolve: async ({source, args, context}:any) => {
        return await useCases.deletedProduct(args.idProduct);
    }
});

ProductsTC.addResolver({
    name: 'updateProduct',
    args: { data: 'JSON', idProduct: 'String', idUser: 'String' },
    type: ProductsTC, 
    resolve: async ({source, args, context}:any) => {
        return await useCases.updateProduct(args.data, args.idProduct, args.idUser);
    }
});

export const productsQuery = {
    getAllProducts: ProductsTC.getResolver('getAllProducts'),
    getProductById: ProductsTC.getResolver('getProductById')
}

export const productsMutation = {
    createProduct: ProductsTC.getResolver('createProduct'),
    deleteProductById: ProductsTC.getResolver('deleteProduct'),
    updateProductById: ProductsTC.getResolver('updateProduct')
}