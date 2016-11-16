'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

import GetDepositArticles from '../components/GetDepositArticles';
import TextDefault from '../components/TextDefault';

import {fpMainColor} from '../config/globalStyles';


const defaultArticleBgColor = '#fff';

export default class ArticlesListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleReturnCount: 0,
      articleBackgroundColor: defaultArticleBgColor
    };

    this._increaseReturnCountByOne = this._increaseReturnCountByOne.bind(this);
    this._decreaseReturnCountByOne = this._decreaseReturnCountByOne.bind(this);
    this._resetArticleBgColor = this._resetArticleBgColor.bind(this);
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

      <TouchableWithoutFeedback onPress={this._increaseReturnCountByOne} onLongPress={this._decreaseReturnCountByOne}>
        <View style={[styles.container, styles.wrapper, {backgroundColor: this.state.articleBackgroundColor}]}>
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
      </TouchableWithoutFeedback>
    )
  }

  _resetArticleBgColor() {
    this.setState({articleBackgroundColor: defaultArticleBgColor})
  }

  _increaseReturnCountByOne() {
    this.setState({
      articleReturnCount: this.state.articleReturnCount + 1,
      articleBackgroundColor: 'greenyellow'
    });
    setTimeout(this._resetArticleBgColor, 500);
  }

  _decreaseReturnCountByOne() {
    const {articleReturnCount} = this.state;

    this.setState({
      articleReturnCount: articleReturnCount > 0 ? articleReturnCount - 1 : 0,
      articleBackgroundColor: 'indianred'
    });
    setTimeout(this._resetArticleBgColor, 500);
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
