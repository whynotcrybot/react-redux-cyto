import React from 'react'
import { connect } from 'react-redux'
import cytoscape from 'cytoscape'
import { Flex, Box } from 'reflexbox'

import { initGraph, addCluster } from 'ducks/cytoscape'

import Dashboard from 'components/Dashboard'

import * as styles from './styles.css'

class Graph extends React.Component {
  constructor (props) {
    super(props)
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this)
  }

  renderCytoscapeElement () {
    this.cy = cytoscape({
      container: document.getElementById(this.props.graph),

      boxSelectionEnabled: true,
      autounselectify: false,
      zoomingEnabled: true,
      zoom: 1,

      style: cytoscape.stylesheet()
        .selector('node')
        .css({
          'height': 26,
          'width': 26,
          'font-size': '15px',
          'text-valign': 'center',
          'text-halign': 'center',
          'background-color': '#555',
          'text-outline-color': '#555',
          'text-outline-width': '2px',
          'color': '#fff',
          'content': 'data(id)',
          'overlay-padding': '6px',
          'z-index': 10
        })
        .selector('edge')
        .css({
          'width': 2,
          'opacity': 0.4,
          'line-color': '#bbb',
          'overlay-padding': '3px'
        })
    })
  }

  renderElements (nodes, edges) {
    const formatEntities = entity => ({ data: entity })
    this.cy.json({elements: {
      nodes: nodes.map(formatEntities),
      edges: edges.map(formatEntities)
    }})
  }

  renderLayout (layout) {
    this.cy.layout(layout)
  }

  componentWillMount () {
    if (!this.props.nodes.length) {
      this.props.initGraph()
      this.props.addCluster()
    }
  }

  componentWillReceiveProps (props) {
    this.renderElements(props.nodes, props.edges)
    this.renderLayout(props.layout)
  }

  componentDidMount () {
    this.renderCytoscapeElement()
  }

  render (props) {
    return (
      <Flex
        className={styles.wrapper}
        wrap
      >
        <Box col={8}>
          <div className={styles.cytoscapeCanvasWrapper} id={this.props.graph} />
        </Box>
        {this.cy ? (
          <Dashboard
            graph={this.props.graph}
            elements={this.cy.elements()}
          />
        ) : ''}
      </Flex>
    )
  }
}

export default connect(
  (state, ownProps) => {
    const graph = ownProps.graph
    return {
      nodes: state.cytoscape[graph] ? state.cytoscape[graph].nodes : [],
      edges: state.cytoscape[graph] ? state.cytoscape[graph].edges : [],
      layout: state.cytoscape.layout
    }
  },
  (dispatch, ownProps) => {
    const graph = ownProps.graph
    return {
      initGraph: () => dispatch(initGraph(graph)),
      addCluster: () => dispatch(addCluster(graph))
    }
  }
)(Graph)
