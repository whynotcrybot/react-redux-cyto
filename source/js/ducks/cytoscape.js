const GRAPH_INIT = 'cyto/GRAPH_INIT'
const ADD_NODE = 'cyto/ADD_NODE'
const ADD_EDGE = 'cyto/ADD_EDGE'
const REMOVE_EDGE = 'cyto/REMOVE_EDGE'

const INITIAL_STATE = {
  clusters: {

    graph34: {
      nodes: 8,
      edges: [
        { s: 1, t: 2 },
        { s: 1, t: 4 },
        { s: 1, t: 7 },
        { s: 2, t: 3 },
        { s: 2, t: 6 },
        { s: 2, t: 8 },
        { s: 3, t: 5 },
        { s: 3, t: 7 },
        { s: 4, t: 5 },
        { s: 4, t: 6 },
        { s: 5, t: 8 },
        { s: 6, t: 7 },
        { s: 7, t: 8 }
      ]
    },

    graph25: {
      nodes: 7,
      edges: [
        { s: 1, t: 2 },
        { s: 1, t: 3 },
        { s: 1, t: 7 },
        { s: 2, t: 3 },
        { s: 2, t: 4 },
        { s: 2, t: 5 },
        { s: 3, t: 4 },
        { s: 3, t: 6 },
        { s: 4, t: 5 },
        { s: 4, t: 6 },
        { s: 5, t: 6 },
        { s: 5, t: 7 },
        { s: 6, t: 7 }
      ]
    },

    graph4: {
      nodes: 7,
      edges: [
        { s: 1, t: 2 },
        { s: 1, t: 3 },
        { s: 1, t: 5 },
        { s: 2, t: 3 },
        { s: 2, t: 4 },
        { s: 2, t: 5 },
        { s: 3, t: 5 },
        { s: 3, t: 6 },
        { s: 4, t: 5 },
        { s: 4, t: 7 },
        { s: 5, t: 6 },
        { s: 5, t: 7 },
        { s: 6, t: 7 }
      ]
    }
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
    const currentNodes = getState().cytoscape[graph].nodes.length
    const cluster = getState().cytoscape.clusters[graph]

    for (let i = currentNodes; i < currentNodes + cluster.nodes; i++) {
      dispatch(addNode_(graph, i + 1))
    }

    cluster.edges.forEach(edge => {
      dispatch(addEdge_(graph, currentNodes + edge.s, currentNodes + edge.t))
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
