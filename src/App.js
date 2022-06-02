import React from 'react'
// import SwipeableTemporaryDrawer from './components/Header/Header'

import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './global';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        {/* <div className="App">
          <header className="App-header"/>
          <SwipeableTemporaryDrawer />
        </div> */}
        <div>
          <h1>Hello. This is burger menu tutorial</h1>
          <img src="https://image.flaticon.com/icons/svg/2016/2016012.svg" alt="burger icon" />
          <div>Icon made by Freepik from www.flaticon.com</div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
