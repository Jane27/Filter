import React from "react";
import { SortableContainer } from "react-sortable-hoc";

const Container = SortableContainer(({ children }: any) => {
  return <div>{children}</div>;
});

export { Container as SortableContainer };
