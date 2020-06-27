import React from 'react'
import { Container, Paper, LinearProgress } from '@material-ui/core'
import { useRouteMatch, Switch, Route, useHistory } from 'react-router-dom'

import Logo from 'resources/Logo'

const Login = React.lazy(() => import('./Login')) as any
const Signup = React.lazy(() => import('./Signup')) as any

const Auth = () => {
  const { url, isExact } = useRouteMatch()
  const { push } = useHistory()

  const token = localStorage.getItem('ACCESS_TOKEN')

  React.useEffect(() => {
    if (token) {
      push('/')
    }
    else if (isExact) push(`${url}/login`)
  }, [token, isExact, url, push])

  const [loading, setLoading] = React.useState(false)

  return (
    <React.Suspense fallback={<AuthForm loading={true} />}>
      <AuthForm loading={loading}>
        <Switch>
          <Route exact path={`${url}/login`} render={props => {
            return <Login {...props} setLoading={setLoading} />
          }} />
          <Route exact path={`${url}/signup`} render={props => {
            return <Signup {...props} setLoading={setLoading} />
          }} />
        </Switch>
      </AuthForm>
    </React.Suspense>
  )
}
export default Auth

type AuthFormProps = {
  loading: boolean
}
const AuthForm: React.FC<AuthFormProps> = ({ loading = false, children }) => {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth='sm'>
        {loading && <LinearProgress />}
        <Paper style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Logo style={{ width: '60%', height: 'auto' }} />
          </div>
          {children}
        </Paper>
      </Container>
    </div>
  )
}