import React, { useState, useRef } from "react";

const types = ["Default", "Date", "Search", "Score"];
interface Filter {
  filterName: string;
  type: string;
  deleteFilter: (filterName: string) => void;
  updateInfo: (
    filterName: string,
    col: "name" | "type",
    newValue: string
  ) => void;
}

const FilterItem = ({ filterName, type, deleteFilter, updateInfo }: Filter) => {
  const [name, setName] = useState(filterName);
  const [filterType, setfilterType] = useState(type);
  const refInput = useRef<HTMLInputElement>(null);

  const handleUpdateName = () => {
    if (refInput?.current) {
      setName(refInput.current.value);
      updateInfo(filterName, "name", refInput.current.value);
    }
  };

  const handleUpdateType = (newType: string) => {
    setfilterType(newType);
    updateInfo(filterName, "type", newType);
  };

  return (
    <div className="d-flex  flex-row">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            @
          </span>
        </div>
        <input
          ref={refInput}
          type="text"
          className="form-control"
          placeholder="Username"
          defaultValue={name}
          onBlur={(e) => handleUpdateName()}
        />
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text">Types</label>
        </div>
        <select
          className="custom-select"
          value={filterType}
          onChange={(e) => handleUpdateType(e.target.value)}
        >
          {types.map((item, index) => (
            <option key={`index-${item}`} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteFilter(filterName)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FilterItem;
