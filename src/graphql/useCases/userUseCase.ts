import { IUser } from '../../interfaces/userInterface';
import { generateToken } from '../../middleware/generateToken';
import { compareHash, generateHash } from '../../middleware/passEncrypt';
import { modelUser } from '../../models/userModel';

export async function createUser (data: any) {
    try {
        const { pass } = data;
        const passEncrypt = await generateHash(pass);
        await modelUser.create({
            ...data,
            pass: passEncrypt
        });
        return {
            message: "User created successful",
            ok: true
        }
    } catch (err: any) {
        if (err) {
            return {
                message: err.message,
                ok: false
            }
        }
    }
}

export async function updatePersonalInformation (idUser: string, data: any) {
    const { name, email } = data;
    
    return await modelUser.findByIdAndUpdate(idUser, {
        ...name,
        ...email,
        dateUpdated: new Date()
    }, { new: true });
}

export async function deleteUser (idUser: string) {
    return await modelUser.findByIdAndUpdate(idUser, {
        isDeleted: true
    });
}

export async function loginUser (data: any) {
    const { email, pass } = data;
    const user: IUser[] = await modelUser.find({ email });
    if (user.length > 0) {
        if (await compareHash(user[0].pass, pass)) {
            return generateToken()
        } else {
            return new Error('Email or Password incorrect please try again')
        }
    } else {
        return new Error('Server error please try again')
    }

}