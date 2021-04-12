import React, { createContext, useState } from 'react';

export const routes = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  HOME: '/',
  NEW_EXPENSE: '/new-expense/:id',
  NEW_DEPOSIT: '/new-deposit/:id',
  EDIT_EXPENSE: '/edit-expense/:id/:expenseId',
  EXPENSES: '/expenses/:id',
  CATEGORIES: '/categories',
  NEW_CATEGORY: '/new-category',
  EDIT_CATEGORY: '/edit-category/:id',
};

export const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState({ route: '/' });
  const [stack, setStack] = useState([]);

  const navigate = (nextRoute, props) => {
    const updatedRoute = {
      route: nextRoute,
      props
    };
    setStack([...stack, updatedRoute]);
    setRoute(updatedRoute);
  };

  const goBack = () => {
    if (stack.length >= 2) {
      const updatedStack = stack.slice(0, -1);
      setStack(updatedStack);
      setRoute(updatedStack[updatedStack.length - 1]);
    } else {
      setStack([]);
      setRoute('/');
    }
  };

  return (
    <RouteContext.Provider
      value={{
        ...route,
        navigate,
        stack,
        goBack
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};