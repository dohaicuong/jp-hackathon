import React from 'react'
import { Container } from '@material-ui/core'
import OrgUnitCreateForm, { OrgUnitCreateFormInputs } from 'components/OrgUnitCreateForm'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useMutation } from 'react-relay/hooks'
import { graphql } from 'babel-plugin-relay/macro'
import { BranchCreateMutation } from './__generated__/BranchCreateMutation.graphql'

const BranchCreate = () => {
  const { divisionId } = useParams<{orgId: string, divisionId: string}>()
  const { push } = useHistory()
  const { url } = useRouteMatch()
  const { enqueueSnackbar } = useSnackbar()

  const [commit, isOnFly] = useMutation<BranchCreateMutation>(graphql`
    mutation BranchCreateMutation($input: BranchAddInput!) {
      branchAdd(input: $input) {
        branch {
          id
        }
      }
    }
  `)


  const onSubmit = (data: OrgUnitCreateFormInputs) => {
    commit({
      variables: {
        input: {
          divisionId,
          name: data.name
        }
      },
      onCompleted: (res, errors) => {
        if (errors) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

        const id = res.branchAdd?.branch?.id
        if(!id) return enqueueSnackbar('Something went wrong please try again', { variant: 'error' })

        push(`${url}/${id}`)
      }
    })
  }
  
  return (
    <Container maxWidth='sm' style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <OrgUnitCreateForm
        title='Create first branch'
        onSubmit={onSubmit}
        loading={isOnFly}
      />
    </Container>
  )
}
export default BranchCreate