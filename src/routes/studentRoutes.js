import SignUp from '../pages/SignUp'
import Login from '../pages/Login'

import TrialSession from '../pages/TrialSession'
import TrialSessionConfirmation from '../pages/ConfirmTrialSession'
import StudentDashboard from '../pages/student/Dashboard'

export const studentRoutes = [
  {
    path: '/',
    exact: true,
    component: StudentDashboard,
    private: true
  },
  {
    path: '/signup',
    exact: true,
    component: SignUp
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/trial',
    exact: true,
    component: TrialSession,
    private: true
  },
  {
    path: '/trial/time',
    exact: true,
    component: Login,
    private: true
  },
  {
    path: '/trial/confirm',
    exact: true,
    component: TrialSessionConfirmation,
    private: true
  }
]
