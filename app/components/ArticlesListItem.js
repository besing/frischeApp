'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import GetDepositArticles from '../components/GetDepositArticles';
import TextDefault from '../components/TextDefault';

export default class ArticlesListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {id} = this.props;
    const {title} = this.props;

    return (
      <View style={styles.container}>
        <TextDefault color="#555">{title}</TextDefault>
      </View>
    )
  }
}

const styles = StyleSheet.create({ // copied from RN Elements (ListItem)
  avatar: {
    width: 34,
    height: 34
  },
  container: {
    padding: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
  wrapper: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 8
  },
  title: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 1,
    fontWeight: '600',
  },
  titleContainer: {
    justifyContent: 'center'
  },
  chevronContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
});
