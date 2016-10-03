import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
const fpMainColor = '#598c8a';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentBlock: {
    // width: width,
  },
  headerBlock: {
    height: 100,
    backgroundColor: fpMainColor
  },
  logoText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 5
  },
  buttonBlock: {
    height: 200,
    backgroundColor: 'beige'
  },
  button: {
    padding: 15,
    borderWidth: 1
  }
});

export default styles;
