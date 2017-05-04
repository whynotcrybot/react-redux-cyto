import React from 'react'
import { Box } from 'reflexbox'
import * as styles from './styles.css'

import Toolbar from '../Toolbar'
import Matrix from '../Matrix'

const Dashboard = (props) => {
  return (
    <Box
      col={4}
      p={1}
      className={styles.wrapper}
    >
      <Toolbar graph={props.graph} />
      <Matrix
        elements={props.elements}
        nodes={props.nodes}
      />
    </Box>
  )
}

export default Dashboard
