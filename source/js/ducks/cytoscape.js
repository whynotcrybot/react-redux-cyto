const ADD_CLUSTER = 'cyto/ADD_CLUSTER'
const ADD_NODE = 'cyto/ADD_NODE'
const ADD_EDGE = 'cyto/ADD_EDGE'

export function addCluster () {
  return {
    type: ADD_CLUSTER
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
    source: source,
    target: target
  }
}

const INITIAL_STATE = {
  cluster: {
    nodes: [
      { data: { id: 'a', foo: 3, bar: 5, baz: 7 } },
      { data: { id: 'b', foo: 7, bar: 1, baz: 3 } },
      { data: { id: 'c', foo: 2, bar: 7, baz: 6 } },
      { data: { id: 'd', foo: 9, bar: 5, baz: 2 } },
      { data: { id: 'e', foo: 2, bar: 4, baz: 5 } }
    ],

    edges: [
      { data: { id: 'ae', weight: 1, source: 'a', target: 'e' } },
      { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
      { data: { id: 'be', weight: 4, source: 'b', target: 'e' } },
      { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
      { data: { id: 'ce', weight: 6, source: 'c', target: 'e' } },
      { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
      { data: { id: 'de', weight: 7, source: 'd', target: 'e' } }
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
      return {...state, nodes: [...state.nodes, {data: {id: action.id}}]}
    case ADD_EDGE:
      return {...state, edges: state.edges.push({ data: { source: action.source, target: action.target } })}
    case ADD_CLUSTER:
      return {
        ...state,
        nodes: [...state.nodes, ...state.cluster.nodes],
        edges: [...state.edges, ...state.cluster.edges]
      }
    default:
      return state
  }
}
