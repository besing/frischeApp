'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

import GetDepositArticles from '../components/GetDepositArticles';
import TextDefault from '../components/TextDefault';

import {fpMainColor} from '../config/globalStyles';


export default class ArticlesListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {id} = this.props;
    const {title} = this.props;
    const imgPlaceholderS = <Image
      source={require('../images/placeholder_50.png')}
      style={{width: 50, height: 50}}
      resizeMode='cover'
    />;
    const img = this.props.img || imgPlaceholderS;
    const returnedArticlesNum = this.props.returnedArticlesNum || '0';

    return (

      // TODO: Title Länge beschränken (oder insg. kürzere Title) --> Sonst Count bei längeren nach rechts/unten gedrückt

      <View style={[styles.container, styles.wrapper]}>
        {img}
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10
        }}>
          <View style={{marginRight: 10}}>
            <Text color="#555">{title}</Text>
          </View>
          <View style={{
            backgroundColor: fpMainColor,
            borderRadius: 30, // later: maybe implement "50%" workaround better (instead just high nr.)
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{color: '#fff', fontWeight: '600'}}>{returnedArticlesNum}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({ // copied from RN Elements (ListItem)
  container: {
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
  chevronContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
});
