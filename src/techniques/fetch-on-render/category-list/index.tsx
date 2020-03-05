import React, { useState, useEffect } from "react";
import { Category } from "../../../types/Category";
import api from "../../../service/api";

type CategoryListProps = {
  selectCategory: (id: Category) => void;
};

const CategoryList = ({ selectCategory }: CategoryListProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api
      .categories()
      .then((categories: Category[]) => {
        setLoading(false);
        setCategories(categories);
      })
      .catch(error => {
        console.log("error!", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h3>Categories</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error :(</p>}
      <ul>
        {categories.map((c: Category) => {
          return (
            <li key={c.id} onClick={()=> selectCategory(c)}>
              <p>
                {c.id} : {c.title}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CategoryList;
