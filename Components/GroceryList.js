import React, { Component } from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';

class GroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      source: [],
      newIngredient: [],
      extraIngredients: [],
      show: false
    }
  }

  // gets data from localStorage to display in user's grocery list

  componentDidMount() {
    let savedData = localStorage.getItem('savedItems');
    savedData = savedData ? JSON.parse(savedData) : [];
    const onlyIngredients = savedData.map(data => data.recipeIngredients);
    const recipeInfo = savedData.map(data => ({title: data.title, image: data.image, source: data.source, id: data.id}));

    if(localStorage.getItem('savedItems')) {
      this.setState({
        ingredients: onlyIngredients.flat(),
        info: recipeInfo
      })
    } else {
      this.setState({
        message: <h3>You currently have no items in your Grocery List.</h3>
      })
    }
  }

  // removeIngredient() allows user to remove any extra ingredient they have added to their grocery list

  removeIngredient = (e) => {
    const currentIngredient = e.target.name;
    console.log("this is your currentIngredient: ", currentIngredient)
    this.setState({
      extraIngredients: this.state.extraIngredients.filter(ingredient => ingredient !== currentIngredient)
    })
  }

  // inputIngredient() takes user input to add to grocery list

  inputIngredient = (e) => {
    this.setState({
      currentValue: e.target.value
    })
  }

  // addIngredient() allows the user to add an ingredient of their choice to their grocery list

  addIngredient = (e) => {
    this.setState({
      extraIngredients: this.state.extraIngredients.concat(this.state.newIngredient.concat(this.state.currentValue)),
      currentValue: ''
    })
  }

  // showBookmarked() sets show = true and shows the div with a list of user's saved recipes

  showBookmarked = () => {
    this.state.info && this.setState({show: true})
  }

  // removeItems() removes all items from localStorage and user's grocery list and bookmarked

  removeItems = () => {
    localStorage.removeItem('savedItems');
  }

  // renders user's grocery list and user's bookmarked items

  render() {
    return (
    <div className="container">
      <div className="grocery-container">
        <h2>Grocery List</h2>
        <ul className="grocery-list">
        {this.state.ingredients === [] ? this.state.message : this.state.ingredients.map(ingredient =>
          <>
            <li className="grocery-list-items">{ingredient}</li><br />
          </>
        )}
        </ul>
        <ul className="extra-grocery-list">
          {this.state.extraIngredients.map(ingredient => <li className="extra-grocery-items">{ingredient}<button name={ingredient} className="hide" onClick={this.removeIngredient}> X </button></li>)}
        </ul>
        <button className="add-ingredient-button" onClick={this.addIngredient}> + </button>
        <input type="text" className="add-ingredient-bar" placeholder="add ingredient" onChange={this.inputIngredient} value={this.state.currentValue} />
      </div>
      <div className="bookmarked-container">
        <div className="bookmarked">
          <h2>Bookmarked</h2>
          <button className="bookmarked-button" onClick={this.showBookmarked}>See Recipes</button>
          <ul className="source-names-container">
            {this.state.show ?
              this.state.info.map(info =>
              <>
                <li className="source-names">
                  <Link to={`/recipes/${info.id}`}>
                    <h4>{info.title}</h4>
                    <img className="saved-image" src={info.image} alt={info.title} />
                  </Link>
                  <a className="saved-source" href={info.source}>Recipe Instructions</a>
                </li>
              </>)
            : null
            }
          </ul>
          <Link to='/'><button className="remove-recipe-button" onClick={this.removeItems}>Remove All Bookmarks</button></Link>
        </div>
      </div>
    </div>
    );
  }
}


export default GroceryList;
