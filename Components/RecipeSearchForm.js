import React, {Component} from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import RecipeInformation from './RecipeInformation';
import '../styles.css';


class RecipeSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      cuisine: 'Cuisine',
      diet: 'Diet',
      type: 'Meal Type',
      recipes: [],
      ids: '',
      redirect: false
    };
  }

  // handleChange() called when user makes changes to text and select inputs

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  // handleSubmit() called when user submits form via "Find Recipes" button and loads recipes

  handleSubmit = (e) => {
    e.preventDefault();
    this.getSearchData();
    this.input.focus();
    this.setState({redirect: true})
    // programmatically redirect to '/recipes'
  }


  // getSearchData() handles fetch api call to Spoonacular - Complex Search endpoint, sets form back to default, and saves data into state

  getSearchData = () => {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${this.state.query}&cuisine=${this.state.cuisine}&diet=${this.state.diet}&type=${this.state.type}fillIngredients=true&addRecipeInformation=true&instructionsRequired=true&number=12`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        query: '',
        cuisine: 'Cuisine',
        diet: 'Diet',
        type: 'Meal Type',
        recipes: data.results
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  // renders search form
  // renders child component <RecipeInformation /> if user clicks on a recipe

  render() {
    return (
    <>
      <form className="form" action="#" method="get" onSubmit={this.handleSubmit}>
        <label>
          <h1>What Would You Like to Eat?</h1>
        </label>
        <input className="food-search-bar" type="text" onChange={this.handleChange} autoFocus ref={input => this.input = input} className="food-search-bar" placeholder="search for recipes..." name="query" value={this.state.query} />
        <br/>
        <select className="filter-search select-cuisine" type="select" onChange={this.handleChange} name="cuisine" value={this.state.cuisine}>
          <option value="cuisine">Cuisine</option>
          <option value="american">American</option>
          <option value="british">British</option>
          <option value="cajun">Cajun</option>
          <option value="caribbean">Caribbean</option>
          <option value="chinese">Chinese</option>
          <option value="eastern European">Eastern European</option>
          <option value="european">European</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="greek">Greek</option>
          <option value="indian">Indian</option>
          <option value="irish">Irish</option>
          <option value="italian">Italian</option>
          <option value="japanese">Japanese</option>
          <option value="jewish">Jewish</option>
          <option value="korean">Korean</option>
          <option value="latin American">Latin American</option>
          <option value="mediterranean">Mediterranean</option>
          <option value="mexican">Mexican</option>
          <option value="middle Eastern">Middle Eastern</option>
          <option value="nordic">Nordic</option>
          <option value="southern">Southern</option>
          <option value="spanish">Spanish</option>
          <option value="thai">Thai</option>
          <option value="vietnamese">Vietnamese</option>
        </select>
        <select className="filter-search select-diet" type="select" onChange={this.handleChange} name="diet" value={this.state.diet}>
          <option value="diet">Diet</option>
          <option value="gluten-free">Gluten Free</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="lacto-vegetarian">Lacto-Vegetarian</option>
          <option value="ovo-vegetarian">Ovo-Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescetarian">Pescetarian</option>
          <option value="paleo">Paleo</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="primal">Primal</option>
          <option value="whole30">Whole30</option>
        </select>
        <select className="filter-search select-type" type="select" onChange={this.handleChange} name="type" value={this.state.type}>
          <option value="meal-type">Meal Type</option>
          <option value="main">Main Course</option>
          <option value="breakfast">Breakfast</option>
          <option value="side">Side Dish</option>
          <option value="appetizer">Appetizer</option>
          <option value="fingerfood">Fingerfood</option>
          <option value="snack">Snack</option>
          <option value="soup">Soup</option>
          <option value="salad">Salad</option>
          <option value="bread">Bread</option>
          <option value="beverage">Beverage</option>
          <option value="drink">Drink</option>
          <option value="dessert">Dessert</option>
          <option value="sauce">Sauce</option>
          <option value="marinade">Marinade</option>
        </select>
        <button type="submit" className="food-search-button" name="search-button">Find Recipes</button>
      </form>
      {this.state.redirect && <Redirect exact to='/recipes' />}
      <div className="container">
        <Switch>
          <Route exact path='/recipes'>
            {this.state.recipes.map(recipe => (
              <div className="item">
                <Link to={`/recipes/${recipe.id}`}>
                  <>
                    <img src={recipe.image} alt="recipe" className="recipe-image" />
                    <h3>{recipe.title}</h3>
                    <p>{recipe.sourceName}</p>
                  </>
                </Link>
              </div>
            ))}
          </Route>
          <Route path='/recipes/:recipeId' component={RecipeInformation} />
        </Switch>
      </div>
    </>
    )
  }
}

export default RecipeSearchForm;
