
import CryptoJS from 'crypto-js';

// A simple encryption key - in a real app, this should be stored securely
// and potentially unique per user/device
const ENCRYPTION_KEY = 'mediseva_secure_encryption_key_2023';

// Encrypt data
export const encrypt = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

// Decrypt data
export const decrypt = (encryptedData: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};
