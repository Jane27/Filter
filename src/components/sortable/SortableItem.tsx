import React from "react";
import { SortableElement } from "react-sortable-hoc";

const SortableItem = SortableElement(({ value }: any) => {
  return <div>{value}</div>;
});

export default SortableItem;
