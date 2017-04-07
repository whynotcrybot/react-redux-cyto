import React from 'react'
import cytoscape from 'cytoscape'

import * as styles from './styles.css'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.renderCytoscapeElement = this.renderCytoscapeElement.bind(this)
  }

  renderCytoscapeElement () {
    console.log('* Cytoscape.js is rendering the graph..')

    this.cy = cytoscape({
      container: document.getElementById('cy'),

      boxSelectionEnabled: false,
      autounselectify: true,

      style: cytoscape.stylesheet()
        .selector('node')
        .css({
          'height': 80,
          'width': 80,
          'background-fit': 'cover',
          'border-color': '#000',
          'border-width': 3,
          'border-opacity': 0.5,
          'content': 'data(name)',
          'text-valign': 'center'
        })
        .selector('edge')
        .css({
          'width': 6,
          'target-arrow-shape': 'triangle',
          'line-color': '#ffaaaa',
          'target-arrow-color': '#ffaaaa',
          'curve-style': 'bezier'
        }),
      elements: {
        nodes: [
          { data: { id: 'cat' } },
          { data: { id: 'bird' } },
          { data: { id: 'ladybug' } },
          { data: { id: 'aphid' } },
          { data: { id: 'rose' } },
          { data: { id: 'grasshopper' } },
          { data: { id: 'plant' } },
          { data: { id: 'wheat' } }
        ],
        edges: [
          { data: { source: 'cat', target: 'bird' } },
          { data: { source: 'bird', target: 'ladybug' } },
          { data: { source: 'bird', target: 'grasshopper' } },
          { data: { source: 'grasshopper', target: 'plant' } },
          { data: { source: 'grasshopper', target: 'wheat' } },
          { data: { source: 'ladybug', target: 'aphid' } },
          { data: { source: 'aphid', target: 'rose' } }
        ]
      },
      layout: {
        name: 'breadthfirst',
        directed: true,
        padding: 10
      }
    })
  }

  componentDidMount () {
    this.renderCytoscapeElement()
  }

  render () {
    return (
      <div>
        <div className={styles.cytoscapeWrapper} id='cy' />
      </div>
    )
  }
}

export default Home
