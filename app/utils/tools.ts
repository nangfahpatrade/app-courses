import CryptoJS from "crypto-js";
import Cookies from "js-cookie";


const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";

export const decryptData = (ciphertext: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};


export const authToken = async()=> {
    const authToken = Cookies.get('authToken');
    return authToken
}