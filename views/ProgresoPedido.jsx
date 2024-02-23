/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useContext, useEffect, useState} from 'react';
import PedidoContext from '../context/pedidos/pedidosContext';
import {Container, View, Text, H1, H3, Button} from 'native-base';
import globalStyles from '../styles/global';
import Countdown from 'react-countdown';
import {StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {getFirestore, appFirebase, onSnapshot, doc} from 'firebase/firestore';
const db = getFirestore(appFirebase);

const ProgresoPedido = () => {
  const navigation = useNavigation();
  const {idpedido} = useContext(PedidoContext);
  const [tiempo, guardarTiempo] = useState(0);
  const [completado, guardarCompletado] = useState(false);

  useEffect(() => {
    const obtenerProducto = () => {
      try {
        onSnapshot(doc(db, 'ordenes', idpedido), docs => {
          guardarTiempo(docs.data().tiempoentrega);
          guardarCompletado(docs.data().completado);
        });
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProducto();
  }, []);

  const renderer = ({minutes, seconds}) => {
    return (
      <Text style={styles.tiempo}>
        {minutes}:{seconds}
      </Text>
    );
  };
  return (
    <Container style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, {marginTop: 50}]}>
        {tiempo === 0 && (
          <>
            <Text style={{textAlign: 'center', fontSize: 30}}>
              Hemos Recibido tu orden 💁🏻‍♂️
            </Text>
            <Text style={{textAlign: 'center', fontSize: 30}}>
              Estamos Calculando el tiempo de entrega... ⏰⏰⏰
            </Text>
          </>
        )}
        {!completado && tiempo > 0 && (
          <>
            <Text style={{textAlign: 'center', fontSize: 15}}>
              Su Orden 📝 estará lista en{' '}
            </Text>
            <Text style={{textAlign: 'center', fontSize: 15}}>
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            </Text>
          </>
        )}

        {completado && (
          <>
            <H1 style={styles.textoCompletado}>Orden Lista</H1>
            <H3 style={styles.textoCompletado}>Por favor, pase a recoger su pedido</H3>
            <Button style={[globalStyles.boton,{marginTop: 100}]}
            block
            onPress={ () => navigation.navigate('NuevaOrden') }
            >
              <Text style={globalStyles.botonTexto}>Comenzar Una Orden Nueva</Text>
            </Button>
          </>
          )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: 'center',
    marginTop: 80,
  },
  textoCompletado: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});

export default ProgresoPedido;
