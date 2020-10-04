import React, { useState } from "react";

import Toast from "react-bootstrap/Toast";
//import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";

import "./App.css";

const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  );
};

export function QRDialog() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.loginFailed = false;
  }

  handleCancel(event) {
    alert("cancel");
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("/otp/authenticate/" + data.get("login"), {
      method: "POST",
      body: data
    })
      .then((response) => {
        if (response.ok) {
          this.loginFailed = false;
          var r = response.text();
          if (r === "AUTHENTICATED") {
            window.location.replace("secured.html");
          } else if (r === "REQUIRE_TOKEN_CHECK") {
          } else {
            this.loginFailed = true;
          }
        } else {
          this.loginFailed = true;
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            id="login"
            name="login"
            type="text"
            className="form-control"
            placeholder="Enter login"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <button id="btnLogin" className="btn btn-primary">
          Login
        </button>
        <button
          id="btnCancelLogin"
          className="btn btn-outline-primary"
          onClick={this.handleCancel}
        >
          Cancel
        </button>
        {this.loginFailed ? (
          <div
            id="msgLoginFailed"
            className="alert alert-danger collapse"
            role="alert"
          >
            Provided login or password could not be recognized
          </div>
        ) : null}
      </form>
    );
  }
}
