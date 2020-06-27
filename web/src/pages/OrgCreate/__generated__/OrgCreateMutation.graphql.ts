/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type OrganisationAddInput = {
    name: string;
};
export type OrgCreateMutationVariables = {
    input: OrganisationAddInput;
};
export type OrgCreateMutationResponse = {
    readonly organisationAdd: {
        readonly organisation: {
            readonly id: string;
        } | null;
    } | null;
};
export type OrgCreateMutation = {
    readonly response: OrgCreateMutationResponse;
    readonly variables: OrgCreateMutationVariables;
};



/*
mutation OrgCreateMutation(
  $input: OrganisationAddInput!
) {
  organisationAdd(input: $input) {
    organisation {
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
    "type": "OrganisationAddInput!"
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
    "concreteType": "OrganisationAddPayload",
    "kind": "LinkedField",
    "name": "organisationAdd",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Organisation",
        "kind": "LinkedField",
        "name": "organisation",
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
    "name": "OrgCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrgCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "OrgCreateMutation",
    "operationKind": "mutation",
    "text": "mutation OrgCreateMutation(\n  $input: OrganisationAddInput!\n) {\n  organisationAdd(input: $input) {\n    organisation {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '9d1f4ae56ba1e82fab34c82571710684';
export default node;
