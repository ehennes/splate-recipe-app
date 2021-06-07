import React, { Component } from 'react';

const IngredientList = () => {
  fetch('/api/v1/lists')
  .then(response => {
    console.log(response.json());
  })
  .catch((error) => {
    console.error('Error:', error);
  })

  return (
      <>
        <h1></h1>
        <p></p>
      </>
  );
}


export default IngredientList;
