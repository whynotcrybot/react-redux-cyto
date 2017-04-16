const GRAPH_INIT = 'cyto/GRAPH_INIT'
const ADD_CLUSTER = 'cyto/ADD_CLUSTER'
const ADD_NODE = 'cyto/ADD_NODE'
const ADD_EDGE = 'cyto/ADD_EDGE'
const REMOVE_EDGE = 'cyto/REMOVE_EDGE'

import clusters from '../../config/clusters'

const INITIAL_STATE = {
  clusters: clusters,
  layout: {
    name: 'circle',
    fit: false,
    animate: true,
    animationDuration: 320
  }
}

export default function cytoscapeReducer (state = INITIAL_STATE, action) {
  const graph = action.graph
  switch (action.type) {
    case GRAPH_INIT:
      return {
        ...state,
        [graph]: {
          addedClusters: 0,
          nodes: [],
          edges: []
        }
      }
    case ADD_CLUSTER:
      return {
        ...state,
        [graph]: {
          ...state[graph],
          addedClusters: state[graph].addedClusters + 1
        }
      }
    case ADD_NODE:
      const id = action.id
      return {
        ...state,
        [graph]: {
          ...state[graph],
          nodes: [
            ...state[graph].nodes,
            { id: id }
          ]
        }
      }
    case ADD_EDGE:
      const source = action.source
      const target = action.target
      return {
        ...state,
        [graph]: {
          ...state[graph],
          edges: [
            ...state[graph].edges,
            {
              id: source + '-' + target,
              source: source,
              target: target
            }
          ]
        }
      }
    case REMOVE_EDGE:
      return {
        ...state,
        [graph]: {
          ...state[graph],
          edges: action.edges
        }
      }
    default:
      return state
  }
}

export function initGraph (graph) {
  return initGraph_(graph)
}

export function addCluster (graph) {
  return (dispatch, getState) => {
    const currentClusters = getState().cytoscape[graph].addedClusters
    const cluster = getState().cytoscape.clusters[graph]

    dispatch(addCluster_(graph))

    for (let i = 0; i < cluster.nodes; i++) {
      dispatch(addNode_(graph, (currentClusters + 1) + '-' + (i + 1)))
    }

    cluster.edges.forEach(edge => {
      const source = (currentClusters + 1) + '-' + edge.s
      const target = (currentClusters + 1) + '-' + edge.t
      dispatch(addEdge_(graph, source, target))
    })
  }
}

export function addNode (graph) {
  return (dispatch, getState) => {
    const currentNodes = getState().cytoscape[graph].nodes.length
    dispatch(addNode_(graph, currentNodes + 1))
  }
}

export function addEdge (graph, source, target) {
  return addEdge_(graph, source, target)
}

export function removeEdge (graph, source, target) {
  return (dispatch, getState) => {
    const edges = getState().cytoscape[graph].edges.filter(edge => {
      return !(edge.source === source && edge.target === target ||
               edge.target === source && edge.source === target)
    })
    dispatch(removeEdge_(graph, edges))
  }
}

function initGraph_ (graph) {
  return {
    type: GRAPH_INIT,
    graph
  }
}

function addCluster_ (graph) {
  return {
    type: ADD_CLUSTER,
    graph
  }
}

function addNode_ (graph, id) {
  return {
    type: ADD_NODE,
    graph,
    id
  }
}

function addEdge_ (graph, source, target) {
  return {
    type: ADD_EDGE,
    graph,
    source,
    target
  }
}

function removeEdge_ (graph, edges) {
  return {
    type: REMOVE_EDGE,
    graph,
    edges
  }
}
