import React from "react";
import { connect, Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import { configureStore } from "../store";

class MyApp extends App {
    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <React.Fragment>
                        <Head>
                            <title>Data Analyse</title>
                        </Head>
                        <Component {...pageProps} />
                    </React.Fragment>
                </Provider>
            </Container>
        );
    }
}

export default withRedux(configureStore)(connect(state => state)(MyApp));