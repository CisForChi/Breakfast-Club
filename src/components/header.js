import React from 'react';
import { ajax } from 'jquery';
import RecipeCard from './recipeCard'
import Search from 'react-search'

export default class Header extends React.Component {

	render () {
		return (
			<div>
				<header>

				<div>
					
					<h1>{this.props.tagline}</h1>
					<h2>healthy is not always tasteless</h2>
					
			

					
					</div>
					
					</header>
						
				
					
			</div>
			)
		}
	}


