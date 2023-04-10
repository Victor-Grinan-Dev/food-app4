import React, { useState, useEffect } from 'react';
import axios from 'axios';
import css from './addFood.module.css';

//import {db} from './firebase';
//import {collection, addDoc, Timestamp} from 'firebase/firestore';
import { collection, addDoc, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useLocation } from 'react-router-dom';

function AddFood() {

  const COUNTRIES_API = 'https://restcountries.com/v2/all';
  //const RANDOM_IMG_API = 'https://source.unsplash.com/500x400/?'; //concat this to a name

  const location = useLocation();
  const locationData = location.state?.data || '';
  const locationCountry = location.state?.country || '';
  const recipeId = location.state?.data.id || '';

  const emptyState = {
    name: '',
    author: '',
    description: '',
    ingredients: [],
    instruction: '',
    image: '',
    country_code: '',
  };

  const [data, setData] = useState(locationData || emptyState);

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(COUNTRIES_API).then((response) => {
      setCountries(response?.data);
    });
  }, []);

  const [ingredients, setIngredients] = useState([
    { id: 1, ingredient: '', quantity: '', unit:'' },
  ]);

  const capitalStart = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const changeData = (e) => {
    setData({ ...data, [e.target.name]: capitalStart(e.target.value) });
  };

  // const changeImage = (e) => {
  //   const head_api = 'https://source.unsplash.com/';

  //   if ((e.target.value.indexOf(head_api) === -1)){
  //     const randomPic = RANDOM_IMG_API + e.target.value + '-food';
  //     setData({ ...data, [e.target.name]: randomPic }); 
  //   } else {
  //     setData({ ...data, [e.target.name]: e.target.value });
  //   } 
  // };

  const changeCountry = (e) => {
    const country = countries.find((item) => item.name === e.target.value);
    setData({ ...data, country_code: country.alpha3Code });
  };

  const changeIngredient = (e, i) => {
    const { name, value } = e.target;
    const ingredientlist = [...ingredients];
    ingredientlist[i][name] = value;
    setIngredients(ingredientlist);
    setData({ ...data, ingredients: ingredients });
  };

  const addIngrdient = (e) => {
    e.preventDefault();
    const newIngredient = { id: ingredients.length + 1, ingredient: '', quantity: '', unit:'' };
    setIngredients([...ingredients, newIngredient])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // changeImage();
    try {
      if (locationData){
        const recipeDoc = doc(db, "recipes", recipeId);
        await updateDoc(recipeDoc, {...data});
      } else {
        await addDoc(collection(db, 'recipes'), {...data, created:Timestamp.now()});
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className={css.addFood}>
      
      <form>
      
      <h2>Add a new recipe: </h2>
      <br/>

          <div className={css.spaced}>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" onChange={changeData} className={css.input1} placeholder={data?.name || ''} />
          </div>

          <div className={css.spaced}>
              <label htmlFor="author">Author</label>
              <input type="text" name="author" id="author" onChange={changeData} className={css.input1} placeholder={data?.author || ''} />
          </div>

          <div className={css.spaced}>
              <label htmlFor="description">Description</label>
              <textarea type="text" name="description" id="description" onChange={changeData} className={css.input1} placeholder={data?.description || ''} />
          </div>
           
          <div className={css.spaced}>
              <label htmlFor="country_code">Origin Country :</label>
              <select name="country_code" id="country_code" onChange={changeCountry} className={css.input1} defaultValue='Select a Country' >
                <option value={locationCountry.alpha3Code || null}> {locationCountry.alpha3Code || 'Select a country...' }</option>
                {countries.map((country) => (
                  <option key={country?.name}>{country?.name}</option>
                ))}
              </select>
          </div>

          <div className={css.spaced}>
            <label htmlFor="image">Image url <br/> or image name <br/> to search: </label>
             <input type="text" name="image" id="image" onChange={changeData} className={css.input1} placeholder={data?.image || ''} />
          </div>
          
             https://source.unsplash.com/[img_id]
          
          <div className={css.ingredientsArea}>             
            <p>Ingredients</p>         
              {locationData.ingredients ?
                    locationData.ingredients.map((ingredient, i) => {
                      return (
                        <div key={i} className={css.spacedIngredients}>
                          <div className={css.spaced}>
                              <label htmlFor="ingredient">Ingredient </label>
                              <input type="text" name="ingredient" id="ingredient" onChange={(e) => changeIngredient(e, i)} className={css.input2} placeholder={ingredient.ingredient} />
                              <br></br>
                          </div>
                                        
                          <div className={css.spaced}>
                              <label htmlFor="quantity">Quantity </label>
                              <input type="text" name="quantity" id="quantity" onChange={(e) => changeIngredient(e, i)} className={css.input2} placeholder={ingredient.quantity} />
                          </div>

                          <div className={css.spaced}>
                              <label htmlFor="unit">Unit </label>
                              <select name="unit" id="unit" onChange={(e) => changeIngredient(e, i)} className={css.input1}>
                                <option value={ingredient.unit || ""} > {ingredient.unit || 'Select Unit...'} </option>
                                <option value="teaspoon" >teaspoon </option>
                                <option value="tablespoon" > tablespoon </option>
                                <option value="cup" > cup </option>
                                <option value="grams" > grams </option>
                                <option value="grams" > liters </option>
                                <option value="grams" > oz </option>
                                <option value="unit" > unit </option>
                              </select>
                            
                          </div>

                        </div>
                      );
                    })
              :
              
              ingredients.map((_, i) => {
                    return (
                      <div key={i} className={css.spacedIngredients}>
                        <div className={css.spaced}>
                            <label htmlFor="ingredient">Ingredient </label>
                            <input type="text" name="ingredient" id="ingredient" onChange={(e) => changeIngredient(e, i)} className={css.input2} />
                            <br></br>
                        </div>
                                       
                        <div className={css.spaced}>
                            <label htmlFor="quantity">Quantity </label>
                            <input type="text" name="quantity" id="quantity" onChange={(e) => changeIngredient(e, i)} className={css.input2} />
                        </div>

                        <div className={css.spaced}>
                            <label htmlFor="unit">Unit </label>
                            <select name="unit" id="unit" onChange={(e) => changeIngredient(e, i)} className={css.input1}>
                              <option value="" hidden> Select Unit </option>
                              <option value="teaspoon" >teaspoon </option>
                              <option value="tablespoon" > tablespoon </option>
                              <option value="cup" > cup </option>
                              <option value="grams" > grams </option>
                              <option value="grams" > liters </option>
                              <option value="grams" > oz </option>
                            </select>
                           
                        </div>

                      </div>
                    );
              })}
              <div>
                <button onClick={addIngrdient}>Add ingredient</button>
              </div>
              
            </div>
          
            <div className={css.spaced}>
              <label htmlFor="instruction">Instructions</label>
              <textarea type="text" name="instruction" id="instruction" onChange={changeData} className={css.input1} placeholder={locationData.instruction || ''} />
            </div>

            <div className={css.spaced}>
              <input type="submit" value={locationData ? "Edit" : "Submit"} onClick={handleSubmit}/>
            </div>

      </form>
    </div>
  )
}

export default AddFood;
