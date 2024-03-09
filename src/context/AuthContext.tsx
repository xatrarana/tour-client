import instance from '@/lib/axiosConfig';

import { createContext, useContext, useEffect, useReducer } from 'react';

// Define types for authentication state
export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

export type TSession = {
    isAuthenticated: boolean,
    sessionId: string,
    user: User
  }

type AuthAction = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' } | {type: 'UPDATE'; session: TSession};

export const initialState: AuthState = {
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
    checkSession: () => void
}>({
    state: initialState,
    dispatch: () => null,
    handleLogin: () => {},
    handleLogout: () => {},
    checkSession:  () => {}
});

function authReducer(state: AuthState, action: AuthAction): AuthState {
    let newState: AuthState;
    switch (action.type) {
        case 'LOGIN':
            newState = {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
            localStorage.setItem('authState', JSON.stringify(newState));
            return newState;
        case 'LOGOUT':
            newState = {
                ...state,
                isAuthenticated: false,
                user: null,
            };
            localStorage.removeItem('authState'); 
            localStorage.removeItem('user'); 
            localStorage.removeItem('token'); 
            return newState;

        case 'UPDATE':
            newState = {
                ...state,
                isAuthenticated: action.session.isAuthenticated,
                user: action.session.user,
            };
            localStorage.setItem('authState', JSON.stringify(newState));
            return newState;
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
            const storedAuthState = localStorage.getItem('authState');
            if (storedAuthState) {
              const parsedState = JSON.parse(storedAuthState);
              return parsedState;
            }
          } catch (error) {
            console.error('Error parsing stored auth state:', error);
          }
        
          return initialState;
    });
   
    useEffect(() => {
        checkSession()
    },[state.isAuthenticated])

    const checkSession = async () => {
        try {
            const response = await instance.get<TSession>('/auth/session',{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
           
            if(response.status === 200){
                dispatch({type:"UPDATE", session: response.data})
            }
        } catch (error) {
            console.log(error)
        }
    }
     
    const handleLogin = (user: User, token: string) => {
        try {

            dispatch({ type: 'LOGIN', payload: user });
            localStorage.setItem('token', JSON.stringify(token));
          } catch (error) {
            console.error('Error storing data in localStorage:', error);
          }
    };

    // Remove user data from local storage after logout
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };
    return (
        <AuthContext.Provider value={{ state, dispatch, handleLogin, handleLogout, checkSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);