import React, { useState } from "react";
import { Category } from "../../../types/Category";
import suspenseApi from "../../../service/suspenseApi";
import Spinner from "../../../components/spinner";

import { List, ListItem } from '../../styles/Lists';

type CategoryListProps = {
  selectCategory: (id: Category) => void;
};

const resource = suspenseApi.categories();

const CategoryList = ({ selectCategory }: CategoryListProps) => {
  const categories = resource.read() as Category[];
  const [pendingId, setPendingId] = useState<number | null>(null);

  return (
    <>
      <h3>Categories</h3>
      <List>
        {categories.map((c: Category) => {
          return (
            <ListItem
              key={c.id}
              onClick={() => {
                setPendingId(c.id);
                selectCategory(c);
              }}
            >
              <div>{c.title}</div>
              <div>{pendingId === c.id && <Spinner />}</div>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default CategoryList;
