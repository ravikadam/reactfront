import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SignUp from '../pages/SignUp'
import AdminSignup from '../pages/AdminSignup'
import SignUpDetails from '../pages/SignUpDetails'
import ForgotPassword from '../pages/ForgotPassword'
import Login from '../pages/Login'
import ScrollToTop from '../components/common/ScrollTop'
import TutorSlots from '../pages/tutor/Slots'
import StudentSchedular from '../pages/student/PaidSchedular'

import TrialSession from '../pages/TrialSession'
import TrialSessionConfirmation from '../pages/ConfirmTrialSession'
import TutorDashboard from '../pages/tutor/Dashboard'
import StudentDashboard from '../pages/student/Dashboard'
import Auth from './components/Auth'
import Permission from './components/Permission'
import Session from '../pages/student/Session'
import TutorSession from '../pages/tutor/Session'
import SessionList from '../pages/tutor/SessionList'

export default props => (
  <Switch>
    <ScrollToTop>
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/adminsignup' component={AdminSignup} />
      <Route exact path='/forgotpassword' component={ForgotPassword} />
      <Route exact path='/login' component={Login} />
      <Auth>
        <Route exact path='/signup/details' component={SignUpDetails} />
        <Permission authRoles={['tutor']}>
          <Route exact path='/' component={TutorDashboard} />
          <Route exact path='/dashboard' component={TutorDashboard} />
          <Route exact path='/schedular' component={TutorSlots} />
          <Route exact path='/list/session' component={SessionList} />
          <Route exact path='/session/:bookingId' component={TutorSession} />
        </Permission>
        <Permission authRoles={['student']}>
          <Route exact path='/' component={StudentDashboard} />
          <Route exact path='/dashboard' component={StudentDashboard} />
          <Route exact path='/session/:bookingId' component={Session} />
          <Route exact path='/trial' component={TrialSession} />
          <Route exact path='/trial/time' component={TrialSession} />
          <Route
            exact
            path='/trial/confirm'
            component={TrialSessionConfirmation}
          />
          <Route exact path='/schedular' component={StudentSchedular} />
        </Permission>
      </Auth>
    </ScrollToTop>
  </Switch>
)
