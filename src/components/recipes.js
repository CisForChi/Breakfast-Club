import React from 'react';


export default class Recipes extends React.Component {
	// secondsToTime(time) {
	// 	let mins = Math.floor(totalSeconds / 60);
	// 	let secs = totalSeconds % 60
		
		

	// }

	render () {
			return (
		<div> {this.props.recipes.map((recipe,i) => {
			return (
			<div key={`recipe-${i}`} >
				<img src={recipe.imageUrlsBySize[90]} />
			<button>save</button>
				<p>{recipe.recipeName}</p>
				
			<div>
				<p className="recipe-ingredients">{recipe.ingredients}</p>
			
				</div>
			</div>
			)
		})}
		</div>
		)
	}	
}

