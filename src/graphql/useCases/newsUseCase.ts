import { modelNews } from '../../models/newsModel';

export async function findAllNews () {
    return await modelNews.find({});
}

export async function findOneNews (id: string) {
    return await modelNews.findById(id);
}

export async function createOneNews (data: any) {
    return await modelNews.create({
        ...data,
        dateCreated: new Date()
    });
}

export async function updateOneNews (idNew: string, data: any) {
    return await modelNews.findByIdAndUpdate(idNew, {
        ...data,
        dateOfUpdated: new Date()
    }, { new: true });
}

export async function deteleOneNews (idNew: string) {
    return await modelNews.findByIdAndDelete(idNew);
}