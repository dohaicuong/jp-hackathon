import React from 'react'
import { Container } from '@material-ui/core'
import OrgUnitCreateForm, { OrgUnitCreateFormInputs } from 'components/OrgUnitCreateForm'
import { useHistory, useParams, useRouteMatch } from 'react-router-dom'

const DivisionCreate = () => {
  const [loading, setLoading] = React.useState(false)
  const { orgId } = useParams<{orgId: string}>()
  const { push } = useHistory()
  const { url } = useRouteMatch()
  console.log({ orgId })

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
        title='Create first division'
        onSubmit={onSubmit}
        loading={loading}
      />
    </Container>
  )
}
export default DivisionCreate