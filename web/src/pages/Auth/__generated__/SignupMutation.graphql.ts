/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UserSignupInput = {
    email: string;
    password: string;
    name: string;
    role: string;
};
export type SignupMutationVariables = {
    input: UserSignupInput;
};
export type SignupMutationResponse = {
    readonly signup: {
        readonly token: string;
        readonly user: {
            readonly name: string;
        };
    } | null;
};
export type SignupMutation = {
    readonly response: SignupMutationResponse;
    readonly variables: SignupMutationVariables;
};



/*
mutation SignupMutation(
  $input: UserSignupInput!
) {
  signup(input: $input) {
    token
    user {
      name
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "UserSignupInput!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "token",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuthPayload",
        "kind": "LinkedField",
        "name": "signup",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignupMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuthPayload",
        "kind": "LinkedField",
        "name": "signup",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SignupMutation",
    "operationKind": "mutation",
    "text": "mutation SignupMutation(\n  $input: UserSignupInput!\n) {\n  signup(input: $input) {\n    token\n    user {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '01ab2db1c979caaeecd28e3bf28e36e5';
export default node;
