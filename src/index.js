import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Initialize Apollo Client, which will let us make graphQL queries to theGraph
export const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/jossduff/coffee-subgraph",
  cache: new InMemoryCache(),
});

// At the HTML element with id="root", render the app with ApolloProvider
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
