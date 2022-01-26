import * as React from 'react';
import {EdgeContext, MakeEdgeContext} from 'edge-core-js';
import {LoginUiProvider} from 'edge-login-ui-rn';
import {Alert} from 'react-native';
import {Router} from './Router';

/**
 * Makes the Edge context and Login UI modal provider
 * available to the rest of the app.
 */
export const App = () => {
  // Stores the Edge context:
  const [context, setContext] = React.useState<EdgeContext>();

  return (
    <LoginUiProvider>
      <MakeEdgeContext
        // Get this from our support team:
        apiKey="0b5776a91bf409ac10a3fe5f3944bf50417209a0"
        appId="com.mydomain.myapp"
        // We want Ethereum support:
        pluginUris={['edge-currency-accountbased.js']}
        plugins={{
          ethereum: true,
        }}
        // Called when the core is done loading:
        onLoad={setContext}
        onError={showError}
      />
      <Router edgeContext={context} />
    </LoginUiProvider>
  );
};

const showError = (error: unknown) =>
  Alert.alert('Error', String(error), [{text: 'OK'}]);
