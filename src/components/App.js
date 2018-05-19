import React from 'react';
import { Route } from 'react-router-dom';

import '../scss/style.scss';
import '../css/simplex.min.css';
import '../css/animate.css';
import Header from './Header';
import Home from './Home';
import Blog from './Blog';
import BlogDetail from './BlogDetail';
import Documentation from './Documentation';
import Create from './Create';
import About from './About';
import Account from './Account';
import Footer from './Footer';


// stateless Component
const App = () => (
  <div>
    <Header />

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path='/blog/:blog_detail' component={BlogDetail}/>
      <Route exact path="/documentation" component={Documentation} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/account" component={Account} />
    </main>

    <Footer />
  </div>
);

export default App;