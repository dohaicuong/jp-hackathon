/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UserSignupInput = {
    email: string;
    password: string;
};
export type SignupMutationVariables = {
    input: UserSignupInput;
};
export type SignupMutationResponse = {
    readonly signup: {
        readonly token: string;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AuthPayload",
    "kind": "LinkedField",
    "name": "signup",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignupMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignupMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "SignupMutation",
    "operationKind": "mutation",
    "text": "mutation SignupMutation(\n  $input: UserSignupInput!\n) {\n  signup(input: $input) {\n    token\n  }\n}\n"
  }
};
})();
(node as any).hash = '73b9faba66962fab946599607f9f9d70';
export default node;
