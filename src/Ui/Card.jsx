import React from "react";
import { Link } from "react-router-dom";
import css from "./card.module.css";

import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const deleteRecipe = async (id) => {
  const recipeDoc = doc(db, "recipes", id);
  await deleteDoc(recipeDoc);
};

const Card = ({ name, description, image, data, country }) => {
  const capitalStart = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={css.cardBox}>
      <div className={css.cardHeader}>
        <Link to={name} state={{ data: data, country: country }}>
          <h2 className={css.name}>{capitalStart(name)}:</h2>
        </Link>
        <Link
          to={`https://victor-grinan-dev.github.io/countries_app1/#/Browse`}
        >
          <img src={country?.flag} alt={country?.name} className={css.flag} />
        </Link>
      </div>

      <div className={css.imageContainer}>
        <Link to={name} state={{ data: data, country: country }}>
          <img src={image} alt={name} className={css.image} />
        </Link>
      </div>

      <p className={css.description}>{capitalStart(description)}</p>

      <div className={css.cardFooter}>
        <Link
          className={css.cardBtn}
          to={name}
          state={{ data: data, country: country }}
        >
          <span className="material-symbols-outlined">visibility</span>
        </Link>
        <Link
          className={css.cardBtn}
          to={`edit/${name}`}
          state={{ data: data, country: country }}
        >
          <span className="material-symbols-outlined">edit</span>
        </Link>

        <span
          className={css.cardBtn}
          onClick={() => {
            deleteRecipe(data.id);
          }}
        >
          <span className="material-symbols-outlined ">delete</span>
        </span>
      </div>
    </div>
  );
};

export default Card;
