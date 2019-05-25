export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch(err => { 
            dispatch({ type: 'LOGIN_ERROR', err })
        })
  }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
            .then(() => {
                dispatch({type: 'SIGNOUT_SUCCESS '})
            }).catch(err => { 
                dispatch({ type: 'LOGOUT_ERROR', err })
            })
    }
}

export const signUp = (newUser) => {
    const { firstName, lastName } = newUser
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore.collection('users')
            .doc(response.user.uid)
            .set({
                firstName,
                lastName,
                initials: firstName[0] + lastName[0],
                email: newUser.email
            })
        }).then((data) => {
            dispatch({type: 'SIGNUP_SUCCESS '})
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

  