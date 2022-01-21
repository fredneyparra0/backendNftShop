import { composeWithMongoose } from 'graphql-compose-mongoose';

import * as useCases from '../useCases/ProductsUseCase';
import { modelProduct } from '../../models/productModel';
import { authToken } from '../../helpers/validateToken';
import { GraphQLBoolean } from 'graphql';

const ProductsTC = composeWithMongoose(modelProduct);

ProductsTC.addResolver({
    name: 'getAllProducts',
    args: { nPage: "Int" },
    type: [ProductsTC],
    resolve: async ({ source, args, context }:any) => {
        return await useCases.getAllProducts(args.nPage);
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

/**
 * Filter of products 
*/

ProductsTC.addResolver({
    name: "filterProduct",
    args: { term: "String" },
    type: [ProductsTC],
    resolve: async ({source, args, contexr}:any) => {
        return await useCases.filterProduct(args.term);
    }
});


export const productsQuery = {
    getAllProducts: ProductsTC.getResolver('getAllProducts'),
    getProductById: ProductsTC.getResolver('getProductById'),
    filterProduct: ProductsTC.getResolver('filterProduct')
}

export const productsMutation = {
    createProduct: ProductsTC.getResolver('createProduct'),
    deleteProductById: ProductsTC.getResolver('deleteProduct'),
    updateProductById: ProductsTC.getResolver('updateProduct')
}