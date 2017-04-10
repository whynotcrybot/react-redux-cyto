import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import { newCluster, newNode } from 'ducks/cytoscape'
import * as styles from './styles.css'

const Toolbar = (props) => {
  return (
    <Flex className={styles.toolbarWrapper}>
      <Box>
        <button onClick={() => props.newCluster()}>add cluster</button>
        <button onClick={() => props.newNode()}>add node</button>
      </Box>
    </Flex>
  )
}

export default connect(
  function (state) {
    return {}
  },
  function (dispatch) {
    return {
      newCluster: () => dispatch(newCluster()),
      newNode: () => dispatch(newNode())
    }
  }
)(Toolbar)
