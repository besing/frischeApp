'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import globalStyles from '../config/globalStyles';
import {width, height} from '../config/globalStyles';

import TextDefault from '../components/TextDefault';

export default class FullWidthButton extends Component {
  render() {
    return (
      <View style={[globalStyles.center, styles.buttonWrap]}>
        <TouchableHighlight
          onPress={this.onPressButton}
          underlayColor='#000'
          activeOpacity={5}
          style={styles.button}
        >
          <View style={globalStyles.center}>
            <TextDefault color="#fff" fontWeight="semibold">
              {this.props.children}
            </TextDefault>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  onPressButton() {

  }
}

const styles = StyleSheet.create({
  buttonWrap: {

  },
  button: {
    width: width - 40,
    backgroundColor: '#444',
    marginTop: 20,
    marginBottom: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: '#000'
  }
});
