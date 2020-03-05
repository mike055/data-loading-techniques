import React, { useState } from "react";
import CategoryList from "./category-list";
import CategoryClues from "./category-clues";
import { Category } from "../../types/Category";

const FetchOnRender = () => {
  const [category, setCategory] = useState<Category | null>(null);
  return (
    <>
      {
        category ? <CategoryClues category={category} /> : <CategoryList selectCategory={setCategory} />
      }
    </>
  );
};

export default FetchOnRender;
