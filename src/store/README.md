# Redux Store Implementation

This directory contains the Redux store configuration and authentication slice for the MBCPLAY admin panel.

## Files

- `store.ts` - Main Redux store configuration
- `authSlice.ts` - Authentication state management slice
- `hooks.ts` - Typed Redux hooks for TypeScript

## Authentication State

The authentication state includes:

```typescript
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}
```

### User Interface

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  phoneExtension: string;
  phone: string;
  balance: string;
  phoneVerified: boolean;
  lastUpdatedDate: string;
}
```

## Actions

- `loginStart()` - Sets loading state during login
- `loginSuccess({ token, user })` - Sets authenticated state with user data
- `loginFailure(error)` - Sets error state on login failure
- `logout()` - Clears all authentication state
- `clearError()` - Clears error state
- `updateUser(userData)` - Updates user information
- `initializeAuth({ token, user })` - Initializes auth from localStorage

## Usage

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginSuccess, logout } from '../store/authSlice';

// In component
const dispatch = useAppDispatch();
const { isAuthenticated, user, token } = useAppSelector(state => state.auth);

// Login
dispatch(loginSuccess({ token: 'jwt-token', user: userData }));

// Logout
dispatch(logout());
```

## Persistence

Authentication state is automatically persisted to localStorage and restored on app initialization. The persistence utilities are in `src/utils/authPersistence.ts`.

## Integration

- All API calls use `fetchWithAuth` utility which automatically includes the Redux token
- Route protection is handled in `App.tsx` using Redux state
- User profile data is displayed in the Navbar from Redux state
