import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import NextSeo from "next-seo";
import {
  ChartContainer,
  ChartRow,
  YAxis,
  styler,
  Charts,
  AreaChart
} from "react-timeseries-charts";
import { TimeSeries } from "pondjs";

const Product = ({ results, info }) => {
  let [highlight, setHighlight] = useState("");
  let [tracker, setTracker] = useState(null);
  let points = [];
  let max = 0;
  let min = 9999;

  results.forEach(sample => {
    if (sample.sellPrice > max) {
      max = sample.sellPrice;
    }
    if (sample.cashPrice < min) {
      min = sample.cashPrice;
    }
    points.push([
      new Date(sample.createdAt),
      sample.sellPrice,
      sample.exchangePrice,
      sample.cashPrice
    ]);
  });

  let trackerData = [];
  if (tracker !== null) {
    trackerData = [
      { label: "Cash", value: 87 },
      { label: "Sell", value: 87 },
      { label: "Exch", value: 87 }
    ];
  }

  points.sort((a, b) => {
    return a[0] - b[0];
  });

  const columns = ["time", "sell", "exch", "cash"];
  const series = new TimeSeries({ name: "Price", columns, points });
  const styles = styler(columns, "Reds");

  return (
    <div className="pa1 mw7 center">
      <NextSeo
        config={{
          description:
            "Exchange price, Sell price and Buy price tracking for all CeX products.",
          openGraph: {
            url: `https://www.cex.watch/product/${info.boxId}`,
            title: info.boxName,
            description: `Exchange, Sell, Buy price history for ${
              info.boxName
            }`,
            site_name: "CeX Watch"
          }
        }}
      />

      <h2 className="ph3">{info.boxName}</h2>
      <div className="ph3 ph5-ns">
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Identifier:</dt>
          <dd className="dib ml0 gray">{info.boxId}</dd>
        </dl>
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Category:</dt>
          <dd className="dib ml0 gray">{info.categoryName}</dd>
        </dl>
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Main Category:</dt>
          <dd className="dib ml0 gray">{info.superCatName}</dd>
        </dl>
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Unavailble:</dt>
          <dd className="dib ml0 gray">{info.cannotBuy}</dd>
        </dl>
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Newly Added:</dt>
          <dd className="dib ml0 gray">{info.isNewBox}</dd>
        </dl>
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Current Price:</dt>
          <dd className="dib ml0 gray">{info.sellPrice}</dd>
        </dl>
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Current Trade Price (Cash):</dt>
          <dd className="dib ml0 gray">{info.cashPrice}</dd>
        </dl>
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Current Trade Price (Credit):</dt>
          <dd className="dib ml0 gray">{info.exchangePrice}</dd>
        </dl>
        <dl className="f6 lh-title mv2">
          <dt className="dib b">Out of Stock:</dt>
          <dd className="dib ml0 gray">{info.outOfStock}</dd>
        </dl>
      </div>

      <ChartContainer
        timeRange={series.range()}
        onTrackerChanged={t => setTracker(t)}
        trackerHintWidth={100}
        trackerHintHeight={100}
        trackerPosition={tracker}
        trackerValues={trackerData}
      >
        <ChartRow height="350">
          <YAxis
            id="y"
            min={0}
            max={max}
            min={min}
            width="100%"
            type="linear"
          />
          <Charts>
            <AreaChart
              axis="y"
              style={styles}
              series={series}
              stack={false}
              columns={{ up: columns, down: [] }}
              fillOpacity={0.4}
              interpolation="curveBasis"
              highlight={highlight}
              onHighlightChange={highlight => setHighlight(highlight)}
            />
          </Charts>
        </ChartRow>
      </ChartContainer>
    </div>
  );
};

Product.getInitialProps = async ({ query: { id } }) => {
  if (id === undefined) {
    return {};
  }
  let results = await (await fetch(
    `https://api.cex.watch/products/${id}/history`
  )).json();
  let info = await (await fetch(`https://api.cex.watch/products/${id}`)).json();
  return { results: results.result, info: info.result };
};

export default Product;
