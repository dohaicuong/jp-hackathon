import React from 'react'
import { Container } from '@material-ui/core'
import OrgUnitCreateForm, { OrgUnitCreateFormInputs } from 'components/OrgUnitCreateForm'
import { useHistory, useRouteMatch } from 'react-router-dom'

const OrgCreate = () => {
  const [loading, setLoading] = React.useState(false)
  const { push } = useHistory()
  const { url } = useRouteMatch()

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
        title='Create you orginasation'
        onSubmit={onSubmit}
        loading={loading}
      />
    </Container>
  )
}
export default OrgCreate