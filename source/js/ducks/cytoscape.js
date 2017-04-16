const GRAPH_INIT = 'cyto/GRAPH_INIT'
const ADD_NODE = 'cyto/ADD_NODE'
const ADD_EDGE = 'cyto/ADD_EDGE'
const REMOVE_EDGE = 'cyto/REMOVE_EDGE'

const INITIAL_STATE = {
  cluster: {
    nodes: 5,

    edges: [
      { s: 1, t: 5 },
      { s: 1, t: 2 },
      { s: 2, t: 5 },
      { s: 2, t: 3 },
      { s: 3, t: 5 },
      { s: 3, t: 4 },
      { s: 4, t: 5 }
    ]
  },
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
          nodes: [],
          edges: []
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
        edges: action.edges
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
    const currentNodes = getState().cytoscape[graph].nodes.length
    const cluster = {
      nodes: getState().cytoscape.cluster.nodes,
      edges: getState().cytoscape.cluster.edges
    }

    for (let i = currentNodes; i < currentNodes + cluster.nodes; i++) {
      dispatch(addNode_(graph, i + 1))
    }

    cluster.edges.forEach(edge => {
      dispatch(addEdge_(graph, currentNodes + edge.s, currentNodes + edge.t))
    })
  }
}

export function addNode () {
  return (dispatch, getState) => {
    const currentNodes = getState().cytoscape.nodes.length
    dispatch(addNode_(currentNodes + 1))
  }
}

export function addEdge (source, target) {
  return addEdge_(source, target)
}

export function removeEdge (source, target) {
  return (dispatch, getState) => {
    const edges = getState().cytoscape.edges.filter(edge => {
      return !(edge.source === source && edge.target === target ||
               edge.target === source && edge.source === target)
    })
    dispatch(removeEdge_(edges))
  }
}

function initGraph_ (graph) {
  return {
    type: GRAPH_INIT,
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

function removeEdge_ (edges) {
  return {
    type: REMOVE_EDGE,
    edges
  }
}
