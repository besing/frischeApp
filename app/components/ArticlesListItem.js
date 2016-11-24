'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

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
    const imgPlaceholderSmall = <Image
      source={require('../images/placeholder_50.png')}
      style={{width: 50, height: 50}}
      resizeMode='cover'
    />;
    const img = this.props.img || imgPlaceholderSmall; // TODO: Bei Klick Bild in groß anzeigen

    let returnItemFull =
      <TouchableWithoutFeedback onPress={this._increaseReturnCountByOne}
                                onLongPress={this._decreaseReturnCountByOne}>
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
              <Text color="#555">{this.props.title}</Text>
            </View>
            <View style={{
              backgroundColor: fpMainColor,
              borderRadius: 30, // later: maybe implement "50%" workaround better (instead just high nr.)
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{color: '#fff', fontWeight: '600'}}>
                {this.state.articleReturnCount}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>;

    let returnItemFiltered = (this.state.articleReturnCount > 0 &&
      <TouchableWithoutFeedback onPress={this._increaseReturnCountByOne}
                                onLongPress={this._decreaseReturnCountByOne}
                                disabled>
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
              <Text color="#555">{this.props.title}</Text>
            </View>
            <View style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{color: '#000', fontWeight: '600'}}>
                {this.state.articleReturnCount}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>);

    return (
      <View>{this.props.filterOn ? returnItemFiltered : returnItemFull}</View>
    )
  }

  _increaseReturnCountByOne() {
    setTimeout(this._resetArticleBgColor, 700);

    this.setState({
      articleReturnCount: this.state.articleReturnCount + 1,
      articleBackgroundColor: 'mediumseagreen'
    });

    this.props.returnCount(1, 0); // 1st: add, 2nd: remove  (can probably be simplified)
      // passing returnCount 2 parent-levels up through Props-Connection
  }

  _decreaseReturnCountByOne() {
    setTimeout(this._resetArticleBgColor, 700);

    const {articleReturnCount} = this.state;

    this.setState({
      articleReturnCount: articleReturnCount > 0 ? articleReturnCount - 1 : 0,
      articleBackgroundColor: 'crimson'
    });

    this.props.returnCount(0, 1);
  }

  _resetArticleBgColor() {
    this.setState({articleBackgroundColor: defaultArticleBgColor})
  }
}

const styles = StyleSheet.create({ // styles adapted from RN Elements ('ListItem')
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
