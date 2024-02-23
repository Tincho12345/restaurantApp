import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {
    marginHorizontal: '2.5%',
    flex: 1,
  },
  boton: {
    backgroundColor: '#FFDA00',
    borderRadius: 25,
    marginBottom: 25,
    marginHorizontal: 25,
  },
  footerTab: {
    backgroundColor: '#FFF',
  },
  botonTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
  },
  titulo: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30,
  },
  imagen: {
    height: 300,
    width: '100%',
  },
  cantidad: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default globalStyles;