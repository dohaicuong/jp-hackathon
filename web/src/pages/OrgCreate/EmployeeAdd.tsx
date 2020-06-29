import React from 'react'
import { Container, Paper, makeStyles, Typography, Grid, Button, IconButton, LinearProgress } from '@material-ui/core'
import { useForm, FormContext, useFieldArray } from 'react-hook-form'
import { useParams, useHistory } from 'react-router-dom'
import FormTextField from 'components/form/FormTextField'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { useSnackbar } from 'notistack'
import { useMutation } from 'react-relay/hooks'
import { graphql } from 'babel-plugin-relay/macro'
import { EmployeeAddMutation } from './__generated__/EmployeeAddMutation.graphql'

const EmployeeAdd = () => {
  const { branchId } = useParams<{orgId: string, divisionId: string, branchId: string}>()
  const { push } = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const [commit, isOnFly] = useMutation<EmployeeAddMutation>(graphql`
    mutation EmployeeAddMutation($input: EmployeesAddInput!) {
      employeesAdd(input: $input) {
        employees {
          id
        }
      }
    }
  `)

  const onSubmit = (data: EmployeeCreateFormInputs) => {
    const cleanedEmployees = data.employees.filter(employee => employee.name && employee.role)
    commit({
      variables: {
        input: {
          branchId,
          employees: cleanedEmployees,
        }
      },
      onCompleted: (res, errors) => {
        if (errors) return errors.forEach(error => enqueueSnackbar(error.message, { variant: 'error' }))

        push('/dashboard')
      }
    })
  }
  const handleSkip = () => {
    push('/dashboard')
  }

  return (
    <Container maxWidth='sm' style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <EmployeeCreateForm
        title='Add your employee'
        onSubmit={onSubmit}
        loading={isOnFly}
        handleSkip={handleSkip}
      />
    </Container>
  )
}
export default EmployeeAdd

type EmployeeCreateFormInputs = {
  employees: EmployeeInputs[]
}
type EmployeeInputs = {
  name: string
  role: string
}
type EmployeeCreateFormProps = {
  title: string
  loading?: boolean
  onSubmit: (data: EmployeeCreateFormInputs) => void
  handleSkip: () => void
}
const EmployeeCreateForm: React.FC<EmployeeCreateFormProps> = ({ title, onSubmit, loading = false, handleSkip }) => {
  const classes = useStyles()
  const methods = useForm<EmployeeCreateFormInputs>({
    defaultValues: {
      employees: [
        { name: '', role: '' },
      ]
    }
  })
  const { fields, append, remove } = useFieldArray({ control: methods.control, name: 'employees' })

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={classes.form}>
        <Paper>
          {loading && <LinearProgress />}
          <div className={classes.root}>
            <Typography variant='h5' gutterBottom>
              {title}
            </Typography>
            <Grid container spacing={2}>
              {fields.map((field, index) => (
                <Grid item xs={12} key={field.id} container spacing={1}>
                  <Grid item xs={6}>
                    <FormTextField label='Name' name={`employees[${index}].name`} variant='outlined' fullWidth required={!Boolean(fields.length === index + 1)} />
                  </Grid>
                  <Grid item xs={5}>
                    <FormTextField label='Role' name={`employees[${index}].role`} variant='outlined' fullWidth required={!Boolean(fields.length === index + 1)} />
                  </Grid>
                  <Grid item xs={1}>
                    {fields.length === index + 1
                      ? (
                        <IconButton onClick={() => append({ name: '', role: '' })}>
                          <AddIcon />
                        </IconButton>
                      )
                      : (
                        <IconButton onClick={() => remove(index)}>
                          <RemoveIcon />
                        </IconButton>
                      )
                    }
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} style={{ display: 'flex', marginTop: 8 }}>
                <Button color="primary" onClick={handleSkip}>
                  Skip
                </Button>
                <div style={{ flexGrow: 1 }} />
                <Button variant="contained" color="primary" type='submit'>
                  Done
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </form>
    </FormContext>
  )
}
const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
  },
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  buttonWrapper: {
    display: 'flex'
  },
  buttonIcon: {
    margin: 0
  }
}))