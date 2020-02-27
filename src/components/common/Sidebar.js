import React from 'react'

import InfoItem from '../info/InfoItem'
import LiveTvIcon from '@material-ui/icons/LiveTv'
import StarIcon from '@material-ui/icons/StarOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import ImportContacts from '@material-ui/icons/ImportContacts'

const styles = theme => ({})

const Sidebar = props => {
  return (
    <div>
      <InfoItem
        header='Live Online Sessions'
        description='Attend live interactive sessions from the comfort of your home. Schedule as convenient.'
      >
        <LiveTvIcon />
      </InfoItem>
      <InfoItem
        header="Based on MIT's LLK curriculum"
        description="Curriculum developed by alumnus of IIT, IIM, Amazon and Google based on MIT's lifelong kindergarten group."
      >
        <ImportContacts />
      </InfoItem>
      <InfoItem
        header='Best-in-class Tutors'
        description='Purple Tutor employs only the Top 99.9th percentile of Early Childhood coding experts, thoroughly vetted with 3rd party background checks.'
      >
        <StarIcon />
      </InfoItem>
    </div>
  )
}

export default withStyles(styles)(Sidebar)
