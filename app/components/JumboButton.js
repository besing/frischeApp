'use strict';

import React, {Component} from 'react';
import {View} from 'react-native';

// Import 3rd Party Node Modules
  import IconMaterial from 'react-native-vector-icons/MaterialIcons';


export default class JumboButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IconMaterial.Button
        name={this.props.iconName}
        backgroundColor={this.props.bgColor}
        onPress={this.props.onPress}
        underlayColor={this.props.underlayColor || '#000'}
        size={this.props.iconSize}
        borderRadius={0}
        style={[{flexDirection: 'column'},
          this.props.slim ? {padding: 10} : {padding: 30},
          this.props.style
        ]}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </IconMaterial.Button>
    )
  }
}
