import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import { newCluster, newNode } from 'ducks/cytoscape'
import * as styles from './styles.css'

class Toolbar extends React.Component {
  render () {
    return (
      <Flex className={styles.toolbarWrapper}>
        <Box>
          <button onClick={() => this.props.newCluster()}>add cluster</button>
          <button onClick={() => this.props.newNode()}>add node</button>
        </Box>
      </Flex>
    )
  }
}

export default connect(
  () => ({}),
  (dispatch) => {
    return {
      newCluster: () => dispatch(newCluster()),
      newNode: () => dispatch(newNode())
    }
  }
)(Toolbar)
