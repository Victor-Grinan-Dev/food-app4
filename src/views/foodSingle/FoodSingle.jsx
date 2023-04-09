import React from 'react';
import { useLocation } from 'react-router-dom';
import css from './foodSingle.module.css'

const FoodSingle = () => {
  const location = useLocation();
  const recipe = location.state.data;
  const country = location.state.country;

  //const capitalStart = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <div className={css.singleFood}>
      <div className={css.imageContainer}>
        <img id={recipe.name} src={recipe.image} alt={recipe.name} className={css.image} />
      </div>
      
      <div className={css.dataContainer}>
        <div className={css.dataHeader}>
          <h2 className={css.foodName}>"{recipe.name}"</h2>
          <img id={recipe.name} src={country?.flag} alt={country?.name}  className={css.flag} />
        </div>
        <div>
        <h3>Description:  </h3>
          {recipe.description}
        </div>
        
        <h3>Ingredients:</h3>
        <ul>
        { 
          recipe.ingredients.map((item,i) => (
            <li key={i} id={item.id}>{item.ingredient} - {item.quantity} {item.unit} </li>
          ))
        }
        </ul>
        <br/>
        <p className={css.instructionText}>{recipe.instruction}</p>
      </div>
    </div>
  );
};

export default FoodSingle;