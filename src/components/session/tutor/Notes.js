import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.js`
const styles = theme => ({
  root: { height: '50%' },
  container: {
    marginTop: '15px',
    overflow: 'scroll',
    maxHeight: '60vh'
  },
  cardContent: {
    paddingTop: '8px'
  }
})

const SessionActivity = props => {
  const { classes, student, teacher, classDetails, stars } = props
  const steps = [
    'Introduction',
    'Comparative Adjectives',
    'First Conditional',
    'going to',
    'next home'
  ]
  return (
    <div className={classes.container}>
      {classDetails && (
        <Document
          file={`https://cors-anywhere.herokuapp.com/${classDetails.document_url}`}
        >
          <Page pageNumber={1} />
        </Document>
      )}
    </div>
  )
}

SessionActivity.propTypes = {}

export default withStyles(styles)(SessionActivity)
