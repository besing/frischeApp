'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

import GetDepositArticles from '../components/GetDepositArticles';
import TextDefault from '../components/TextDefault';

import {fpMainColor} from '../config/globalStyles';


export default class ArticlesListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleReturnCount: 0
    };

    this._increaseReturnCountByOne = this._increaseReturnCountByOne.bind(this);
    this._decreaseReturnCountByOne = this._decreaseReturnCountByOne.bind(this);
  }

  render() {
    const {id} = this.props;
    const {title} = this.props;
    const imgPlaceholderSmall = <Image
      source={require('../images/placeholder_50.png')}
      style={{width: 50, height: 50}}
      resizeMode='cover'
    />;
    const img = this.props.img || imgPlaceholderSmall; // TODO: Bei Klick Bild in groß anzeigen
    // const returnedArticlesNum = this.props.returnedArticlesNum || '0'; // TODO: über State statt Props lösen?

    return (

      // TODO: Title Länge beschränken (oder insg. kürzere Title) --> Sonst Count bei längeren nach rechts/unten gedrückt

      <TouchableHighlight underlayColor="#000" onPress={this._increaseReturnCountByOne} onLongPress={this._decreaseReturnCountByOne}>
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
              <Text style={{color: '#fff', fontWeight: '600'}}>{this.state.articleReturnCount}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _increaseReturnCountByOne() {
    this.setState({articleReturnCount: this.state.articleReturnCount + 1})
  }

  _decreaseReturnCountByOne() {
    const {articleReturnCount} = this.state;

    this.setState({articleReturnCount: articleReturnCount > 0 ? articleReturnCount - 1 : 0})
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
