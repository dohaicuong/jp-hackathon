import { Environment, RecordSource, Store } from 'relay-runtime'

import {
  RelayNetworkLayer,
  urlMiddleware,
  authMiddleware,
} from 'react-relay-network-modern'

import { API_ENDPOINT } from 'configs'

const network = new RelayNetworkLayer(
  [
    urlMiddleware({
      url: () => Promise.resolve(API_ENDPOINT),
    }),
    authMiddleware({
      token: () => localStorage.getItem('ACCESS_TOKEN') ?? '',
    })
  ],
  { noThrow: true }
)

export default () => {
  return new Environment({
    network,
    store: new Store(new RecordSource()),
  })
}