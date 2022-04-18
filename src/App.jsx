import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Router from './Router';

class App extends Component {
  render() {
    return (
      <>
        <Router />
      </>
    )
  }
}

// 루트 컴포넌트에 핫 모듈 설정을 해주면, 각 모듈의 코드 변경시 state가 초기화 되지 않는다.
export default hot(module)(App);