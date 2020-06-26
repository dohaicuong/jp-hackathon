import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

type PrivateRouteProps = RouteProps & {
  component: any
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const token = localStorage.getItem('ACCESS_TOKEN')

  return (
    <Route
      {...rest}
      render={props =>
        token && Component ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/user/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}
export default PrivateRoute
