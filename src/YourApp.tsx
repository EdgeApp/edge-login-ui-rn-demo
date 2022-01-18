import {EdgeAccount} from 'edge-core-js';
import * as React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';

interface Props {
  edgeAccount: EdgeAccount;
  onLogout: () => void;
}

/**
 * Your app goes here.
 */
export const YourApp = (props: Props) => {
  const {edgeAccount, onLogout} = props;

  return (
    <SafeAreaView style={{alignItems: 'center'}}>
      <Text>Username: {edgeAccount.username}</Text>
      <Button title="Log Out" onPress={onLogout}></Button>
    </SafeAreaView>
  );
};
