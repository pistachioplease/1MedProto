import React from 'react';
import { Text } from 'react-native';
import { Linking } from 'expo';
import AppLink from 'react-native-app-link';



export default class Anchor extends React.Component {
  _handlePress = () => {
    // Linking.openURL(this.props.href);
    AppLink.maybeOpenURL(this.props.href, { appName: 'ZOOM Cloud Meetings', appStoreId: 'id546505307', appStoreLocale: 'us', playStoreId: 'us.zoom.videomeetings' }).then(() => {
      // do stuff
      console.log('launched');
    })
    .catch((err) => {
      // handle error
      console.log('error launching app');
    });
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Text {...this.props} onPress={this._handlePress}>
        {this.props.children}
      </Text>
    );
  }
}

// <Anchor href="https://google.com">Go to Google</Anchor>
// <Anchor href="mailto:support@expo.io">Email support</Anchor>