

///stuff I eventually need

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			recipe: []
			
		}
		}
	
	componentDidMount() {
		ajax({
			url: 'http://api.yummly.com/v1/api/recipes',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				_app_id: 'f4d2ebd2', 
				_app_key: 'e61d860e9e43d60dbc496c726945c64b',
				q: 'chia',
				requirePictures: true,
				maxResult:12,
				allowedDiet: ['386^Vegan'],
			}
		})
		.then((data) => {
			this.setState({
		 		recipe:data.matches
		 	});
		 	});	
	}
	render() {
		return(
			<div>
				{this.state.recipe.map((recipe,i) => {
					
					return (
						<div key={`recipe-${i}` }> 
							<p>{recipe.recipeName}</p>
							<img src={recipe.imageUrlsBySize[90]} />
						  	<p> {recipe.totalTimeInSeconds}</p>
						</div>
							)
					})}
				)}
				</div>
			return (
					
					<Header />
					)}
	}

///
///header
///import React from 'react';

export default class Header extends React.Component {
	render () {
		return (
			<header className="main-header">
			<nav>
				<a href="#">Menu</a>
				<a href="#">Submit a Recipe</a>
				<a href="#">Login</a>
				<a href="#">Recipe</a>
				<input type="search"></input><button>search</button>

				</nav>
			 	<h1>Breakfast 🍽🍍🍌🍩 club </h1> 
				<h2> Feeling Inspired? </h2>
				<h3> Want Inspiration?</h3>
						<h3>I feel like eating...</h3>
			<input></input>
			<button>suprise</button>
			<button>healthy</button>
			<button>greasy</button>
			<div>
			

				
	
	

			)

			}
		}

import React from 'react';


// export default Recipes extends React.Component{
// 	return(
// 	{this.state.recipe.map((recipe,i) => {
					
// 					return (
// 						<div key={`recipe-${i}` }> 
// 							<p>{recipe.recipeName}</p>
// 							<img src={recipe.imageUrlsBySize[90]} />
// 						  	<p> {recipe.totalTimeInSeconds}</p>
// 						</div>
// 						)
// 				})}
// 		 	})}
	
// 	end


///copy this 5:25 pm
///
///<div>
		<content>
		<p>------recipe card starts here</p>
			<h2> Based on what you chose, try:</h2>
			<ul>
				<li>recipe display</li>
			</ul>
				<p> All You Will Need Is..</p>
			<ul>
				<li>ingredients display</li>
			</ul>
				<p> Allot (*time here*) out of your morning</p>
				<p> Other options:</p>
			<ul>
				<li> recco's </li>
			</ul>
			</content>
			</div>
