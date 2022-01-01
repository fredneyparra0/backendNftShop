import { modelProduct } from "../../models/productModel";

export async function getAllProducts () {
    return await modelProduct.find({ isDeleted: false, isPrivate: false });
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