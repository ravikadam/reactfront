const DATE_OPTIONS = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}
export const formatDate = date =>
  new Date(date).toLocaleDateString('en-US', DATE_OPTIONS)
export const detectMobile = () => {
  if (window.innerWidth <= 800 && window.innerHeight <= 600) {
    return true
  } else {
    return false
  }
}
export const getAvatar = name => {
  let words = name.split(' ')
  return words.map(word => word.substring(0, 1).toUpperCase()).join()
}

let studentMobile = ''

export const exclusionRoutes = [
  '/signup',
  '/login',
  '/forgotpassword',
  '/adminsignup'
]

export const getMenu = (isTrialStudent = false, isTeacher = false) => {
  let menuItems = [
    {
      label: 'Dashboard',
      pathname: '/'
    }
  ]
  if (!isTrialStudent)
    menuItems.push({
      label: 'Scheduler',
      pathname: '/schedular'
    })
  if (isTeacher)
    menuItems.push({
      label: 'Sessions',
      pathname: '/list/session'
    })

  return menuItems
}

export const setStudentMobile = m => {
  studentMobile = m
}

export const getStudentMobile = () => {
  return studentMobile
}

export const helpDeskNumber = '022-491-65000'
