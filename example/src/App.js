import React, { Component } from 'react'

import SunIndicator from 'react-d3-sun-indicator';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {time: new Date()}
  }

  componentDidMount() {
    this.timer = setInterval(() => this.setState({
      time: new Date()
    }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render () {
    return (
      <div>
        <SunIndicator
          time={this.state.time}
          style={{width: "50vw", height: "50vh"}} />
      </div>
    )
  }
}
