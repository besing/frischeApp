'use strict';

import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
} from 'react-native';

import globalStyles from '../config/globalStyles';
import { SearchBar } from 'react-native-elements';

import { customersData } from '../scenes/Home';
import { customersDataNames } from '../scenes/Home';


export default class CustomerSearch extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(customersDataNames),
    };
  }

  render() {
    return (
      <View style={{paddingTop: 64, flex: 1}}>
        <SearchBar
          onChangeText={null}
          placeholder="Placeholder 1"
          lightTheme
        />

        <ListView
          automaticallyAdjustContentInsets={false} // otherwise additional 64px top-space (default)
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}
