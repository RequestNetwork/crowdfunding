import * as React from 'react';
import { createRequest, getRequest } from './utils';
import RequestNetworkProvider from './Provider';
import Publisher from './Publisher';

export const { Provider, Consumer } = React.createContext({
  isReady: false,
  networkMismatch: false,
  currentNetwork: '',
  currentAccount: '',
  create: createRequest,
  get: getRequest,
});

export { Publisher };
export default RequestNetworkProvider;
