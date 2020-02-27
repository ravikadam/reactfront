import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { commonRoutes } from './commonRoutes'
import { studentRoutes } from './studentRoutes'
import { tutorRoutes } from './tutorRoutes'
import { filter, propEq, concat, compose } from 'ramda'
import Auth from './components/Auth'
import Permission from './components/Permission'

const getOpenRoutes = compose(
  filter(propEq('private', undefined)),
  concat
)

const getPrivateRoutes = compose(
  filter(propEq('private', true)),
  concat
)

const RoutesHOC = props => {
  const { routes } = props
  return (
    <React.Fragment>
      {routes.map((route, index) => {
        return <Route {...route} />
      })}
    </React.Fragment>
  )
}

const createOpenRoutes = () => {
  const openRoutes = getOpenRoutes(
    commonRoutes,
    getOpenRoutes(studentRoutes, tutorRoutes)
  )
  return <RoutesHOC routes={openRoutes} />
}

const createPrivateRoute = () => {
  const commonPrivateRoutes = getPrivateRoutes(commonRoutes, [])
  const tutorPrivateRoutes = getPrivateRoutes(tutorRoutes, [])
  const studentPrivateRoutes = getPrivateRoutes(studentRoutes, [])
  return (
    <React.Fragment>
      <Auth>
        <RoutesHOC routes={commonPrivateRoutes} />

        <Permission authRoles={['tutor']}>
          <RoutesHOC routes={tutorPrivateRoutes} />
        </Permission>
        <Permission authRoles={['student']}>
          <RoutesHOC routes={studentPrivateRoutes} />
        </Permission>
      </Auth>
    </React.Fragment>
  )
}

export const Routes = props => {
  return (
    <Switch>
      {createOpenRoutes()}
      {createPrivateRoute()}
    </Switch>
  )
}
