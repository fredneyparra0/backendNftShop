import { hash, compare } from 'bcrypt';

export async function generateHash (pass: string | Buffer) {
    return await hash(pass, 10);
}

export async function compareHash (passDb: string, passFront: string | Buffer) {
    return compare(passFront, passDb)
}