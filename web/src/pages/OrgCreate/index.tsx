import React from 'react'
import { Container } from '@material-ui/core'
import OrgUnitCreateForm, { OrgUnitCreateFormInputs } from 'components/OrgUnitCreateForm'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useMutation } from 'react-relay/hooks'
import { graphql } from 'babel-plugin-relay/macro'
import { OrgCreateMutation } from './__generated__/OrgCreateMutation.graphql'

const OrgCreate = () => {
  const { push } = useHistory()
  const { url } = useRouteMatch()
  const { enqueueSnackbar } = useSnackbar()

  const [commit, isOnFly] = useMutation<OrgCreateMutation>(graphql`
    mutation OrgCreateMutation($input: OrganisationAddInput!) {
      organisationAdd(input: $input) {
        organisation {
          id
        }
      }
    }
  `)

  // const token = localStorage.getItem('ACCESS_TOKEN') || ''
  const onSubmit = (data: OrgUnitCreateFormInputs) => {
    commit({
      variables: {
        input: {
          name: data.name,
        },
      },
      onCompleted: (res, errors) => {
        if (errors) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

        const id = res.organisationAdd?.organisation?.id
        if(!id) return enqueueSnackbar('Something went wrong please try again', { variant: 'error' })

        push(`${url}/${id}`)
      }
    })
  }

  return (
    <Container maxWidth='sm' style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <OrgUnitCreateForm
        title='Create you orginasation'
        onSubmit={onSubmit}
        loading={isOnFly}
      />
    </Container>
  )
}
export default OrgCreate