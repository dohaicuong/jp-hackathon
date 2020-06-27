/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type DivisionAddInput = {
    organisationId: string;
    name: string;
};
export type DivisionCreateMutationVariables = {
    input: DivisionAddInput;
};
export type DivisionCreateMutationResponse = {
    readonly divisionAdd: {
        readonly division: {
            readonly id: string;
        } | null;
    } | null;
};
export type DivisionCreateMutation = {
    readonly response: DivisionCreateMutationResponse;
    readonly variables: DivisionCreateMutationVariables;
};



/*
mutation DivisionCreateMutation(
  $input: DivisionAddInput!
) {
  divisionAdd(input: $input) {
    division {
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
    "type": "DivisionAddInput!"
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
    "concreteType": "DivisionAddPayload",
    "kind": "LinkedField",
    "name": "divisionAdd",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Division",
        "kind": "LinkedField",
        "name": "division",
        "plural": false,
        "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DivisionCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DivisionCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "DivisionCreateMutation",
    "operationKind": "mutation",
    "text": "mutation DivisionCreateMutation(\n  $input: DivisionAddInput!\n) {\n  divisionAdd(input: $input) {\n    division {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ab1e46dc7f1bb2fca8c9d6ee42dca2c0';
export default node;
