/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type RootRouteQueryVariables = {};
export type RootRouteQueryResponse = {
    readonly me: {
        readonly id: string;
        readonly name: string;
    };
};
export type RootRouteQuery = {
    readonly response: RootRouteQueryResponse;
    readonly variables: RootRouteQueryVariables;
};



/*
query RootRouteQuery {
  me {
    id
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootRouteQuery",
    "selections": (v0/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RootRouteQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "RootRouteQuery",
    "operationKind": "query",
    "text": "query RootRouteQuery {\n  me {\n    id\n    name\n  }\n}\n"
  }
};
})();
(node as any).hash = '35a27daffa9febe651fb38ed8731f709';
export default node;
