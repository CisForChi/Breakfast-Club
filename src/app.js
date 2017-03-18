import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';


import Header from './components/Header';
import Recipes from './components/Recipes';
import Mood from './components/Moods';
import Footer from './components/Footer';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			recipe:[]


		};


	

	}

	render() {
	return(
		<div>

		<Header tagline="Breakfast 🍽 Club" />

		<Mood />
		<Recipes  recipes={this.state.recipe}/>

		<Footer />

		</div>
		)
	
		}
}

ReactDOM.render(<App />, document.getElementById('app'));