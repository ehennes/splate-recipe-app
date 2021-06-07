import React, {Component} from 'react';
import {
  Link
} from 'react-router-dom';
import '../styles.css';

class RecipeInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeDetails: '',
      ingredients: [],
      savedRecipes: []
    }
  }


    // getRecipeData() handles fetch api call to Spoonacular - Recipe Information endpoint, and saves data into state

    getRecipeData = () => {
      fetch(`https://api.spoonacular.com/recipes/${this.props.match.params.recipeId}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          recipeDetails: data,
          ingredients: data.extendedIngredients.map(ingredient =>
            ingredient.original)
        })
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    componentDidMount() {
      this.getRecipeData();
    }


  // ingredientsChecked() checks if user selects ingredient and removes it from their grocery list

  ingredientsChecked = (e) => {
    const currentIngredient = e.target;
    console.log('current target: ', currentIngredient.name)
    this.setState({
      ingredients: currentIngredient.checked ?
        this.state.ingredients.filter(ingredient => (
          ingredient !== currentIngredient.name)) :
        this.state.ingredients.concat(currentIngredient.name)
  })
}

// bookmark() is called when user clicks Bookmark button and it saves the unchecked ingredients to user's localStorage

bookmark = () => {
  const savedRecipes = this.state.savedRecipes.concat({
    source: this.state.recipeDetails.sourceUrl,
    image: this.state.recipeDetails.image,
    title: this.state.recipeDetails.title,
    recipeIngredients: this.state.ingredients,
    id: this.props.match.params.recipeId
  })
  let saved = localStorage.getItem('savedItems');
  saved = saved ? JSON.parse(saved) : [];
  saved = saved.concat(savedRecipes);
  console.log(JSON.stringify(saved));
  localStorage.setItem('savedItems', JSON.stringify(saved));
  this.setState({
    savedRecipes
  })

}

  // renders specific recipe information after user has clicked on it

  render() {
    return (
      <>
        <div className="recipe-container">
          <div className="recipe-title-info">
            <h2 className="head-recipe-title">{this.state.recipeDetails.title}
              <button className="top-save-button save-recipe-button" onClick={this.bookmark}
              >BOOKMARK</button>
            </h2>
            <img src={this.state.recipeDetails.image} alt={this.state.recipeDetails.title} className="recipe-main-image" />
            <p>Cook Time &mdash; {this.state.recipeDetails.readyInMinutes} minutes</p>
            <p>Yield &mdash; {this.state.recipeDetails.servings} servings</p>
            <p className="website-url">Website &mdash; <a href={this.state.recipeDetails.sourceUrl || 'Not Available'} rel="noopener noreferrer" target="_blank">{this.state.recipeDetails.sourceName}</a></p>
          </div>
          <hr />
          <div className="ingredient-list">
            <h3>Ingredients</h3>
            <ul className="container">
              {this.state.recipeDetails.extendedIngredients &&
                this.state.recipeDetails.extendedIngredients.map(ingredient =>
                  <li className="ingredient-list-item">
                  <img className="ingredient-image" src= {`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} title={ingredient.name} alt={ingredient.name} />
                  <br />
                  {ingredient.original}
                  <br />
                  <input type="checkbox" name={ingredient.original} onClick={this.ingredientsChecked} />
                  <label htmlFor={ingredient.name}>I have this</label></li>
                )
              }
            </ul>
          </div>
          <hr />
          <h3 className="website-url">
            Go to <a href={this.state.recipeDetails.sourceUrl || 'Not Available'} rel="noopener noreferrer" target="_blank">{this.state.recipeDetails.sourceName}</a> for detailed recipe instructions. Enjoy!
          </h3>
          <div className="bottom-save-button">
            <button className="save-recipe-button" onClick={this.bookmark}
            >BOOKMARK</button>
          </div>
          <div className="bottom-buttons">
            <Link to='/recipes'><button className="back-button">BACK TO RECIPES</button></Link>
            <Link to={{
              pathname: '/lists/grocery-list',
              state: {
                savedIngredients: this.state.savedIngredients
              }
            }}>
              <button className="see-grocery-list-button">VIEW GROCERY LIST</button>
            </Link>
          </div>
        </div>
      </>
    )
  }

}

export default RecipeInformation;
