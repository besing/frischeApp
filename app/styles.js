import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');
const fpMainColor = '#598c8a';

// TODO: Vielleicht doch eher pro Component ein File und darin direkt jew. Styles Obj.?

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  contentBlock: {
    // width: width,
  },
  headerBlock: {
    padding: 40,
    backgroundColor: fpMainColor
  },
  logoText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 5
  },
  buttonBlock: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'beige'
  },
  button: {
    padding: 15,
    borderWidth: 1
  },
  resultsBlock: {
    flex: 1,
    padding: 30,
    backgroundColor: '#eee'
  }
});

export default styles;
