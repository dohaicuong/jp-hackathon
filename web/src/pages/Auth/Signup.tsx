import React from 'react'

import { useForm, FormContext } from 'react-hook-form'
import { Typography, Button } from '@material-ui/core'
import FormTextField from 'components/form/FormTextField'
import { Link, useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useMutation } from 'react-relay/hooks'
import { graphql } from 'babel-plugin-relay/macro'
import { SignupMutation } from './__generated__/SignupMutation.graphql'

type Inputs = {
  name: string
  role: string
  email: string
  password: string
}

type SignupProps = {
  setLoading: (loading: boolean) => void
}
const Signup: React.FC<SignupProps> = ({ setLoading }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { push } = useHistory()

  const [signup, isOnFly] = useMutation<SignupMutation>(graphql`
    mutation SignupMutation($input: UserSignupInput!) {
      signup(input: $input) {
        token
      }
    }
  `)
  React.useEffect(() => {
    setLoading(isOnFly)
  }, [setLoading, isOnFly])

  const methods = useForm<Inputs>()
  const onSubmit = (data: Inputs) => {
    signup({
      variables: {
        input: data
      },
      onCompleted: (res, errors) => {
        if (errors) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

        const token = res.signup?.token ?? ''
        localStorage.setItem('ACCESS_TOKEN', token)
        // enqueueSnackbar(`Welcome, ${res?.signup?.user?.name}`, { variant: 'success' })
        enqueueSnackbar(`Welcome, Admin`, { variant: 'success' })

        push('/org-create')
      }
    })
  }

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5' gutterBottom style={{ textAlign: 'center' }}>
            Create your account
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
            <Button component={Link} to='/user/auth/login' style={{ textTransform: 'none' }}>
              Sign in instead
            </Button>
            <div style={{ flexGrow: 1 }} />
            <Button type='submit' variant='contained' color='primary' disabled={isOnFly}>
              Sign up
            </Button>
          </div>
        </div>
      </form>
    </FormContext>
  )
}
export default Signup