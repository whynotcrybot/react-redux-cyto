import React from 'react'
import { Box } from 'reflexbox'
import * as styles from './styles.css'

const Dashboard = (props) => {
  return (
    <Box
      col={4}
      p={1}
      className={styles.wrapper}
    >
      {props.children}
    </Box>
  )
}

export default Dashboard
