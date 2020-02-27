import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'

const styles = theme => ({
  iconButton: {
    float: 'right',
    color: 'white',
    paddingTop: 25
  }
})

const UserMenu = props => {
  const { classes, handleLogout } = props
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        className={classes.iconButton}
        aria-controls='user-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disabled={true}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default withStyles(styles)(UserMenu)
