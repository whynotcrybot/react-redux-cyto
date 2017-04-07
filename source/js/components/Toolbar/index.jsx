import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import { addNode, addEdge, addCluster } from 'ducks/cytoscape'
import * as styles from './styles.css'

const Toolbar = (props) => {
  return (
    <Flex className={styles.toolbarWrapper}>
      <Box>
        <button onClick={() => props.addCluster()}>add cluster</button>
        <button onClick={() => props.addNode('kek')}>add node</button>
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
      addNode: (id) => dispatch(addNode(id)),
      addEdge: (source, target) => dispatch(addEdge(source, target)),
      addCluster: () => dispatch(addCluster())
    }
  }
)(Toolbar)
