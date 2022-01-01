import { schemaComposer, SchemaComposer } from 'graphql-compose';

import { newsQuery, newsMutation } from './graphql/schema/newsSchema';
import { productsQuery, productsMutation } from './graphql/schema/productsSchema';

const schemaCompose = new SchemaComposer();

schemaComposer.Query.addFields({
    ...newsQuery,
    ...productsQuery
});

schemaComposer.Mutation.addFields({
    ...newsMutation,
    ...productsMutation
});

export const schema = schemaComposer.buildSchema();