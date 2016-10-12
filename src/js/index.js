import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory} from 'react-router';
import App from './App';
import Post from './components/Post';

render(
	<Router>
		<Route path="/" component={App}/>
		<Route path="/r/:sub/comments/:author/:title" component={Post} />
	</Router>, 
	document.querySelector('.outlet'));
