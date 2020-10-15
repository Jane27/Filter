import React from "react";

interface Menu {
  synopsis: Column[];
  addFilter: (item: string) => void;
}

interface Column {
  colType: string;
  numRows: number;
  numUniqueValues: number;
  sample: string[];
  sampleHeader: string;
}

const FilterMenu = ({ synopsis, addFilter }: Menu) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <button className="navbar-toggler" type="button"></button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {" "}
              + Add Filter{" "}
            </a>

            <ul className="dropdown-menu">
              {synopsis.length > 0 &&
                synopsis?.map((column: Column, index) => (
                  <li
                    key={`index-${column.sampleHeader}`}
                    className={
                      column.sample.length > 0 ? "dropdown-submenu" : ""
                    }
                  >
                    <a className="dropdown-item" href="#"></a>

                    {column.sampleHeader}
                    {column.sample.length > 0 && (
                      <ul className="dropdown-menu">
                        {column.sample.map((item: string, index) => (
                          <li key={index} onClick={() => addFilter(item)}>
                            <a className="dropdown-item" href="#">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FilterMenu;
