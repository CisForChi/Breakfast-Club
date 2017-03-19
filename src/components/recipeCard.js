import React from 'react';


export default class RecipeCard extends React.Component  {
constructor() {
	super();
	this.state = {
		editing:false,
		recipe: {}
	};
	this.save = this.save.bind(this);
}

save(e) {
e.preventDefault();
const dbRef = firebase.database().ref(this.props.recipe.key);
dbRef.update({
	title:this.recipeTitle.value,
	text: this.recipeText.value
});
this.setState({
editing: false

});


}
render() {
	let editingTemp = (
		<span>
			<h4>{this.props.recipe.title}</h4>
			<p>{this.props.recipe.text}</p>
		</span>
)
	if(this.state.editing) {
		editingTemp = (
			<form onSubmit={this.save}>
				<div>
				<input type="text" defaultValue={this.props.recipe.title} name="title" ref={ref => this.recipeTitle = ref }/>
				</div>
				<div>
				<input type="text" defaultValue={this.props.recipe.text} name="text" ref={ref => this.recipeText = ref }/>
				</div>
				<input type="submit" value="Done editing"/>
			</form>

			)

	}
return (
<div className="recipeCard">
			   <i className="fa fa-edit" onClick={() => this.setState({editing:true})}></i>
			   <i className="fa fa-times" onClick={() => this.props.removeRecipe(this.state.recipe.key)}></i>
			   {editingTemp}
			  
			</div>

	)

}
}