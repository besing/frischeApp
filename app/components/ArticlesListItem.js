'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

// Import Globals, Configs & Helpers
  import globalStyles, {width, height, brandMainColor} from '../config/globalStyles';


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
      resizeMode='cover'
      style={{
        width: 50,
        height: 50
      }}
    />;

    const imgFetched = (
      this.props.img !== '' && <Image
        source={{uri: this.props.img}}
        resizeMode='cover'
        style={{
          width: 50,
          height: 50
        }}
      />
    );

    const returnItemFull =
      <TouchableWithoutFeedback onPress={this._increaseReturnCountByOne}
                                onLongPress={this._decreaseReturnCountByOne}>
        <View style={[
          styles.wrapper, {
          backgroundColor: this.state.articleBackgroundColor
        }]}>
          {imgFetched || imgPlaceholderSmall}

          <View style={styles.contentWrapper}>
            <View style={styles.titleWrapper}>
              <Text color="#555"
                    numberOfLines={1}
                    ellipsizeMode="middle">
                {this.props.title}
              </Text>
            </View>
            <View style={[
              globalStyles.centerXY, {
              backgroundColor: brandMainColor,
              borderRadius: 30, // better way to implement "radius 50%" instead of just high number?
              width: 30,
              height: 30,
            }]}>
              <Text style={{
                color: '#fff',
                fontWeight: '600'
              }}>
                {this.state.articleReturnCount}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>;

    const returnItemFiltered = (this.state.articleReturnCount > 0 &&
      <TouchableWithoutFeedback disabled>
        <View style={[
          styles.wrapper, {
          backgroundColor: this.state.articleBackgroundColor
        }]}>
          {imgFetched || imgPlaceholderSmall}

          <View style={styles.contentWrapper}>
            <View style={styles.titleWrapper}>
              <Text color="#555"
                    numberOfLines={1}
                    ellipsizeMode="middle">
                {this.props.title}
              </Text>
            </View>
            <View style={[
              globalStyles.centerXY, {
              width: 30,
              height: 30,
            }]}>
              <Text style={{
                color: '#000',
                fontWeight: '600'
              }}>
                {this.state.articleReturnCount}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    ); // 2 pretty similar <Touchable...> Elements: not really DRY (mostly style differences)

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

    this.props.returnCount(1, 0);
      // passing returnCount 2 parent-levels up through Props-Connection
    this.props.collectItems(this.props.id, this.props.title, 1, 0);
    // 1st: add, 2nd: remove  (can probably be simplified, same above)
  }

  _decreaseReturnCountByOne() {
    if (this.state.articleReturnCount > 0) {
      setTimeout(this._resetArticleBgColor, 700);

      this.setState({
        articleReturnCount: this.state.articleReturnCount - 1,
        articleBackgroundColor: 'crimson'
      });

      this.props.returnCount(0, 1);
      this.props.collectItems(this.props.id, this.props.title, 0, 1)
    }
  }

  _resetArticleBgColor() {
    this.setState({articleBackgroundColor: defaultArticleBgColor})
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  titleWrapper: {
    paddingRight: 10,
    width: width - 100
  },
});
