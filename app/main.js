import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App';

import About from './components/About';
import Projects from './components/Projects';
import Posts from './components/Posts';
import Resume from './components/Resume';
import Stats from './components/Stats';
import Contact from './components/Contact';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-68649021-1');

const update = () => {
  window.scrollTo(0, 0);
  ReactGA.pageview(window.location.pathname);
};

// All of our CSS
require('!style!css!sass!../public/css/main.scss');

ReactDOM.render(
  <Router onUpdate={update} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={About}/>
      <Route path="/resume" component={Resume}/>
      <Route path="/projects" component={Projects}/>
      <Route path="/posts" component={Posts}/>
      <Route path="/stats" component={Stats}/>
      <Route path="/contact" component={Contact}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
