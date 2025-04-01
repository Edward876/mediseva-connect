
import { encrypt, decrypt } from './encryptionService';

const USER_DATA_KEY = 'mediseva_encrypted_user_data';
const CURRENT_USER_KEY = 'mediseva_user';

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  password: string;  // Will be hashed in a real app
  phone?: string;
  specialty?: string;
  hospital?: string;
  medicalLicense?: string;
}

// Load users from encrypted local storage
export const loadUsers = (): UserData[] => {
  try {
    const encryptedData = localStorage.getItem(USER_DATA_KEY);
    if (!encryptedData) return [];
    
    const decryptedData = decrypt(encryptedData);
    return decryptedData || [];
  } catch (error) {
    console.error('Error loading user data:', error);
    return [];
  }
};

// Save users to encrypted local storage
export const saveUsers = (users: UserData[]): void => {
  try {
    const encryptedData = encrypt(users);
    localStorage.setItem(USER_DATA_KEY, encryptedData);
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Add a new user
export const addUser = (user: Omit<UserData, 'id'>): UserData => {
  const users = loadUsers();
  
  // Check if user with this email already exists
  if (users.some(u => u.email === user.email)) {
    throw new Error('User with this email already exists');
  }
  
  // Generate a simple ID (use a proper UUID in production)
  const newUser: UserData = {
    ...user,
    id: Date.now().toString()
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return newUser;
};

// Find user by credentials
export const findUserByCredentials = (
  email: string, 
  password: string
): UserData | null => {
  const users = loadUsers();
  return users.find(u => u.email === email && u.password === password) || null;
};

// Set current user in session
export const setCurrentUser = (user: Omit<UserData, 'password'>): void => {
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    specialty: user.specialty,
    hospital: user.hospital,
    isLoggedIn: true
  };
  
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
};

// Initialize with mock data if empty
export const initializeWithMockData = (): void => {
  const users = loadUsers();
  if (users.length === 0) {
    // Add mock users from existing data
    const mockUsers = [
      { 
        id: '1',
        email: "patient@example.com", 
        password: "password123", 
        role: "patient", 
        name: "John Doe",
        phone: "1234567890"
      },
      { 
        id: '2',
        email: "doctor@example.com", 
        password: "doctor123", 
        role: "doctor", 
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        hospital: "City Heart Institute",
        phone: "9876543210",
        medicalLicense: "MED123456"
      }
    ];
    
    saveUsers(mockUsers);
  }
};

// Initialize the local storage with mock data
initializeWithMockData();
