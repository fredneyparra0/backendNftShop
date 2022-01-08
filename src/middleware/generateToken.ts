import jwt from 'jsonwebtoken';

export async function generateToken () {
    return jwt.sign({ check: true }, 'heyimprivatekey', {
        expiresIn: 1440
    });
}


export function validateToken (token: string) {
    return jwt.verify(token, process.env.WORDSECRET || '');
}