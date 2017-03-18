import React from 'react';
import { ajax } from 'jquery';


export default class Header extends React.Component {
	constructor(){
		super();
		this.state = {
			mood: ["energy", "cleanse", "wildCard", "starving"],
			user: [],
		
			
		}
	

	}
	getRecipes(mood){
		const moodToIngredients = {	
			energy: "oatmeal+chia+banana+hemp+peanutbutter",
			cleanse: "oatmeal+coconut+chia+detox+avocado+spirulina+ginger+raw+maca",
			wildCard: "chia+buckwheat+pancakes+breakfast%bowl+breakfast",
			starving: "buckwheat+oatmeal+grains"


		}
		const userChoice = moodToIngredients[mood]
		console.log(userChoice);
		ajax({
			url: 'http://api.yummly.com/v1/api/recipes',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				_app_id: 'f4d2ebd2', 
				_app_key: 'e61d860e9e43d60dbc496c726945c64b',
				q: userChoice,
				requirePictures: true,
				maxResult:20,
				allowedDiet: ['386^Vegan'],
			}

		})
		.then((data) => {
			
			console.log(data);

		});


	}
	render () {
		return (
			<div>
				<header>
					<h1>{this.props.tagline}</h1>
					
					<nav>
					<input type="Search" required placeholder="Search Ingredient" />

					<search type="submit">Search</search>
						<a href="#">Menu</a>
						<a href="#">Submit a Recipe</a>
						<a href="#">Login</a>
						<a href="#">Recipes></a>
					
					</nav>

					<h2>I woke up like..</h2>
					<p>I want inspiration</p>
					<button onClick={() => this.getRecipes("energy")}>{this.state.mood[0]}</button>
					<button onClick={() => this.getRecipes("cleanse")}>{this.state.mood[1]}</button>
					
					<button onClick={() => this.getRecipes("wildCard")}>{this.state.mood[2]}</button>
					<button onClick={() => this.getRecipes("starving")}>{this.state.mood[3]}</button>

					<p>I want to submit</p>
					<button>submit a recipe</button>

				</header>
					<div>

				
					</div>
					
			</div>
			)
		}
	}
	