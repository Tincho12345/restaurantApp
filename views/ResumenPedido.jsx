/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
  H1,
  Footer,
  FooterTab,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';

import {addDoc, collection, getFirestore} from 'firebase/firestore';
import {appFirebase} from '../firebase/config';

const db = getFirestore(appFirebase);

import PedidoContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {
  const navigation = useNavigation();

  // context de pedido
  const {pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado} =
    useContext(PedidoContext);

  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.total,
      0,
    );

    mostrarResumen(nuevoTotal);
  };

  // redirecciona a Progreso pedido
  const progresoPedido = () => {
    Alert.alert(
      'Revisa tu pedido',
      'Una vez que realizas tu pedido, no podrás cambiarlo',
      [
        {text: 'Revisar', style: 'cancel'},
        {
          text: 'Confirmar',
          onPress: async () => {
            // crear un objeto
            const pedidoObj = {
              tiempoentrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido, // array
              creado: Date.now(),
            };
            try {
              const pedido = await addDoc(collection(db, 'ordenes'), pedidoObj);
              pedidoRealizado(pedido.id);
              // redireccionar a progreso
              navigation.navigate('ProgresoPedido');
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  // Elimina un producto del arreglo de pedido
  const confirmarEliminacion = id => {
    Alert.alert(
      '¿Deseas eliminar este artículo?',
      'Una vez eliminado no se puede recuperar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            // Eliminar del state
            eliminarProducto(id);
          },
        },
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };

  return (
    <Container style={globalStyles.contenedor}>
      <Content style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
        {pedido.map((platillo, i) => {
          const {cantidad, nombre, imagen, id, precio} = platillo;
          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large square source={{uri: imagen}} />
                </Left>

                <Body>
                  <Text>{nombre} </Text>
                  <Text>Cantidad: {cantidad} </Text>
                  <Text>Precio: $ {precio} </Text>

                  <Button
                    onPress={() => confirmarEliminacion(id)}
                    full
                    danger
                    style={{marginTop: 20, borderRadius: 25}}>
                    <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>
                      Eliminar
                    </Text>
                  </Button>
                </Body>
              </ListItem>
            </List>
          );
        })}

        <Text style={globalStyles.cantidad}>Total a Pagar: $ {total}</Text>

        <Button
          onPress={() => navigation.navigate('Menu')}
          style={{marginTop: 30, borderRadius: 25}}
          full>
          <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>
            Seguir Pidiendo
          </Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab style={globalStyles.footerTab}>
          <Button
            onPress={() => progresoPedido()}
            style={[globalStyles.boton]}
            full>
            <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default ResumenPedido;
