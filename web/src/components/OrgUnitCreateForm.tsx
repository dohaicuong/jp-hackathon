import React from 'react'
import { Paper, Typography, Grid, Button, makeStyles, LinearProgress } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

import { useForm, FormContext } from 'react-hook-form'
import FormTextField from 'components/form/FormTextField'

export type OrgUnitCreateFormInputs = {
  name: string
}
type OrgUnitCreateFormProps = {
  loading?: boolean
  onSubmit: (data: OrgUnitCreateFormInputs) => void
  title: string
}
const OrgUnitCreateForm: React.FC<OrgUnitCreateFormProps> = ({ 
  onSubmit,
  loading = false,
  title,
}) => {
  const classes = useStyles()
  const methods = useForm<OrgUnitCreateFormInputs>()

  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={classes.form}>
        <Paper>
          {loading && <LinearProgress />}
          <div className={classes.root}>
            <Typography variant='h5' gutterBottom>
              {title}
            </Typography>
            <Grid container>
              <Grid item xs={10}>
                <FormTextField
                  label='Name'
                  name='name'
                  variant='outlined'
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={2} className={classes.buttonWrapper}>
                <Button
                  type='submit'
                  startIcon={<SendIcon />}
                  classes={{ startIcon: classes.buttonIcon }}
                  size='large'
                  fullWidth
                  variant='contained'
                  color='primary'
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
      </form>
    </FormContext>
  )
}
export default OrgUnitCreateForm
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