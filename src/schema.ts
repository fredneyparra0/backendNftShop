import { schemaComposer, SchemaComposer } from 'graphql-compose';

import { newsQuery, newsMutation } from './graphql/schema/newsSchema';

const schemaCompose = new SchemaComposer();

schemaComposer.Query.addFields({
    ...newsQuery
});

schemaComposer.Mutation.addFields({
    ...newsMutation
});

export const schema = schemaComposer.buildSchema();