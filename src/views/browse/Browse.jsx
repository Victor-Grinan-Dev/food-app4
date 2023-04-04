import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Card from '../../Ui/Card';
import css from './browse.module.css';

//firebase
// import { db } from '../../firebase-config';
// import {collection, addDoc, Timestamp} from 'firebase/firestore';

// const databaseAPI = 'https://foodapp-c71e2-default-rtdb.europe-west1.firebasedatabase.app/database';
const countriesAPI = 'https://restcountries.com/v2/all'

function Browse() {
  const [recipes, setRecipes] = useState([]);
  const [country, setCountry] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const recipesFilter = recipes.filter((res) => {
    res.name = res.name.toLowerCase()
    return res.name.includes(search.toLowerCase());
  });

  const searchHandler = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value); 
    };

  // const getRecipes = () => axios.get(databaseAPI);
  const getCountries = () => axios.get(countriesAPI);

  useEffect(() => {
    setLoading(true);
    setRecipes([]);
    Promise(getCountries()).then(res => {
      const countriesData = res;
      setCountry(countriesData.data);
    })
  //   Promise.all([getRecipes(), getCountries()]).then(function (results) {
  //     const recipesData = results[0];
  //     const countriesData = results[1]; 
  //     setRecipes(recipesData.data);
  //     setCountry(countriesData.data);

      setLoading(false);
    // });
  }, []);

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
            country={country.find(
              (country) => country.alpha2Code === recipe.country_code
            )}
            {...recipe}
          />
        ))}
      </div>

    </div>
  );
};

export default Browse;
