import React, { useState, Suspense, useTransition } from "react";
import CategoryList from "./category-list";
import CategoryClues from "./category-clues";
import Spinner from '../../components/spinner';
import suspenseApi from "../../service/suspenseApi";
import { Category } from "../../types/Category";



const SUSPENSE_CONFIG = { timeoutMs: 2000 };

const RenderAsFetch = () => {
  const [cluesResource, setCluesResource] = useState();
  const [startCluesTransition] = useTransition(SUSPENSE_CONFIG);
  const [category, setCategory] = useState<Category | null>(null);

  const onCategorySelect = (category: Category) => {
    startCluesTransition(()=> {
      setCluesResource(suspenseApi.clues(category.id));
      setCategory(category);
    })
  }
  return (
    <>
      {category ? (
        <Suspense fallback={<Spinner />}>
          <CategoryClues category={category} resource={cluesResource}  />
        </Suspense>
      ) : (
        <Suspense fallback={<Spinner />}>
          <CategoryList selectCategory={onCategorySelect} />
        </Suspense>
      )}
    </>
  );
};

export default RenderAsFetch;
