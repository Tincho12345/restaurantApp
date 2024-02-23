/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import {
  Container,
  Content,
  Form,
  Input,
  Grid,
  Col,
  Button,
  Text,
  Footer,
  FooterTab,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {
  // state para cantidades
  const [cantidad, guardarCantidad] = useState(1);
  const [total, guardarTotal] = useState(0);

  // context
  const {platillo, guardarPedido} = useContext(PedidoContext);
  const {precio} = platillo;

  // redireccionar
  const navigation = useNavigation();

  // En cuanto el componente carga, calcular la cantidad a pagar
  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  // Calcula el total del platillo por su cantidad
  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    guardarTotal(totalPagar);
  };

  // Decrementa en uno
  const decrementarUno = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      guardarCantidad(nuevaCantidad);
    }
  };

  // incrementa en uno la cantidad
  const incrementarUno = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    guardarCantidad(nuevaCantidad);
  };

  // Confirma si la orden es correcta
  const confirmarOrden = () => {
    Alert.alert(
      '¿Deseas confirmar tu pedido✅👈?',
      'Un pedido confirmado ya no se podrá modificar',
      [
        {
          text: 'Cancelar 🔄🥺',
          style: 'cancel',
        },
        {
          text: 'Confirmar 🆗😌',
          onPress: () => {
            // Almacenar el pedido al pedido principal
            const pedido = {
              ...platillo,
              cantidad,
              total,
            };

            guardarPedido(pedido);

            // Navegar hacia el Resumen
            navigation.navigate('ResumenPedido');
          },
        },
      ],
    );
  };

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.titulo}>Cantidad</Text>
          <Grid>
            <Col>
            <Button
                rounded
                style={{
                  marginLeft: 15,
                  justifyContent: 'center',
                  backgroundColor: '#01DF01',
                }}
                onPress={() => decrementarUno()}>
                <Text style={globalStyles.botonTexto}> ➖ Restar</Text>
              </Button>
            </Col>
            <Col>
              <Input
                style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}
                value={cantidad.toString()}
                keyboardType= "numeric"
                onChangeText={cantidad => guardarCantidad(cantidad)}
              />
            </Col>
            <Col>
              <Button
                rounded
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#01DF01',
                }}
                onPress={() => incrementarUno()}>
                <Text style={globalStyles.botonTexto}> ➕ Agregar</Text>
              </Button>
            </Col>
          </Grid>

          <Text style={globalStyles.cantidad}>Subtotal: $ {total} </Text>
        </Form>
      </Content>

      <Footer>
        <FooterTab style={globalStyles.footerTab}>
          <Button style={globalStyles.boton} onPress={() => confirmarOrden()}>
            <Text style={globalStyles.botonTexto}>🥃🍽️ Agregar al Pedido 🍾🍴</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default FormularioPlatillo;
