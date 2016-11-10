'use strict';

import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  TextInput
} from 'react-native';

import globalStyles from '../config/globalStyles';
import { SearchBar, List, ListItem } from 'react-native-elements';

import { customersData } from '../scenes/Home';
import { customersDataNames } from '../scenes/Home';


export default class CustomerSearch extends Component {

  constructor(props) {
    super(props);

    this.filteredResults = customersData;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds.cloneWithRows(customersData),
      searchText: ''
    };

    this.setSearchText = this.setSearchText.bind(this);
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        title={rowData.lastname + ', ' + rowData.firstname}
        subtitle={rowData.email}
      /> // later: maybe replace by native Component (instead of RN Elements ListItem)?
    )
  }

  render() {
    return (
      <View style={{paddingTop: 64, flex: 1}}>

        <TextInput
          style={styles.searchBar}
          value={this.state.searchText}
          onChange={this.setSearchText}
          placeholder="Search here"
        />

{/*
/!*
        <SearchBar
          onChangeText={null}
          placeholder="Nachname"
          autoFocus={true}
          lightTheme
        />
        <SearchBar
          onChangeText={null}
          placeholder="Vorname"
          lightTheme
        />
*!/
*/}

        <ListView
          automaticallyAdjustContentInsets={false} // otherwise additional 64px top-space (default)
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
      </View>
    );
  }

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText: searchText});

    let filtered = customersData.filter((f) => {
      return f.firstname == searchText
    });
    // console.log(filtered);

    this.setState({
      dataSource: this.ds.cloneWithRows(filtered)
    });

    // let filteredData = this._filterMe(searchText, customersData);
    // this.setState({
    //   dataSource: this.ds.cloneWithRows
    // });

    // console.log(this._searchFirstName(customersData, searchVal));
  }

/*
  _filterMe(searchText, notes) {
    let searchVal = searchText.toLowerCase();

  }

  _searchFirstName(data, keyword) {

    return data.filter((f) => {
      return f.firstname.find(keyword) !== -1;
    });

    // return searchVal.filter((f) => {
    //   console.log(f.firstname.find(input) !== -1);
    // });

    // this.filteredResults.filter((f) => {
    //   console.log(f.firstname.find(input) !== -1);
    //   // this.cloneRows(filtered);
    // });
  }
*/
}

const styles = {
  searchBar: {
    paddingLeft: 30,
    fontSize: 22,
    height: 10,
    flex: .1,
    borderWidth: 9,
    borderColor: '#E4E4E4'
  }
};