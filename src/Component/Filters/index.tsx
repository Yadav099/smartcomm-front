import React from "react";
import "./main.scss";
import { Filters } from "../../Constant/Constant";

interface IFilter {
  selectFilter: (index: number) => void;
}
const Filter = (prop: IFilter) => {
  const [select, setSelect] = React.useState(0);

  return (
    <form className="filterWrapper">
      <label className="filtersHeading">Filters:</label>
      {Filters.map((item: string, index: number) => (
        <section className={select === index ? "glow" : "filters"}>
          <input
            checked={select === index ? true : false}
            type="radio"
            name="toggler"
            onChange={() => {
              prop.selectFilter(index);
              setSelect(index);
            }}
          />
          <label className="filtersLabel">{item}</label>
        </section>
      ))}
    </form>
  );
};

export default Filter;
