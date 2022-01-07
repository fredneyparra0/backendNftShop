import { GraphQLString } from 'graphql';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { modelUser } from '../../models/userModel';
import * as useCases from '../useCases/userUseCase';

const UserTc = composeWithMongoose(modelUser);

UserTc.addResolver({
    name: 'createUser',
    args: { data: "JSON" },
    type: UserTc,
    resolve: async ({source, args, context}:any) => {
        return await useCases.createUser(args.data);
    }
});

UserTc.addResolver({
    name: 'updatePersonalInformation',
    args: { idUser: 'String', data: 'JSON' },
    type: UserTc,
    resolve: async ({ source, args, context }:any) => {
        return await useCases.updatePersonalInformation(args.idUser, args.data);
    }
});

UserTc.addResolver({
    name: 'deleteUser',
    args: { idUser: 'String' },
    type: UserTc,
    resolve: async ({ source, args, context }: any) => {
        return await useCases.deleteUser(args.idUsers);
    }
});

UserTc.addResolver({
    name: 'loginUser',
    args: { data: "JSON" },
    type: `type loginUser {res: String }`,
    resolve: async ({ source, args, context}:any) => {
        return { res: await useCases.loginUser(args.data) }
    }
});

export const userMutation = {
    userCreateUser: UserTc.getResolver('createUser'),
    userUpdatePersonalInformation: UserTc.getResolver('updatePersonalInformation'),
    userDeleteUser: UserTc.getResolver('deleteUser'),
    UserLogin: UserTc.getResolver('loginUser')
}