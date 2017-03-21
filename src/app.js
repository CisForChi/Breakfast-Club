import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import Header from './components/Header';
import RecipeCard from './components/recipeCard.js';

const config = {
    apiKey: "AIzaSyBfjT7C3FsJraXTdt0OuhL3dVZJIgPq-UA",
    authDomain: "breakfastclub-d1c63.firebaseapp.com",
    databaseURL: "https://breakfastclub-d1c63.firebaseio.com",
    storageBucket: "breakfastclub-d1c63.appspot.com",
    messagingSenderId: "736393212744"
  };

  firebase.initializeApp(config)

  

class App extends React.Component {
		constructor(){
		super();
		this.state = {
			mood: ["Give Me Energy", "My Body Is (Probably) Mad At Me", "WildCard", "SweetTooth"],
			userChoice: [],
			recipes:[],
			loggedin: false
			
		};
		//binding elements
		this.showSidebar= this.showSidebar.bind(this);
		this.addRecipe = this.addRecipe.bind(this);
		this.getRecipes = this.getRecipes.bind(this);
		this.showCreate = this.showCreate.bind(this);
		this.createUser = this.createUser.bind(this);
		this.showLogin = this.showLogin.bind(this);
		this.loginUser = this.loginUser.bind(this);
		this.logOut = this.logOut.bind(this);
		


		}
	//recipe submission 
	//
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if(user){
				console.log(user);
				firebase.database().ref(`users/${user.uid}/recipes`).on('value', (res) => {
				let userData = res.val();
				const dataArray = [];
				for(let objKey in userData) {

					userData[objKey].key = objKey;
					dataArray.push(userData[objKey])
			 }
			 console.log(dataArray);
			 this.setState({
			 	recipes: dataArray,
			 	loggedin: true
			 	})
			});
		}
		else {
			this.setState({
				loggedin: false

			});

		}
	})	
}
	showSidebar(e){
		e.preventDefault();
		console.log("hey");
		this.sidebar.classList.toggle("show");
		}
	addRecipe(e) {
		e.preventDefault();
		const recipe = {
			title: this.recipeTitle.value,
			text: this.recipeText.value,
			ingredients:this.recipeIngredients.value
		};
	const userId= firebase.auth().currentUser.uid
	const dbRef = firebase.database().ref(`users/${userId}/recipes/${recipeId}`);

	dbRef.push(recipe);	
	
		
		this.recipeTitle.value = "";
		this.recipeText.value = "";
		this.recipeIngredients.value="";
		this.showSidebar(e);
	}

	removeRecipe(recipeId){
		const userId = firebase.auth().currentUser.uid;
		const dbRef= firebase.database().ref(`users/${userId}/recipes/${recipeId}`);
		dbRef.remove();

	}
	showCreate(e){
		e.preventDefault();
		this.overlay.classList.toggle('show');
		this.createUserModal.classList.toggle('show');

	}
	createUser(e){
		e.preventDefault();
		//check if passwords match
		//then create user
		//
		const email = this.createEmail.value;
		const password = this.createPassword.value;
		const confirm = this.confirmPassword.value;
		if (password === confirm){
			firebase.auth()
			.createUserWithEmailAndPassword(email,password)
			.then((res) =>{
				this.showCreate(e);
			})
			.catch((err) => {
alert('oops! this e-mail is already in use! 💩')

			})

		}
		else {
			alert({
  title: "Sweet!",
  text: "Here's a custom image.",
  imageUrl: "images/thumbs-up.jpg"
});
		}
	} 
	 showLogin(e){
	 	e.preventDefault();
	 	this.overlay.classList.toggle('show');
	 	this.loginModal.classList.toggle('show');
	 }
	 loginUser(e){
	 	e.preventDefault();
	 	const email = this.userEmail.value;
	 	const password = this.userPassword.value;

	 	firebase.auth()
	 	.signInWithEmailAndPassword(email,password)
	 	.then((res) => {
	 		this.showLogin(e);
	 	})
	 	.catch((err) => {
	 		alert("oh no! wrong password 🤔")
	 });
 }
 logOut(){
 	firebase.auth().signOut();
 }
 renderRecipes() {
 	return this.state.recipes.map((recipe, i) => {
		return (
			<RecipeCard recipe={recipe} key={`recipe-${i}`} removeRecipe={this.removeRecipe} />
		)
	}).reverse()


 }
 uploadPhoto(e) {
        console.log('upload photo');
        let file = e.target.files[0];
        const storageRef = firebase.storage().ref('photos/' + file.name);
        const task = storageRef.put(file).then(() => {
            const urlObject = storageRef.getDownloadURL().then((data) => {
                console.log(data);
                this.setState ({
                    photo: data
                })
            })
        });

    }

    showRecipeCard() {
    	console.log("show card");
    }

