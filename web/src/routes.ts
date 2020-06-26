import { lazy } from 'react'
import { AppRouteProps } from 'components/route/RenderRoute'

const routes: AppRouteProps[] = [
  {
    exact: true,
    path: '/',
    component: lazy(() =>
      import(/* webpackChunkName: "RootRoute" */ 'pages/RootRoute')
    ),
  },
  {
    exact: true,
    path: '/user/signup',
    component: lazy(() =>
      import(/* webpackChunkName: "SignupPage" */ 'pages/Signup')
    ),
  },
  {
    exact: true,
    path: '/user/login',
    component: lazy(() =>
      import(/* webpackChunkName: "LoginPage" */ 'pages/Login')
    ),
  },
]
export default routes