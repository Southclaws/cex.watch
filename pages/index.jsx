import React from "react";
import fetch from "isomorphic-unfetch";

import { Results } from "../src/components/Results";

const Index = ({ results }) => {
  return (
    <div>{results === undefined ? null : <Results results={results} />}</div>
  );
};

Index.getInitialProps = async ({ query }) => {
  if (query.q === undefined) {
    return {};
  }

  let results = await (await fetch(
    `https://api.cex.watch/products?q=${query.q}`
  )).json();
  return { results: results.result };
};

export default Index;
