import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Flex, Box } from 'reflexbox'

import Routes from './routes'

import '../../style/index.global.css'

const Root = (props) => {
  return (
    <Provider store={props.store}>
      <Router>
        <Flex wrap>
          <Box col={12}>
            <Routes />
          </Box>
        </Flex>
      </Router>
    </Provider>
  )
}

export default Root
