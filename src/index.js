import React from "react";
import ReactDOM from "react-dom";
import { LoginForm, QRDialog } from "./App";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(<LoginForm />, document.getElementById("LoginForm"));
ReactDOM.render(<QRDialog />, document.getElementById("QRDialog"));
