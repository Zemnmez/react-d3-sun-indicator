# react-d3-sun-indicator

> a nice little daylight indicator built with react and d3

[![NPM](https://img.shields.io/npm/v/react-d3-sun-indicator.svg)](https://www.npmjs.com/package/react-d3-sun-indicator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This cute indicator demonstrates some techniques with React and d3. It automatically sizes to its container so it can be rendered and re-used anywhere.

Take a look [here](https://zemnmez.github.io/react-d3-sun-indicator).

## Install

```bash
yarn add react-d3-sun-indicator
```

## Usage

```jsx
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
```

## License

MIT © [zemnmez](https://github.com/zemnmez)
