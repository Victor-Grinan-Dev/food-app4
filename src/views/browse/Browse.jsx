import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Card from '../../Ui/Card';
import css from './browse.module.css';
import { db } from '../../firebase.js';
import { collection, getDocs } from "firebase/firestore";

// import {collection, addDoc, Timestamp} from 'firebase/firestore';

// const databaseAPI = 'https://foodapp-c71e2-default-rtdb.europe-west1.firebasedatabase.app/database';
const countriesAPI = 'https://restcountries.com/v2/all';

function Browse() {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const recipesCollectionRef = collection(db, "recipes");

  useEffect(() => {
    setLoading(true);
    const getCountries = () => axios.get(countriesAPI).then(res => {
      setCountries(res.data);
    });

    const getRecipes = async () => {
      const data = await getDocs(recipesCollectionRef);
      setRecipes(data.docs.map(doc=>({...doc.data(), id: doc.id})));
    }
    getRecipes();
    getCountries(); //ok
    setLoading(false);
  }, []);
 
  // const [country, setCountry] = useState([]);


  const recipesFilter = recipes.filter((res) => {
    res.name = res.name.toLowerCase()
    return res.name.includes(search.toLowerCase());
  });

  const searchHandler = (e) => {
    setSearch(e.target.value); 
    };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.browse}>

      <div className={css.search}>
         <label> Search </label>
         <input type="text" className={css.searchImput} placeholder="🔍" onChange={searchHandler} />
       </div>
       <div className={css.showCards}>
         {recipesFilter.map((recipe) => (
         
           <Card
             key={recipe.id}
             name={recipe.id}
             data={recipe}
             country={countries.find(
               (country) => country.alpha3Code === recipe.country_code
             )}
             {...recipe}
           />
         ))}
       </div>

    </div>
  );
};

export default Browse;


