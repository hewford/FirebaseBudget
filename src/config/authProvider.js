import React, { createContext } from 'react';

import {
  useUser,
  useFirestore,
  useFirestoreDocData
} from 'reactfire';

export const AuthContext = createContext();

export const AuthProviderWrapper = ({ children }) => {
  const { data: user, status } = useUser();
  const { uid } = user || {};

  return (
    <AuthProvider uid={uid}>
      {children}
    </AuthProvider>
  );
};

export const AuthProvider = ({ children, uid }) => {
  const userDetailsRef = useFirestore()
    .collection('users')
    .doc(uid);

  const {data: user} = useFirestoreDocData(
    userDetailsRef
  );

  return (
    <AuthContext.Provider
      value={{...user, uid}}
    >
      {children}
    </AuthContext.Provider>
  );
};