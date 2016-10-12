import React, { Component } from 'react';

class Nav extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      defaultSubs: ['aww', 'funny', 'javascript'],
    };
  }
  
  render() {
    return (
      <div className="nav"> 
        {this.state.defaultSubs.map((link, i)=> {
          return <a key={i} href={`/r/${link}/`}>{link}</a>
        })}
      </div>
    );
  }
}

export default Nav;