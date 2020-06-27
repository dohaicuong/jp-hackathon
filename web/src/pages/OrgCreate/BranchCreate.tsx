import React from 'react'
import { Container } from '@material-ui/core'
import OrgUnitCreateForm, { OrgUnitCreateFormInputs } from 'components/OrgUnitCreateForm'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

const BranchCreate = () => {
  const [loading, setLoading] = React.useState(false)
  const { orgId, divisionId } = useParams<{orgId: string, divisionId: string}>()
  const { push } = useHistory()
  const { url } = useRouteMatch()
  console.log({ orgId, divisionId })

  const onSubmit = (data: OrgUnitCreateFormInputs) => {
    console.log(data)
    setLoading(true)
    setTimeout(() => {
      push(`${url}/${data.name}`)
    }, 500)
  }
  
  return (
    <Container maxWidth='sm' style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <OrgUnitCreateForm
        title='Create first branch'
        onSubmit={onSubmit}
        loading={loading}
      />
    </Container>
  )
}
export default BranchCreate