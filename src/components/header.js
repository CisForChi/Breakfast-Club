import React from 'react';
import { ajax } from 'jquery';
import RecipeCard from './recipeCard'


export default class Header extends React.Component {

	render () {
		return (
			<div>
				<header>

				<div>
					<input type="Search" required placeholder="Search Ingredient" />

					<button onSubmit= {()=> this.getRecipes } type="submit" name="search">Search</button>
					
					<h1>{this.props.tagline}</h1>
					
			

					
					</div>
					
						</header>
						
				
					
			</div>
			)
		}
	}


