import React from 'react'

const Matrix = props => {
  const matrix = props.matrix
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
    <table>
      <tbody>
        <tr>
          <th />
          {tableHead}
        </tr>
        {tableBody}
      </tbody>
    </table>
  )
}

export default Matrix
