import { modelProduct } from "../../models/productModel";

export async function getAllProducts (nPage: number) {
    if      (nPage === 1) return pagination(0);
    else if (nPage === 2) return pagination(16);
    else if (nPage === 3) return pagination(32);

    async function pagination (skipN: number) {
        return await modelProduct.find({ isDeleted: false, isPrivate: false }).skip(skipN).limit(16).populate('user');
    } 
}

export async function getProductById (id: string) {
    return await modelProduct.findById(id, { isPrivate: false });
}

export async function createProduct (data: any) {
    return await modelProduct.create({...data});
}

export async function deletedProduct (idProduct: string) {
    return await modelProduct.findByIdAndUpdate(idProduct, { isDeleted: true });
}

export async function updateProduct (data: any, idProduct: string, idUser: string) {
    const productFind = await modelProduct.findOne({_id: idProduct});
    if (productFind.user.toString() === idUser) {
        return await modelProduct.findByIdAndUpdate(idProduct, {
            ...data, 
            dateUpdated: new Date()
        }, { new: true });
    }else {
        throw new Error('no authorized')
    }
}

export async function filterProduct (term: string) {
    const productsFind = await modelProduct.find({ name : new RegExp(term.toLowerCase()) });

    return productsFind;
}