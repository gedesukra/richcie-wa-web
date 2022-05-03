import React, { Component } from 'react'
import { Spinner, Card, CardBody, Input, CardTitle, Button } from 'reactstrap'

// DB
import { Config } from '../model/requestModel'

// CSS
import '../css/components/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// component interface
interface LoginProps {
  handleLogin: (result: boolean) => void,
}

interface LoginState {
  emailValid: boolean,
  loading: boolean,
  passwordDirty: boolean,
  loginData: {
    email: string,
    password: string,
    
  }
  loginResponse: {
    status: boolean,
    msg: string,
  }
}

// data structure
const loginStructure = {
  loginData: {
    email: "",
    password: "",
  },
  loginResponse: {
    status: false,
    msg: "",
  }
}

class LoginComponent extends Component<LoginProps, LoginState> {
  public state = {
    emailValid: true,
    loading: false,
    passwordDirty: false,
    loginData: {
      ...loginStructure.loginData
    },
    loginResponse: {
      ...loginStructure.loginResponse
    }
  }

  public shouldComponentUpdate(nextProps: any, nextStates: any) {
    if (
      this.state.emailValid !== nextStates.emailValid ||
      this.state.loading !== nextStates.loading ||
      this.state.passwordDirty !== nextStates.passwordDirty ||
      {...this.state.loginResponse} !== {...nextStates.loginResponse} ||
      {...this.state.loginData} !== {...nextStates.loginData}
    ) {
      return true
    }
    return false
  }

  private async login() {
    const regexp: RegExp = new RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const url = "http://localhost:8080/loginAdmin"
    if (regexp.test(this.state.loginData.email) && this.state.loginData.password.length > 0) {
      this.setState({
        loading: true,
        emailValid: true,
      })
      await fetch(url, Config("POST", this.state.loginData))
        .then(response => response.json())
        .then(data => {
          this.setState({
            loading: false,
            loginResponse: {
              status: data["status"],
              msg: data["msg"]
            }
          })
          this.props.handleLogin(data["status"])
        })
      localStorage.setItem("email", JSON.stringify({ email: this.state.loginData.email }))
    } else {
      this.setState({
        emailValid: false,
      })
    }
  }

  private handleChange(e: React.FormEvent<HTMLInputElement>, type: string) {
    console.log("tes")
    e.preventDefault()
    let value = e.currentTarget.value;
    if(type === "email") {
      value = value.toLowerCase()
    } else {
      this.setState({
        passwordDirty: true
      })
    }
    this.setState({
      emailValid: true,
      loginData: {
        ...this.state.loginData,
        [type]: value
      }
    });
  }

  private enterPressed(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.key === "Enter") {
      this.login()
    }
  }

  public render() {
    const passwordCheck = this.state.loginData.password.length === 0 && this.state.passwordDirty
    let spinner = <></>
    if (this.state.loading) {
      spinner = (
        <Spinner color="primary" className="spinner">
          Loading...
        </Spinner>
      )
    }
    if (!this.state.loading && this.state.loginResponse.msg.length > 0) {
      const loginValid: boolean = this.state.loginResponse.status
      spinner = (
        <CardTitle tag="h6" style={{ "color": loginValid ? "black" : "red" }}>
          <b>
            {this.state.loginResponse.msg}
          </b>
        </CardTitle>
      )
    }

    return (
      <div className='text-center'>
        <Card body outline className='loginForm'>
          <CardBody>
            <CardTitle tag="h5">Admin login backoffice</CardTitle>
            <Input
              bsSize="sm"
              placeholder="enter email"
              invalid={!this.state.emailValid}
              onChange={(e) => this.handleChange(e, "email")}
              onKeyDown={(e) => this.enterPressed(e)}
              style={{textTransform: "lowercase"}}
            />
            <Input
              type="password"
              bsSize="sm"
              placeholder="enter password"
              invalid={passwordCheck}
              onChange={(e) => this.handleChange(e, "password")}
              onKeyDown={(e) => this.enterPressed(e)}
            />
            <br />
            <Button className='loginButton' onClick={() => this.login()}>
              Login
            </Button>
          </CardBody>
          {spinner}
        </Card>
      </div>
    );
  }
}

export const Login = LoginComponent;

