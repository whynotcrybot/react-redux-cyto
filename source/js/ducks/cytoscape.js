const ADD_NODE = 'cyto/ADD_NODE'
const ADD_EDGE = 'cyto/ADD_EDGE'

export function addCluster () {
  return (dispatch, getState) => {
    const currentNodes = getState().cytoscape.nodes.length
    const cluster = {
      nodes: getState().cytoscape.cluster.nodes,
      edges: getState().cytoscape.cluster.edges
    }

    for (let i = currentNodes; i < currentNodes + cluster.nodes; i++) {
      dispatch(addNode(i + 1))
    }

    cluster.edges.forEach(edge => {
      dispatch(addEdge(currentNodes + edge.s, currentNodes + edge.t))
    })
  }
}

export function addNode (id) {
  return {
    type: ADD_NODE,
    id: id
  }
}

export function addEdge (source, target) {
  return {
    type: ADD_EDGE,
    source,
    target
  }
}

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
  nodes: [],
  edges: [],
  layout: {
    name: 'breadthfirst',
    directed: true,
    padding: 10
  }
}

export default function counterReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_NODE:
      return {...state, nodes: [...state.nodes, { data: { id: action.id } }]}
    case ADD_EDGE:
      return {
        ...state,
        edges: [
          ...state.edges,
          { data: {
            id: action.source + '-' + action.target,
            source: action.source,
            target: action.target
          } }
        ]
      }
    default:
      return state
  }
}
