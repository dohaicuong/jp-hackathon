import React from 'react'
import { Container } from '@material-ui/core'
import OrgUnitCreateForm, { OrgUnitCreateFormInputs } from 'components/OrgUnitCreateForm'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useMutation } from 'react-relay/hooks'
import { graphql } from 'babel-plugin-relay/macro'
import { DivisionCreateMutation } from './__generated__/DivisionCreateMutation.graphql'

const DivisionCreate = () => {
  const { orgId } = useParams<{orgId: string}>()
  const { push } = useHistory()
  const { url } = useRouteMatch()
  const { enqueueSnackbar } = useSnackbar()

  const [commit, isOnFly] = useMutation<DivisionCreateMutation>(graphql`
    mutation DivisionCreateMutation($input: DivisionAddInput!) {
      divisionAdd(input: $input) {
        division {
          id
        }
      }
    }
  `)

  const onSubmit = (data: OrgUnitCreateFormInputs) => {
    commit({
      variables: {
        input: {
          organisationId: orgId,
          name: data.name
        }
      },
      onCompleted: (res, errors) => {
        if (errors) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

        const id = res.divisionAdd?.division?.id
        if(!id) return enqueueSnackbar('Something went wrong please try again', { variant: 'error' })

        push(`${url}/${id}`)
      }
    })
  }

  return (
    <Container maxWidth='sm' style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <OrgUnitCreateForm
        title='Create first division'
        onSubmit={onSubmit}
        loading={isOnFly}
      />
    </Container>
  )
}
export default DivisionCreate