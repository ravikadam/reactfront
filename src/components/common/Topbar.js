import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import MenuIcon from '@material-ui/icons/Menu'
import { helpDeskNumber } from '../../helpers/utils'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import UserMenu from './UserMenu'

import { logout } from '../../actions'

const logo = require('../../images/logo.png')
const styles = theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`
  },
  grow: {
    flexGrow: 1
  },
  inline: {
    display: 'inline'
  },
  helpdesk: {
    color: 'white'
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  logo: {
    paddingTop: 16,
    cursor: 'pointer'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: '1.5em'
    }
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.8em'
    }
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconButton: {
    float: 'right',
    color: 'white'
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tabItem: {
    color: 'white',
    minWidth: 'auto',
    fontSize: '1.3rem',
    fontFamily: 'fjalla one',
    fontWeight: '400!important',
    letterSpacing: '0.1rem',
    paddingTop: 15
  },
  outerTop: {
    width: '100%'
  },
  innerTop: {
    maxWidth: '1100px'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }
})

class Topbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      menuDrawer: false
    }
  }

  handleLogout() {
    this.props.logoutSession()
  }

  handleChange(event, value) {
    if (this) this.setState({ value })
  }

  mobileMenuOpen(event) {
    this.setState({ menuDrawer: true })
  }

  mobileMenuClose(event) {
    this.setState({ menuDrawer: false })
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  current() {
    switch (this.props.location.pathname) {
      case '/dashboard':
        return 0
      case '/schedular':
        return 1
      case '/list/session':
        return 2
      default:
        return 0
    }
  }

  render() {
    const { classes } = this.props

    return (
      <AppBar position='absolute' className={classes.appBar}>
        <div align='center' className={classes.outerTop}>
          <div align='left' className={classes.innerTop}>
            <Toolbar>
              <Grid container spacing={24} alignItems='baseline'>
                <Grid item xs={12} className={classes.flex}>
                  {(!this.props.menuItems ||
                    this.props.menuItems.length <= 0) && (
                    <div className={classes.inline}>
                      <Typography variant='h6' color='inherit' noWrap>
                        <img
                          width={150}
                          className={classes.logo}
                          src={logo}
                          alt=''
                        />
                      </Typography>
                    </div>
                  )}
                  {this.props.menuItems && this.props.menuItems.length > 0 && (
                    <div className={classes.inline}>
                      <Typography variant='h6' color='inherit' noWrap>
                        <Link to='/' className={classes.link}>
                          <img
                            width={150}
                            className={classes.logo}
                            src={logo}
                            alt=''
                          />
                        </Link>
                      </Typography>
                    </div>
                  )}
                  <React.Fragment>
                    <div className={classes.productLogo} />

                    <div className={classes.tabContainer}>
                      <RenderMobileMenu
                        search={this.props.location.search}
                        menuDrawer={this.state.menuDrawer}
                        onMobileMenuClose={this.mobileMenuClose.bind(this)}
                        onMobileMenuOpen={this.mobileMenuOpen.bind(this)}
                        handleLogout={this.handleLogout.bind(this)}
                        menuItems={this.props.menuItems}
                      />
                      <RenderDeskTopMenu
                        currentTab={this.current() || this.state.value}
                        handleChange={this.handleChange}
                        search={this.props.location.search}
                        classes={classes}
                        menuItems={this.props.menuItems}
                      />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.iconContainer}>
                      <IconButton
                        onClick={this.mobileMenuOpen.bind(this)}
                        className={classes.iconButton}
                        color='inherit'
                        aria-label='Menu'
                      >
                        <MenuIcon />
                      </IconButton>
                    </div>
                    <div className={classes.sectionDesktop}>
                      <UserMenu handleLogout={this.handleLogout.bind(this)} />
                    </div>
                  </React.Fragment>
                </Grid>
              </Grid>
              &nbsp;&nbsp;
              <Typography variant='subtitle1' className={classes.helpdesk}>
                Helpdesk: {helpDeskNumber}
              </Typography>
            </Toolbar>
          </div>
        </div>
      </AppBar>
    )
  }
}

const RenderMobileMenu = props => {
  const {
    menuDrawer,
    onMobileMenuClose,
    search,
    menuItems,
    handleLogout
  } = props

  return (
    <SwipeableDrawer
      anchor='right'
      open={menuDrawer}
      onClose={onMobileMenuClose}
      onOpen={() => {}}
    >
      <AppBar title='Menu' children='' />
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            component={Link}
            to={{ pathname: item.pathname, search: search }}
            button
            key={item.label}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemText primary='Log Out' />
        </ListItem>
      </List>
    </SwipeableDrawer>
  )
}

const RenderDeskTopMenu = props => {
  const { currentTab, handleChange, classes, search, menuItems } = props

  return (
    <Tabs value={currentTab} onChange={handleChange}>
      {menuItems.map((item, index) => (
        <Tab
          key={index}
          component={Link}
          to={{ pathname: item.pathname, search: search }}
          classes={{ root: classes.tabItem }}
          label={item.label}
        />
      ))}
    </Tabs>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logoutSession: () => {
      dispatch(logout.request())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(Topbar)))
