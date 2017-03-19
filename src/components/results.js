import React from 'react';

export default function userChoice (props) {
		console.log(props);

return (
	<div>{this.userChoice.map((userChoice,i) => {
 			
 		return(<div className='recipe-results'>
 			<div key={`userChoice-$(i)`} className='recipe-results__recipe'>
		<p>{userChoice.Name}</p>
							
						  </div>	
						</div>

	)
})}
 </div>

);
 }
 

	
 
 		
 	
