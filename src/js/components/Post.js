import React, { Component } from 'react';
import $ from 'jquery';
import Nav from './Nav';
import showdown from 'showdown';

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: {},
      comments: []
    }
  }

  componentWillMount() {
    var {params} = this.props;
    $.ajax({
      dataType: "json",
      url: `https://www.reddit.com/r/${params.sub}/comments/${params.author}/${params.title}.json`,
      success: (res) => {
        this.setState({
          content: res[0].data.children[0].data,
          comments: res[1].data.children
        })
      }
    });
  }

  converter(string) {
    return new showdown.Converter().makeHtml(string)
  }

  getChildren(comment) {
    let {replies} = comment.data;
    if (typeof replies == 'object') {
      return replies.data.children.map((comment, i) => {
        return (
          <div className="comment" key={i}>
            <span className="comment-score">{comment.data.score}</span>
            <p dangerouslySetInnerHTML={{__html: this.converter(comment.data.body)}}></p>
            {this.getChildren(comment)}
          </div>
        )
      })
    }
  }

  render() {
    var {content} = this.state;
    var {comments} = this.state;
    return (
      <div>
        <Nav />
        <h1>{content.title}</h1>
        <div dangerouslySetInnerHTML={{__html: this.converter(content.selftext)}}></div>
        <h3>comments:</h3>
        {comments.map((comment, i)=> {
          return (
            <div className="comment" key={i}>
              <span className="comment-score">{comment.data.score}</span>
              <p dangerouslySetInnerHTML={{__html: this.converter(comment.data.body)}}></p>
              {this.getChildren(comment)}
            </div>
          )
        })}
      </div>
    );
  }
}

export default Post;


