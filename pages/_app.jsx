import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import Router from "next/router";
import withGA from "next-ga";
import NextSeo from "next-seo";

import { Search } from "../src/components/Search";

class Layout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="layout">
        <Head title="Home">
          <link
            rel="stylesheet"
            href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
          />
        </Head>
        <NextSeo
          config={{
            title: "CeX Watch!",
            canonical: "https://www.cex.watch/",
            description:
              "Exchange price, Sell price and Buy price tracking for all CeX products."
          }}
        />

        <main className="avenir">
          <Search />
          {children}
        </main>
      </div>
    );
  }
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}

export default withGA("UA-78828365-9", Router)(MyApp);
