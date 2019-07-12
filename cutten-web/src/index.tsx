import * as React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./index.css";

import { App } from "./App";

const client = new ApolloClient({
    uri: "http://localhost:8000/graphql"
});

render (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, 
    document.getElementById("root")
);
