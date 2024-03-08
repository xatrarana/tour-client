import { createContext, useContext, useEffect, useReducer } from 'react';

// Define types for authentication state
export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

type AuthAction = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' };

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

interface User {
    _id: string;
    username: string;
    fullname: string;
    email: string;
    role: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}


const AuthContext = createContext<{
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
    handleLogin: (user: User, token:string) => void;
    handleLogout: () => void;
}>({
    state: initialState,
    dispatch: () => null,
    handleLogin: () => {},
    handleLogout: () => {}
});

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
}

type AuthProviderProps = {
    children: React.ReactNode
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState, () => {
        try {
            // Retrieve authentication state from local storage
            const storedAuthState = localStorage.getItem('authState');
            if (storedAuthState) {
              // Attempt to parse stored state, handling potential errors
              const parsedState = JSON.parse(storedAuthState);
              return parsedState;
            }
          } catch (error) {
            console.error('Error parsing stored auth state:', error);
          }
        
          // If parsing fails or no state is stored, return initial state
          return initialState;
    });
    useEffect(() => {
        try {
            localStorage.setItem('authState',JSON.stringify(state))
        } catch (error) {
            console.error(error)
        }
    })
     
    const handleLogin = (user: User, token: string) => {
        try {

            dispatch({ type: 'LOGIN', payload: user });
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(token));
          } catch (error) {
            console.error('Error storing data in localStorage:', error);
          }
    };

    // Remove user data from local storage after logout
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };
    return (
        <AuthContext.Provider value={{ state, dispatch, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);