//part of ajax call, assigning objects
	getRecipes(mood){
		const moodToIngredients = {	

			energy: "chia+superfood+oatmeal",
			cleanse: "detox+breakfast%bowl",
			wildCard: "chia+buckwheat+pancakes+breakfast%bowl+breakfast",
			starving: "buckwheat+oatmeal+grains"
		}
		const userChoice = moodToIngredients[mood]
		ajax({
			url: 'http://api.yummly.com/v1/api/recipes',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				_app_id: 'f4d2ebd2', 
				_app_key: 'e61d860e9e43d60dbc496c726945c64b',
				q: userChoice,
				requirePictures: true,
				maxResult:27,
				allowedDiet: ['386^Vegan'],
			}
		})

		.then((data) => {
			data.matches.map((match) => {
				ajax({
					url: `http://api.yummly.com/v1/api/recipe/${match.id}`,
					type: 'GET',
					dataType: 'jsonp',
					data: {
						_app_id: 'f4d2ebd2', 
						_app_key: 'e61d860e9e43d60dbc496c726945c64b',
					}
				}).then((recipe) => {
					match.recipe = recipe;
					return match; 
				}).then(() => {
					this.setState({
						userChoice: data.matches

					});
					console.log(data);

				});
			});
		});
		}

	render() {
	return(
		<div className="wrapper__head">
		<nav className="head-nav">
		{
			(() => {
				if(this.state.loggedin){
					return(
						<span>
					<a href="#" onClick={this.showSidebar}>Submit a Recipe</a>
					<a href="#" onClick={this.logOut}>Logout</a>
					</span>
					)
				}
				else{
					return(
						<span>
						<a href="" onClick={this.showCreate}>Create Account</a>
						<a href="#" onClick={this.showLogin}>Login</a>
						</span>
					)
				}
			})()
		}
						
		</nav>
		

		<div className="form-start">
		
		
		<div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
			<div className="close">
				<i className="fa fa-times"></i>
			</div>
		<form action="" onSubmit={this.createUser}>
			<div>
				<label htmlFor="createEmail">Email:</label>
				<input type="text" name="createEmail" ref={ref => this.createEmail = ref}/>
			</div>
			<div>
				<label htmlFor="createPassword">Password:</label>
				<input type="password" name="createPassword" ref={ref => this.createPassword =ref}/>
			</div>
			<div> 
				<label htmlFor="confirmPassword">Confirm Password:</label>
				<input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref}/>
				</div>
				<div>
						<input type="submit" value="Register"/>
					</div>
				</form>
				</div>

</div>
					
					
						
		<div className="overlay" ref={ref => this.overlay = ref}></div>
		<section className="recipes">
			{this.renderRecipes()}
		</section>
		<div>



		<aside className="sidebar" ref={ref => this.sidebar = ref}>
			<form onSubmit={this.addRecipe}>
			<h3>Add New Recipe</h3>
			<div className="close-btn" onClick={this.showSidebar}>
			<a href="" onClick= {this.showSidebar}>Add New Recipe</a>
				<i className="fa fa-times"></i>
			}
			</div>
			<label htmlFor="recipe-title">Name It:</label>
			<input type="text" name="recipe-title" ref={ref => this.recipeTitle = ref}/>
			<label htmlFor="recipe-text">What's in it?:</label>
			<textarea name="recipe-text" ref={ref => this.recipeText = ref}></textarea>
			
			<label htmlFor="recipe-ingredients">Upload a photo</label>
		
			<input type="file" accept="image/*" onChange={this.uploadPhoto}/>
			</form>
		</aside>

		<div className="loginModal modal" ref={ref => this.loginModal = ref}>
			<div className="close" onClick={this.showLogin}>
				<i className="fa fa-times"></i>
			</div>
			<form action="" onSubmit={this.loginUser}>
					<div>
						<label htmlFor="email">Email:</label>
						<input type="text" name="email" ref={ref =>this.userEmail = ref}/>
					</div>
					<div>
						<label htmlFor="password">Password:</label>
						<input type="password" name="password" ref={ref => this.userPassword = ref}/>
					</div>
					<div>
						<input type="submit" value="Login"/>
					</div>
				</form>
			</div>

		</div>
	
    		<div className="wrapper">

		<Header tagline="Breakfast Club" loadRecipes={this.loadRecipes} />
		<div className="box-1">


		 <p>Be Inspired</p>
		// </div>
		// <div className="box-2">
		 <p>Inspire others</p>
		</div>
			
			<div className="recipes-buttons">
					<button onClick={() => this.getRecipes("energy")}>{this.state.mood[0]} </button>
					<button onClick={() => this.getRecipes("cleanse")}>{this.state.mood[1]}</button>
					<button onClick={() => this.getRecipes("wildCard")}>{this.state.mood[2]}</button>
					<button onClick={() => this.getRecipes("starving")}>{this.state.mood[3]}</button>
			</div>
	
		<div className="recipe-results">
			<ul>
				{this.state.userChoice.map((recipe) => {
					return (
					<div className="recipe-container">
					<div className="recipe-title-pic">
							<span>
							<figure className="earlybird"><img className="recipe-pic-two" src={recipe.recipe.images[0].hostedLargeUrl} /></figure>
							<li className="recipe-name">{recipe.recipeName}</li>
							<li className="recipe-links"><a href="#">ingredients</a></li>
							<li className="recipe-links"><a href="#">how-to-make</a></li>
							
							</span>
					</div>
		</div>

		)
					// img src this. state. photo
	}
)}
			</ul>
	</div>
</div>
</div>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('app'));
	// <div className="recipe-information">
						// 	<li>{recipe.totalTimeInSeconds / 60}</li> 
						// 	<li>{recipe.recipe.cookTime}</li>
						// 	<li>
						// 	<span>{recipe.ingredients}</span>
						// 	</li> 
						// 	<span>
						// 	<li className="ingredient-lines">{recipe.recipe.ingredientLines}</li>
						// 	</span>
						//  </div>
			
					

						// <a href="#"> 🌸💕 </a>
						// <i className="fa fa-times"></i>
