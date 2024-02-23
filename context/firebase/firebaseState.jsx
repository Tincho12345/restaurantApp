/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {useReducer} from 'react';
import _ from 'lodash';

import firebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import firebase from '../../firebase';
import {
  collection,
  query,
  onSnapshot,
  getFirestore,
  where,
  appFirebase,
} from 'firebase/firestore';

import {OBTENER_PRODUCTOS_EXITO} from '../../types';

const db = getFirestore(appFirebase);

const FirebaseState = props => {
  //Crear el State inicial
  const initialState = {
    menu: [],
  };

  // useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const obtenerProductos = () => {
    const q = query(
      collection(db, 'productos'),
      where('existencia', '==', true),
    );
    onSnapshot(q, querySnapshot => {
      let platillos = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      //Ordenamos por Categoría
      platillos = _.sortBy(platillos, 'categoria');
      // Tenemos resultados
      dispatch({
        type: OBTENER_PRODUCTOS_EXITO,
        payload: platillos,
      });
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        firebase,
        obtenerProductos,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
