/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type EmployeesAddInput = {
    branchId: string;
    employees?: Array<EmployeeEntryInput | null> | null;
};
export type EmployeeEntryInput = {
    name: string;
    role: string;
};
export type EmployeeAddMutationVariables = {
    input: EmployeesAddInput;
};
export type EmployeeAddMutationResponse = {
    readonly employeesAdd: {
        readonly employees: ReadonlyArray<{
            readonly id: string;
        } | null> | null;
    } | null;
};
export type EmployeeAddMutation = {
    readonly response: EmployeeAddMutationResponse;
    readonly variables: EmployeeAddMutationVariables;
};



/*
mutation EmployeeAddMutation(
  $input: EmployeesAddInput!
) {
  employeesAdd(input: $input) {
    employees {
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
    "type": "EmployeesAddInput!"
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
    "concreteType": "EmployeesAddPayload",
    "kind": "LinkedField",
    "name": "employeesAdd",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "employees",
        "plural": true,
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
    "name": "EmployeeAddMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EmployeeAddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "EmployeeAddMutation",
    "operationKind": "mutation",
    "text": "mutation EmployeeAddMutation(\n  $input: EmployeesAddInput!\n) {\n  employeesAdd(input: $input) {\n    employees {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a5985dedd743c505a83c8bc34f146186';
export default node;
