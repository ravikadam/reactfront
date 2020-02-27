import Slots from '../pages/Slots'
import TeacherDashboard from '../pages/teacher/Dashboard'
import Login from '../pages/Login'
import SessionList from '../pages/tutor/SessionList'

export const teacherRoutes = [
  {
    path: '/',
    exact: true,
    component: TeacherDashboard,
    private: true
  },
  {
    path: '/schedular',
    exact: true,
    component: Slots,
    private: true
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/list/session',
    exact: true,
    component: SessionList,
    private: true
  }
]
