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
    exact: false,
    path: '/user/auth',
    component: lazy(() =>
      import(/* webpackChunkName: "AuthRoutes" */ 'pages/Auth')
    ),
  },

  {
    exact: false,
    private: true,
    path: '/org-create/:orgId/:divisionId/:branchId',
    component: lazy(() => import(/* webpackChunkName: "EmployeeAdd" */ 'pages/OrgCreate/EmployeeAdd'))
  },
  {
    exact: false,
    private: true,
    path: '/org-create/:orgId/:divisionId',
    component: lazy(() => import(/* webpackChunkName: "BranchCreate" */ 'pages/OrgCreate/BranchCreate'))
  },
  {
    exact: false,
    private: true,
    path: '/org-create/:orgId',
    component: lazy(() => import(/* webpackChunkName: "DivisionCreate" */ 'pages/OrgCreate/DivisionCreate'))
  },
  {
    exact: false,
    private: true,
    path: '/org-create',
    component: lazy(() => import(/* webpackChunkName: "OrgCreate" */ 'pages/OrgCreate'))
  },

  {
    exact: false,
    private: true,
    path: '/dashboard',
    component: lazy(() => import(/* webpackChunkName: "Dashboard" */ 'pages/Dashboard'))
  },

  {
    exact: true,
    path: '*',
    component: lazy(() => import(/* webpackChunkName: "NotFound" */ 'pages/NotFound'))
  },
]
export default routes