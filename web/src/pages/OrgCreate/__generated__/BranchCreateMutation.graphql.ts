/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type BranchAddInput = {
    divisionId: string;
    name: string;
};
export type BranchCreateMutationVariables = {
    input: BranchAddInput;
};
export type BranchCreateMutationResponse = {
    readonly branchAdd: {
        readonly branch: {
            readonly id: string;
        } | null;
    } | null;
};
export type BranchCreateMutation = {
    readonly response: BranchCreateMutationResponse;
    readonly variables: BranchCreateMutationVariables;
};



/*
mutation BranchCreateMutation(
  $input: BranchAddInput!
) {
  branchAdd(input: $input) {
    branch {
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
    "type": "BranchAddInput!"
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
    "concreteType": "BranchAddPayload",
    "kind": "LinkedField",
    "name": "branchAdd",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Branch",
        "kind": "LinkedField",
        "name": "branch",
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
    "name": "BranchCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "BranchCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "BranchCreateMutation",
    "operationKind": "mutation",
    "text": "mutation BranchCreateMutation(\n  $input: BranchAddInput!\n) {\n  branchAdd(input: $input) {\n    branch {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3fd885f8eba5722333b9926bdbeaec42';
export default node;
