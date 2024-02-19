import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

type ActionType = 'OPEN_NAVBAR' | 'CLOSE_NAVBAR';

type StateType = {
  isNavbarOpen: boolean;
};

type Action = {
  type: ActionType;
};

interface NavbarContextType {
  state: StateType;
  dispatch: Dispatch<Action>;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

const navbarReducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case 'OPEN_NAVBAR':
      return { ...state, isNavbarOpen: true };
    case 'CLOSE_NAVBAR':
      return { ...state, isNavbarOpen: false };
    default:
      return state;
  }
};

interface NavbarProviderProps {
  children: ReactNode;
}

const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }: NavbarProviderProps) => {
  const [state, dispatch] = useReducer(navbarReducer, { isNavbarOpen: false });

  return (
    <NavbarContext.Provider value={{ state, dispatch }}>
      {children}
    </NavbarContext.Provider>
  );
};

const useNavbar = () => {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }

  return context;
};

export { NavbarProvider, useNavbar };
