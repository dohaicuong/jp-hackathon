import React from 'react'

import { useForm, FormContext } from 'react-hook-form'
import { Typography, Button } from '@material-ui/core'
import FormTextField from 'components/form/FormTextField'
import { Link, useHistory } from 'react-router-dom'
import { useMutation } from 'react-relay/hooks'
import { graphql } from 'babel-plugin-relay/macro'
import { useSnackbar } from 'notistack'

import { LoginMutation } from './__generated__/LoginMutation.graphql'

type Inputs = {
  email: string
  password: string
}

type LoginProps = {
  setLoading: (loading: boolean) => void
}
const Login: React.FC<LoginProps> = ({ setLoading }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { push } = useHistory()

  const [login, isOnFly] = useMutation<LoginMutation>(graphql`
    mutation LoginMutation($input: UserLoginInput!) {
      login(input: $input) {
        token
        # user {
        #   name
        # }
      }
    }
  `)
  React.useEffect(() => {
    setLoading(isOnFly)
  }, [setLoading, isOnFly])

  const methods = useForm<Inputs>()
  const onSubmit = (data: Inputs) => {
    login({
      variables: {
        input: data
      },
      onCompleted: (res, errors) => {
        if (errors) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

        const token = res.login?.token ?? ''
        localStorage.setItem('ACCESS_TOKEN', token)
        // enqueueSnackbar(`Welcome, ${res.login?.user?.name}`, { variant: 'success' })
        enqueueSnackbar(`Welcome, Admin`, { variant: 'success' })

        push('/dashboard')
      }
    })
  }

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5' gutterBottom style={{ textAlign: 'center' }}>
            Sign in to your account
          </Typography>
          <FormTextField
            label='Email'
            name='email'
            type='email'
            variant='outlined'
            required
            style={{ marginBottom: 16 }}
          />
          <FormTextField
            label='Password'
            name='password'
            type='password'
            variant='outlined'
            required
            style={{ marginBottom: 16 }}
          />
          <div style={{ display: 'flex'}}>
            <Button component={Link} to='/user/auth/signup' style={{ textTransform: 'none' }}>
              Create account
            </Button>
            <div style={{ flexGrow: 1 }} />
            <Button type='submit' variant='contained' color='primary' disabled={isOnFly}>
              Login
            </Button>
          </div>
        </div>
      </form>
    </FormContext>
  )
}
export default Login