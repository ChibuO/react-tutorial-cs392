import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCqy8l97tEWjvW3V1B0f9bMsMLFk9D4sWk",
  authDomain: "maxtactoe.firebaseapp.com",
  databaseURL: "https://maxtactoe.firebaseio.com",
  projectId: "maxtactoe",
  storageBucket: "maxtactoe.appspot.com",
  messagingSenderId: "672040841619",
  appId: "1:672040841619:web:e488e188d5b93db7753866"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};