import { User } from '../store/authSlice';

const AUTH_STORAGE_KEY = 'mbcplay_auth';

export interface StoredAuthData {
  token: string;
  user: User;
  timestamp: number;
}

// Save auth data to localStorage
export const saveAuthToStorage = (token: string, user: User): void => {
  const authData: StoredAuthData = {
    token,
    user,
    timestamp: Date.now(),
  };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
};

// Load auth data from localStorage
export const loadAuthFromStorage = (): StoredAuthData | null => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return null;
    
    const authData: StoredAuthData = JSON.parse(stored);
    
    // Check if the data is not too old (optional: you can set an expiry)
    // For now, we'll trust the JWT token's expiry
    return authData;
  } catch (error) {
    console.error('Error loading auth data from storage:', error);
    return null;
  }
};

// Clear auth data from localStorage
export const clearAuthFromStorage = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

// Check if auth data exists in localStorage
export const hasStoredAuth = (): boolean => {
  return localStorage.getItem(AUTH_STORAGE_KEY) !== null;
};
