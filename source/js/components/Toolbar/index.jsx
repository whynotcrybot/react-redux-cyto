import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import { newCluster, newNode, newEdge } from 'ducks/cytoscape'
import * as styles from './styles.css'

class Toolbar extends React.Component {
  constructor () {
    super()
    this.handleNodeChange = this.handleNodeChange.bind(this)
    this.state = {
      source: '',
      target: ''
    }
  }

  handleNodeChange ({target}) {
    this.setState({
      [target.id]: target.value
    })
  }

  render () {
    return (
      <Flex className={styles.toolbarWrapper}>
        <Box>
          <button onClick={() => this.props.newCluster()}>add cluster</button>
          <button onClick={() => this.props.newNode()}>add node</button>
          <br />
          <input
            id='source'
            onChange={this.handleNodeChange}
          />
          <input
            id='target'
            onChange={this.handleNodeChange}
          />
        <button
          onClick={() => this.props.newEdge(this.state.source, this.state.target)}
        >
          add edge
        </button>
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
      newNode: () => dispatch(newNode()),
      newEdge: (source, target) => dispatch(newEdge(source, target))
    }
  }
)(Toolbar)
