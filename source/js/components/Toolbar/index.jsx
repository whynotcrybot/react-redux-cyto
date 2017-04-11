import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import { addCluster, addNode, addEdge } from 'ducks/cytoscape'
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

  addEdge () {
    this.props.addEdge(this.state.source, this.state.target)
  }

  render () {
    return (
      <Flex className={styles.toolbarWrapper}>
        <Box>
          <button onClick={() => this.props.addCluster()}>add cluster</button>
          <button onClick={() => this.props.addNode()}>add node</button>
          <br />
          <input
            id='source'
            onChange={this.handleNodeChange}
          />
          <input
            id='target'
            onChange={this.handleNodeChange}
          />
          <button onClick={() => this.addEdge()}>add edge</button>
        </Box>
      </Flex>
    )
  }
}

export default connect(
  () => ({}),
  (dispatch) => {
    return {
      addCluster: () => dispatch(addCluster()),
      addNode: () => dispatch(addNode()),
      addEdge: (source, target) => dispatch(addEdge(source, target))
    }
  }
)(Toolbar)
