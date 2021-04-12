import React, { createContext } from 'react';

import {
  useUser,
  useFirestore,
  useFirestoreDocData,
} from 'reactfire';

export const AuthContext = createContext();
export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: user, status } = useUser();
  const { uid } = user || {};

  return (
    <AuthContext.Provider
      value={uid}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserProvider = ({ children, uid }) => {
  const budgets = useFirestore()
    .collection('budgets');
  const userDetailsRef = useFirestore()
    .collection('users')
    .doc(uid);

  const {data: user, status} = useFirestoreDocData(
    userDetailsRef
  );

  if (!(user || {}).budgetId && status === 'success') {
    budgets.add({ categories: [], userId: uid }).then((data) => {
      userDetailsRef.update({budgetId: data.id});
    });
  }

  return (
    <UserContext.Provider
      value={{...user, uid}}
    >
      {children}
    </UserContext.Provider>
  );
};
