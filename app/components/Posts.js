import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

import moment from 'moment';
import axios from 'axios';

const user = '@mdangelo'

class Post extends Component {

  constructor(props) {
   super(props);
   this.state = {
     title: this.props.data.title || '',
     uniqueSlug: this.props.data.uniqueSlug || '',
     firstPublishedAt: this.props.data.firstPublishedAt || Date.now(),
   };
   try { // TODO Remove this.
     this.state.preview = this.props.data.previewContent.bodyModel.paragraphs[2].text || '';
   } catch(err) {
     this.state.preview = '';
   }
 }
  render() {
    return (
      <article className="post posts" id="posts">
        <header>
          <div className="title">
            <h3><a href={`https://medium.com/${user}/${this.state.uniqueSlug}`}>{this.state.title}</a></h3>
            <a href={`https://medium.com/${user}/${this.state.uniqueSlug}`}>
            <p>{this.state.preview}</p>
            <time className="published time" dateTime={moment(this.props.data.datetime).format()}><p className="no-margin">{moment(this.state.firstPublishedAt).format('MMMM Do YYYY')}</p></time>
            </a>
          </div>
        </header>
      </article>
    );
  }
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
};

class Posts extends Component {

  constructor(props) {
   super(props);
   this.state = {
     posts: []
   };
 }

  componentDidMount() {
   const source = '/api/posts';
   this.serverRequest = axios.get(source).then(function(result) {
     console.log();
     const posts = JSON.parse(result.data.substring(16)).payload.posts;
     // console.log(posts[0])
     this.setState({
       posts: posts,
     });
   }.bind(this));
  }

  getPosts() {
    return this.state.posts.map((post) => {
      return (
        <Post data={post}
          key={post.slug}
          />
      );
    });
  }

  render() {
    return (
      <div>
      <article className="post posts" id="posts">
        <header>
          <div className="title">
            <h2><Link to="/posts">Posts</Link></h2>
            <p>Under construction. All posts are from <a href={`https://medium.com/${user}`}>Meduim.com</a>.</p>
          </div>
        </header>
      </article>
      {this.getPosts()}
      </div>
    );
  }
}

export default Posts;
