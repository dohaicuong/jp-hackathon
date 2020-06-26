import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'

const RouteLoading: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}
export default RouteLoading
const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    width: '100vw', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}))