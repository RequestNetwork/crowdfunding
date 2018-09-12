import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './apollo';
import { Main } from './containers/Routes';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { RequestNetworkProvider } from './containers/RequestNetwork';
import { NetworkStatus } from './containers/NetworkStatus';
import { MuiThemeProvider } from '@material-ui/core/styles';
import 'typeface-poppins';
import 'typeface-roboto';
import { theme } from './theme';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <RequestNetworkProvider
          onInit={() => console.log('Request Library has initialized!')}
        >
          {requestNetwork => {
            return (
              <Router>
                <ApolloProvider client={client}>
                  <div>
                    <Route
                      path="/project/:id"
                      render={props => (
                        <NetworkStatus
                          {...props}
                          mismatch={requestNetwork.networkMismatch}
                          metaMaskIsLoggedIn={!!requestNetwork.currentAccount}
                        />
                      )}
                    />
                    <Main requestNetwork={requestNetwork} />
                  </div>
                </ApolloProvider>
              </Router>
            );
          }}
        </RequestNetworkProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
