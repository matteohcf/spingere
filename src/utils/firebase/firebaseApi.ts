import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getApps, initializeApp } from '@react-native-firebase/app';
import { FIREBASE_CONFIG } from '../../../config';
import {store} from "../../store";
import {userActions} from "../../store/user.ts";

const firebaseConfig = {
  appId: FIREBASE_CONFIG.appId,
  projectId: FIREBASE_CONFIG.projectId,
  apiKey: FIREBASE_CONFIG.apiKey,
  authDomain: FIREBASE_CONFIG.authDomain,
  storageBucket: FIREBASE_CONFIG.storageBucket,
  messagingSenderId: FIREBASE_CONFIG.messagingSenderId,
  measurementId: FIREBASE_CONFIG.measurementId,
  automaticDataCollectionEnabled: true,
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const useFirebaseApi = () => {
  const register = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const user = login(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      const token = await user.getIdToken();

      if (token && user) {
        store.dispatch(userActions.setUserDetail(user));
        store.dispatch(userActions.setUserToken(token));
        console.log('loginRes', { token, user });
      }
      const data = { token, user };
      return data
    } catch (error) {
      throw error;
    }
  };

  const addItem = async (collectionName: string, data: any) => {
    try {
      const docRef = await firestore().collection(collectionName).add(data);
      return docRef.id;
    } catch (error) {
      throw error;
    }
  };

  const getItems = async (collectionName: string) => {
    try {
      const snapshot = await firestore().collection(collectionName).get();
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw error;
    }
  };

  const updateItem = async (collectionName: string, id: string, data: any) => {
    try {
      await firestore().collection(collectionName).doc(id).update(data);
    } catch (error) {
      throw error;
    }
  };

  const deleteItem = async (collectionName: string, id: string) => {
    try {
      await firestore().collection(collectionName).doc(id).delete();
    } catch (error) {
      throw error;
    }
  };

  return {
    register,
    login,
    addItem,
    getItems,
    updateItem,
    deleteItem,
  };
};
