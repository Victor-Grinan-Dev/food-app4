import React, { useState, useEffect } from "react";
import axios from "axios";
import css from "./addFood.module.css";

//import {db} from './firebase';
//import {collection, addDoc, Timestamp} from 'firebase/firestore';
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useLocation } from "react-router-dom";

function AddFood() {
  const COUNTRIES_API = "https://restcountries.com/v2/all";
  //const RANDOM_IMG_API = 'https://source.unsplash.com/500x400/?'; //concat this to a name

  const location = useLocation();
  const locationData = location.state?.data || "";
  const locationCountry = location.state?.country || "";
  const recipeId = location.state?.data.id || "";

  const [isShowHint, setIsShowHint] = useState(false);

  const emptyState = {
    name: "",
    author: "",
    description: "",
    ingredients: [],
    instruction: "",
    image: "",
    country_code: "",
  };

  const [data, setData] = useState(locationData || emptyState);

  const [countries, setCountries] = useState([]);

  const [ingredients, setIngredients] = useState([
    { id: 1, ingredient: "", quantity: "", unit: "" },
  ]);

  useEffect(() => {
    axios.get(COUNTRIES_API).then((response) => {
      setCountries(response?.data);
    });
  }, []);

  useEffect(() => {
    if(locationData){
      setIngredients(locationData?.ingredients);
    }
  }, [locationData]);

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
    const newIngredient = {
      id: ingredients.length + 1,
      ingredient: "",
      quantity: "",
      unit: "",
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // changeImage();
    try {
      if (locationData) {
        const recipeDoc = doc(db, "recipes", recipeId);
        await updateDoc(recipeDoc, { ...data });
      } else {
        await addDoc(collection(db, "recipes"), {
          ...data,
          created: Timestamp.now(),
        });
      }
    } catch (err) {
      alert(err);
    }
  };
  const removeByIndex = (index) => {
    return ingredients.filter((_, i) => i !== index);
  };

  const deleteIngredient = (id) => {
    if (ingredients.length === 1) {
      setIngredients([{ id: 1, ingredient: "", quantity: "", unit: "" }]);
      window.location.reload();
    } else {
      setIngredients(removeByIndex(id));
    }
  };

  return (
    <div className={css.addFood}>
      <form className="form">
        <h2>Add a new recipe: </h2>
        <p>
          <span className="material-symbols-outlined">
              warning
          </span>
            Random users can't add or edit recipes:</p>
        <br />
        <div className={css.spaced}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={changeData}
            className={css.input1}
            placeholder={data?.name || ""}
          />
        </div>
        <div className={css.spaced}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            onChange={changeData}
            className={css.input1}
            placeholder={data?.author || ""}
          />
        </div>
        <div className={css.spaced}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            onChange={changeData}
            className={css.input1}
            placeholder={data?.description || ""}
          />
        </div>
        <div className={css.spaced}>
          <label htmlFor="country_code">Origin Country :</label>
          <select
            name="country_code"
            id="country_code"
            onChange={changeCountry}
            className={css.input1}
            defaultValue="Select a Country"
          >
            <option value={locationCountry.alpha3Code || null}>
              {" "}
              {locationCountry.alpha3Code || "Select a country..."}
            </option>
            {countries.map((country) => (
              <option key={country?.name}>{country?.name}</option>
            ))}
          </select>
        </div>
        <div className={css.spaced}>
          <label htmlFor="image">
            Image url{" "}
            <span
              className="material-symbols-outlined"
              onClick={() => setIsShowHint(!isShowHint)}
              style={{ cursor: "pointer" }}
            >
              {!isShowHint ? "help" : "cancel"}
            </span>
          </label>
          <input
            type="text"
            name="image"
            id="image"
            onChange={changeData}
            className={css.input1}
            placeholder={data?.image || ""}
          />
        </div>
        {isShowHint && (
          <div>
            1- rigth click on a image.
            <br />
            2-"copy image address"
            <br />
            3- paste it (ctrl+v).
            <br />
            Try from here:
            <a href="https://imgur.com/"> imgur.com</a>
            or copy this ready urls:
            <br />
            https://i.imgur.com/1IrjFmRb.jpg (burger)
            <br />
            https://i.imgur.com/tfEis8D.jpeg (nuggets)
            <br />
            https://i.imgur.com/VUEGlFp.jpeg (pizza)
          </div>
        )}
        <div className={css.ingredientsArea}>
          <p style={{ fontWeight: "bold" }}>Ingredients:</p>
             {ingredients && ingredients.map((ing, i) => { 
                return (
                  <div key={i} className={css.spacedIngredients}>
                    <div className={css.spaced}>
                      <label htmlFor="ingredient">Ingredient #{i + 1} </label>
                      <span onClick={() => deleteIngredient(i)}>
                        <span
                          className="material-symbols-outlined"
                          style={{ cursor: "pointer" }}
                        >
                          do_not_disturb_on
                        </span>
                      </span>
                      <input
                        type="text"
                        name="ingredient"
                        id="ingredient"
                        onChange={(e) => changeIngredient(e, i)}
                        className={css.input2}
                        value={ing.ingredient}
                      />
                    </div>

                    <div className={css.spaced}>
                      <label htmlFor="quantity">Quantity </label>
                      <input
                        type="text"
                        name="quantity"
                        id="quantity"
                        onChange={(e) => changeIngredient(e, i)}
                        className={css.input2}
                        value={ing.quantity}
                      />
                    </div>

                    <div className={css.spaced}>
                      <label htmlFor="unit">Unit </label>
                      <select
                        name="unit"
                        id="unit"
                        onChange={(e) => changeIngredient(e, i)}
                        className={css.input1}
                        value={ing.unit}
                      >
                        <option value="" hidden>
                          {" "}
                          Select Unit{" "}
                        </option>
                        <option value="teaspoon">teaspoon </option>
                        <option value="tablespoon"> tablespoon </option>
                        <option value="cup"> cup </option>
                        <option value="grams"> grams </option>
                        <option value="grams"> liters </option>
                        <option value="grams"> oz </option>
                      </select>
                    </div>
                    <div className={css.division} />
                  </div>
                );
              })}
          <div>
            <button onClick={addIngrdient}>Add ingredient</button>
          </div>
        </div>
        <div className={css.spaced}>
          <label htmlFor="instruction">Instructions</label>
          <textarea
            type="text"
            name="instruction"
            id="instruction"
            onChange={changeData}
            className={css.input1}
            placeholder={locationData.instruction || ""}
          />
        </div>
        <div className={css.spaced}>
          <input
            type="submit"
            value={locationData ? "Edit" : "Submit"}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default AddFood;
