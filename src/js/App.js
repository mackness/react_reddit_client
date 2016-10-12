import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './components/Nav';
import $ from 'jquery';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subs: [],
    };
    this.sort = this.sort.bind(this)
  }

  sort(event) {
    let prop = event.target.getAttribute("data-sort-by");
    let {subs} = this.state;
    let first = subs[0]
    subs.sort(function(a, b) {
        return a.data[prop] > b.data[prop] ? 1 : a.data[prop] < b.data[prop] ? -1 : 0
    })
    if (first === subs[0]) {
      this.setState({subs: subs.reverse()})
    } else {
      this.setState({subs: subs})
    }
  }

  componentWillMount() {
    $.ajax({
      dataType: "json",
      url: 'https://www.reddit.com/r/javascript.json',
      success: (res) => {
        this.setState({
          subs: res.data.children
        })
      }
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <button data-sort-by="created" onClick={this.sort}>sort by recency</button>
        <button data-sort-by="score" onClick={this.sort}>sort by score</button>
        {this.state.subs.map((link, i)=> {
          if (link.data.is_self) {
            var postlink = <Link to={link.data.permalink}>{link.data.title}</Link>
          } else {
            var postlink = <a href={link.data.url}>{link.data.title}</a>
          }
          return (
            <div className="link" key={i}>
              <span className="score">{link.data.score}</span>
              {postlink}
              <Link to={link.data.permalink}>comments</Link>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;


