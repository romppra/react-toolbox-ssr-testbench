import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';

const AppBarTest = () => (
  <section>
    <h5>AppBar</h5>
    <br/>
    <AppBar title='Title' />
    <br/>
    <AppBar leftIcon='menu' title='Title' />
    <br/>
    <AppBar leftIcon='arrow_back' title='Title' rightIcon='close' />
    <br/>
    <AppBar>
      Custom content
    </AppBar>
  </section>
);

export default AppBarTest;
