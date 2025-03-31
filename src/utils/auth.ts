
// Simple auth utility for the application

export interface User {
  email: string;
  name: string;
  role: string;
  isLoggedIn: boolean;
  specialty?: string;
  hospital?: string;
}

export const isAuthenticated = (): boolean => {
  const userData = localStorage.getItem("mediseva_user");
  if (!userData) return false;
  
  try {
    const user = JSON.parse(userData);
    return !!user.isLoggedIn;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return false;
  }
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem("mediseva_user");
  if (!userData) return null;
  
  try {
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

export const logout = (): void => {
  localStorage.removeItem("mediseva_user");
};

export const isDoctor = (): boolean => {
  const user = getCurrentUser();
  return user?.role === "doctor";
};

export const isPatient = (): boolean => {
  const user = getCurrentUser();
  return user?.role === "patient";
};
