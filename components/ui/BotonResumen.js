import React, {useContext} from 'react';
import {Button, Text} from 'native-base';
import globalStyles from '../../styles/global';
import {useNavigation} from '@react-navigation/native';
import PedidoContext from '../../context/pedidos/pedidosContext';
import {StyleSheet} from 'react-native';

const BotonResumen = () => {
  const navigation = useNavigation();

  // Leer el objeto de pedido
  const {pedido} = useContext(PedidoContext);

  if (pedido.length === 0) {
    return null;
  }

  return (
    <Button
      onPress={() => navigation.navigate('ResumenPedido')}
      style={[globalStyles.boton, styles.estiloBoton]}>
      <Text style={globalStyles.botonTexto}>Ir a Pedido</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  estiloBoton: {
    marginTop: 25,
  },
});

export default BotonResumen;
