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
import UserProfile from './UserProfile';
import Story from './Story';
import StoryDetail from './StoryDetail';
import EditStory from './EditStory';
import Play from './Play';
import PlayStoryDetail from './PlayStoryDetail';
import UserHistory from './UserHistory';
import Writer from './Writer';

// stateless Component
const App = () => (
  <div>
    <Header />

    <main>
      <Route exact path='/' component={Home}/>
      <Route exact path='/story' component={Story}/>
      <Route exact path='/blog' component={Blog}/>
      <Route exact path='/blog/:blog_detail' component={BlogDetail}/>
      <Route exact path='/documentation' component={Documentation}/>
      <Route exact path='/writer' component={Writer}/>
      <Route exact path='/writer/create' component={Create}/>
      <Route exact path='/writer/story/edit/:story_id' component={EditStory}/>
      <Route exact path='/writer/story/:story_id' component={StoryDetail}/>
      <Route exact path='/play/:story_id' component={Play}/>
      <Route exact path='/about' component={About}/>
      <Route exact path='/account' component={Account}/>
      <Route exact path='/profile' component={UserProfile} />
      <Route exact path='/story/:story_id' component={PlayStoryDetail} />
      <Route exact path='/profile/history' component={UserHistory} />
    </main>

    <Footer />
  </div>
);

export default App;