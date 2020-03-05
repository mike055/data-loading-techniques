import React, { useState, useEffect } from "react";
import { Category } from "../../../types/Category";
import api from "../../../service/api";

import { List, ListItem } from '../../styles/Lists';
import Spinner from '../../../components/spinner';

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
      {loading && <Spinner />}
      {error && <p>Error :(</p>}
      <List>
        {categories.map((c: Category) => {
          return (
            <ListItem key={c.id} onClick={()=> selectCategory(c)}>
              <div>
                {c.title}
              </div>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default CategoryList;
