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
    const filteredPage = this.props.articleReturnedCountFromObj;
      // Prop only passed if Count !== 0 --> filteredPage is rendered

    return (
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
            <View style={filteredPage ? {
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            } : {
              backgroundColor: fpMainColor,
              borderRadius: 30, // later: maybe implement "50%" workaround better (instead just high nr.)
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={filteredPage ? {color: '#000', fontWeight: '600'} : {color: '#fff', fontWeight: '600'}}>
                {filteredPage ? filteredPage + 'x' : this.state.articleReturnCount}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _increaseReturnCountByOne() {
    setTimeout(this._resetArticleBgColor, 300);

    this.setState({
      articleReturnCount: this.state.articleReturnCount + 1,
      articleBackgroundColor: 'greenyellow'
    }, () => this.props.listItemCallback(this.props.id, this.state.articleReturnCount));
      // "Callback inside Callback" necessary! Otherwise returns before State transition done
  }

  _decreaseReturnCountByOne() {
    setTimeout(this._resetArticleBgColor, 300);

    const {articleReturnCount} = this.state;

    this.setState({
      articleReturnCount: articleReturnCount > 0 ? articleReturnCount - 1 : 0,
      articleBackgroundColor: 'indianred'
    }, () => this.props.listItemCallback(this.props.id, this.state.articleReturnCount));
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
