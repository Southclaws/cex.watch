import React from "react";

export const Search = ({ doSearch }) => {
  return (
    <nav className="pa3 pa4-ns">
      <div className="pa4-l">
        <form
          className="bg-red mw7 center pa4 br2-ns ba b--black-10"
          method="get"
          action="/"
          onSubmit={doSearch}
        >
          <fieldset className="cf bn ma0 pa0">
            <legend className="pa0 f5 f4-ns mb3 white">
              Search CeX Products
            </legend>

            <label className="clip" htmlFor="query" />
            <input
              required={true}
              className={[
                "f6",
                "f5-l",
                "input-reset",
                "bn",
                "fl",
                "black-80",
                "bg-white",
                "bg-animate",
                "pa3",
                "lh-solid",
                "w-100",
                "w-75-m",
                "w-80-l",
                "br2-ns",
                "br--left-ns"
              ].join(" ")}
              placeholder="Product name..."
              type="text"
              name="q"
              id="search-query"
            />
            <input
              className={[
                "f6",
                "f5-l",
                "button-reset",
                "fl",
                "pv3",
                "tc",
                "bn",
                "lh-solid",
                "bg-animate",
                "bg-black-70",
                "hover-bg-black",
                "white",
                "pointer",
                "w-100",
                "w-25-m",
                "w-20-l",
                "br2-ns",
                "br--right-ns"
              ].join(" ")}
              type="submit"
              value="Search"
            />
          </fieldset>
        </form>
      </div>
    </nav>
  );
};
