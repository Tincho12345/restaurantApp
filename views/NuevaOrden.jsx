/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, } from 'react-native';
import {View} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';

const NuevaOrden = () => {
  const navigation = useNavigation();
  return (
    <View style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, styles.contenido]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Menu')}
          style={styles.roundButton2}>
          <Text style={globalStyles.botonTexto}>Nueva Orden</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contenido: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton2: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#D9D924',
  },
});
export default NuevaOrden;
