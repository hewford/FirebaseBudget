## Firebase configuration

### Configure Firebase app:
#### https://console.firebase.google.com/u/0/
- Click add project and enter name
- Click Database under Develop and initialize database
- Click Authentication under Develop and enable user creation with email and password
- Under Project Overview, click "add app" and then the "</>" to get the following...

### After you setup your firebase app, it will give you a configuration snipper. Copy config snippe within fbConfig.js:
```javascript

const config = {
  apiKey: "YOUR API KEY",
  authDomain: "YOUR DOMAIN",
  databaseURL: "YOUR URL",
  projectId: "PROJECT ID",
  storageBucket: "",
  messagingSenderId: "SENDERID"
};
```

## Firebase Database Rules:
```
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{project} {
      allow read, write: if request.auth.uid != null
    }
    match /users/{userId} {
      allow create
      allow read: if request.auth.uid != null
      allow write: if request.auth.uid == userId
    }
  }
}
```

## Set up Firebase Cloud Functions

### Install firebase-tools
```console
$ npm install -g firebase-tools
```
### log into firebase within repo
```console
$ firebase login
```
### initialize firebase in app
```console
$ firebase init
...
( ) Database: ....
( ) Firestore: ....
(*) Functions: ....
(*) Hosting: ....
( ) Storage: ....
...
--Select app
...
? What do you want to use as your public directory? build
...
? Single page app? Y
```
### Write cloud functions:
```
/functions/index.js
```
### Deploy functions:
```console
$ firebase deploy --only functions
```

### Deploy firebase app:
```console
$ yarn run build
```
```console
$ firebase deploy
```# FirebaseBudget
