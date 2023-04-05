import React, { Component } from "react";
import './form.css'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { fullname, password } = this.state;
    console.log(fullname, password);
    fetch("http://localhost:8000/login", {
        // mode: 'no-cors',
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fullname,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => { 
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful");
          console.log("1");
          window.localStorage.setItem("token", data.data);
          window.location.href = "./Home";
        }
        if(data.status == "no"){
            alert("User not found");
            console.log("2");
            document.getElementById("LoginPage").reset();
        }
        if(data.status == "error"){
          alert("Invalid Password");
          console.log("3");
      }
      });
  }
  render() {
    return (
        <div class="login-box">
      <form id="LoginPage" onSubmit={this.handleSubmit}>
            <h2>LOGIN</h2>

            <div className="Username">
            <label>Username</label>
            <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                required
                onChange={(e) => this.setState({ fullname: e.target.value })}
            />
            </div>

            <div className="Password">
            <label>Password</label>
            <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                required
                onChange={(e) => this.setState({ password: e.target.value })}
            /><span id="Password"></span>
            </div>

            <div className="Remember">
            <div className="custom-control custom-checkbox">
                <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
                </label>
            </div>
            </div>
            <br></br>
            <div className="submitBtn">
            <button type="submit" className="btn-primary">
            <a href="./Home" onclick="console.log('The link was clicked.'); return false">
                Submit
                </a>
            </button>
            </div>
        </form>
      </div>
    );
  }
}