import React from 'react'
import { Switch, Route, RouteProps } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

export type AppRouteProps = RouteProps & {
  private?: boolean
}
export type RenderRouteProps = {
  routes: AppRouteProps[]
}
const RenderRoute: React.FC<RenderRouteProps> = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, index) => {
        // @ts-ignore
        if (route.private) return <PrivateRoute key={index} {...route} />
        return <Route key={index} {...route} />
      })}
    </Switch>
  )
}
export default RenderRoute