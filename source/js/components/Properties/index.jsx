import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'

import Matrix from './Matrix'

class Properties extends React.Component {
  constructor () {
    super()
    this.state = {
      showMatrices: false,
      matrixSimple: {},
      matrixWeighted: {},
      s: null,
      d: null,
      _d: null,
      c: null,
      t: null
    }
  }

  calculateSimpleAdjacencyMatrix () {
    let matrix = {}
    let sMax = 0

    this.props.nodes.forEach(nodeX => {
      const x = nodeX.id
      let s = 0

      this.props.nodes.forEach(nodeY => {
        const y = nodeY.id

        if (!(x in matrix)) matrix[x] = {}
        if (x === y) matrix[x][y] = null
        else if (y in matrix) {
          if (matrix[y][x] === 1) s++
          matrix[x][y] = matrix[y][x]
        } else {
          matrix[x][y] = null
          this.props.edges.some(edge => {
            const hasConnections = ((edge.source === x && edge.target === y) ||
                (edge.source === y && edge.target === x))

            if (hasConnections) {
              matrix[x][y] = 1
              s++
              return true
            }
          })
        }
      })

      if (s > sMax) sMax = s
    })

    this.state.s = sMax
    return matrix
  }

  calculateWeightedAdjacencyMatrix (elements) {
    let matrix = {}
    let sum = 0

    this.props.nodes.forEach(nodeX => {
      const x = nodeX.id
      const $x = '#' + x

      this.props.nodes.forEach(nodeY => {
        const y = nodeY.id
        const $y = '#' + y

        if (!(x in matrix)) matrix[x] = {}
        if (x === y) matrix[x][y] = null
        else if (y in matrix) matrix[x][y] = matrix[y][x]
        else {
          const distance = elements.aStar({root: $x, goal: $y}).distance
          matrix[x][y] = distance || null
          sum += distance || null
        }

        if (matrix[x][y] > this.state.d) this.state.d = matrix[x][y]
      })
    })

    const nodes = this.props.nodes.length
    this.state._d = sum / (nodes * (nodes - 1))
    this.state.c = this.state.d * nodes * this.state.s
    this.state.t = (2 * this.state._d) / this.state.s
    return matrix
  }

  render () {
    this.state.matrixSimple = this.calculateSimpleAdjacencyMatrix()
    this.state.matrixWeighted = this.calculateWeightedAdjacencyMatrix(this.props.elements)

    return (
      <Flex>
        <Box>
          {this.state.showMatrices ? (
            <div>
              <Matrix matrix={this.state.matrixSimple} />
              <Matrix matrix={this.state.matrixWeighted} />
            </div>
          ) : ''}
          <p>S = {this.state.s}</p>
          <p>D = {this.state.d}</p>
          <p>_D = {this.state._d}</p>
          <p>C = {this.state.c}</p>
          <p>T = {this.state.t}</p>
        </Box>
      </Flex>
    )
  }
}

export default connect(
  (state, ownProps) => {
    const graph = ownProps.graph
    return {
      nodes: state.cytoscape[graph] ? state.cytoscape[graph].nodes : [],
      edges: state.cytoscape[graph] ? state.cytoscape[graph].edges : []
    }
  }
)(Properties)
