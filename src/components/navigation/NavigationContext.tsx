import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface NavigationState {
  active: string;
  title: string;
}

interface NavigationContextType {
  navigationState: NavigationState;
  handleNavigationState: (state: NavigationState) => void;
}

const initialState: NavigationState = {
  active: 'home',
  title: '치즈마켓',
};

const NavigationContext = createContext<NavigationContextType>({
  navigationState: initialState,
  handleNavigationState: () => {},
});

const NavigationContextProvider = ({ children }: { children: ReactNode }) => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    active: 'home',
    title: '치즈 마켓',
  });

  const handleNavigationState = useCallback(
    () => (state: NavigationState) => setNavigationState(state),
    [setNavigationState],
  );

  const value = useMemo(
    () => ({ navigationState, handleNavigationState }),
    [navigationState, handleNavigationState],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (context === null)
    throw new Error(
      'Navigation Context was used outside the NavigationContextProvider',
    );
  return context;
};

export { NavigationContextProvider, useNavigationContext };
