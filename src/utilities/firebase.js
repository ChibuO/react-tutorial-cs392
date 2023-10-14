import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBiq1A5Ers5_sWHxv0ITisccZjSXZx9j9s",
  authDomain: "cs392-react-tutorial-3334d.firebaseapp.com",
  databaseURL: "https://cs392-react-tutorial-3334d-default-rtdb.firebaseio.com",
  projectId: "cs392-react-tutorial-3334d",
  storageBucket: "cs392-react-tutorial-3334d.appspot.com",
  messagingSenderId: "271011068235",
  appId: "1:271011068235:web:66d4753349c4175ef6d0ce",
  measurementId: "G-0LXV6SY7N3"
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