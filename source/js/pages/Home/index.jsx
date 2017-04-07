import React from 'react'
import { connect } from 'react-redux'
import cytoscape from 'cytoscape'
import { addNode, addEdge, addCluster } from 'ducks/cytoscape'

import * as styles from './styles.css'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this)
  }

  renderCytoscapeElement () {
    this.cy = cytoscape({
      container: document.getElementById('cy'),

      boxSelectionEnabled: true,
      autounselectify: false,
      zoomingEnabled: false,
      zoom: 1.2,

      style: cytoscape.stylesheet()
        .selector('node')
        .css({
          'height': 20,
          'width': 20,
          'font-size': '12px',
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
    nodes.forEach(node => this.cy.add(node))
    edges.forEach(edge => this.cy.add(edge))
  }

  renderLayout (layout) {
    this.cy.layout(layout)
  }

  componentWillMount () {
    if (!this.props.nodes.length) this.props.addCluster()
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
      <div>
        <div className={styles.cytoscapeWrapper} id='cy' />
      </div>
    )
  }
}

export default connect(
  function (state) {
    return {
      nodes: state.cytoscape.nodes,
      edges: state.cytoscape.edges,
      layout: state.cytoscape.layout
    }
  },
  function (dispatch) {
    return {
      addNode: (id) => dispatch(addNode(id)),
      addEdge: (source, target) => dispatch(addEdge(source, target)),
      addCluster: () => dispatch(addCluster())
    }
  }
)(Home)
