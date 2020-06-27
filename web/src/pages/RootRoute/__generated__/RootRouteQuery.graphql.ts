/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type RootRouteQueryVariables = {};
export type RootRouteQueryResponse = {
    readonly me: {
        readonly branch: {
            readonly id: string;
        };
    };
};
export type RootRouteQuery = {
    readonly response: RootRouteQueryResponse;
    readonly variables: RootRouteQueryVariables;
};



/*
query RootRouteQuery {
  me {
    branch {
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "Branch",
  "kind": "LinkedField",
  "name": "branch",
  "plural": false,
  "selections": [
    (v0/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RootRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "RootRouteQuery",
    "operationKind": "query",
    "text": "query RootRouteQuery {\n  me {\n    branch {\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '849b55a0246acbbec964db3a794d826f';
export default node;
