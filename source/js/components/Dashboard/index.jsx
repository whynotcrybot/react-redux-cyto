import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

class Dashboard extends React.Component {
  constructor () {
    super()
    this.state = {
      matrix: {}
    }
  }

  calculateMatrix (elements) {
    let matrix = {}

    this.props.nodes.forEach(nodeX => {
      const x = nodeX.id
      const $x = '#' + x

      this.props.nodes.forEach(nodeY => {
        const y = nodeY.id
        const $y = '#' + y
        if (!(x in matrix)) matrix[x] = {}
        if (x === y) matrix[x][y] = 0
        else if (y in matrix) matrix[x][y] = matrix[y][x]
        else matrix[x][y] = elements.aStar({root: $x, goal: $y}).distance || 0
      })
    })

    this.state.matrix = matrix
  }

  render () {
    this.calculateMatrix(this.props.elements)
    const matrix = this.state.matrix

    const tableHead = Object.keys(matrix).map(x => <th key={'h' + x}>{x}</th>)
    const tableBody = Object.keys(matrix).map(x => {
      return (
        <tr key={'r' + x}>
          <td>{x}</td>
          {Object.keys(matrix[x]).map(y => <td key={'c' + y}>{matrix[x][y]}</td>)}
        </tr>
      )
    })

    return (
      <Flex>
        <Box>
          <h1>Dashboard</h1>
          <table>
            <tbody>
              <tr>
                <th />
                {tableHead}
              </tr>
              {tableBody}
            </tbody>
          </table>
        </Box>
      </Flex>
    )
  }
}

export default connect(
  (state) => {
    return {
      nodes: state.cytoscape.nodes,
      edges: state.cytoscape.edges
    }
  }
)(Dashboard)
