import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './PaymentFormView';
/**
 * The class renders a view with PaymentFormView
 */
/*
 <KeyboardSpacer
          onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }),0)} }
        />
*/
export default class AddSubscriptionView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} ref={ref => (this.scrollViewRef = ref)}>
          <View style={styles.cardFormWrapper}>
            <PaymentFormView {...this.props}/>
          </View>
        </ScrollView>
        {/* Scrolls to the payment form */}
       
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textWrapper: {
    margin: 10
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center'
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10
  }
});