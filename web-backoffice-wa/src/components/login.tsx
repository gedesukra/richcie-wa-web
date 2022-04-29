import { Component } from 'react'
import { Config } from '../model/requestModel'

import {Spinner, Card, CardBody, Input, CardTitle, Button, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap'

import '../css/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// data structure
const loginStructure = {
  loginData: {
    email: "",
    password: ""
  },
  loginResponse: {
    status: false,
    msg: "",
  }
}

// component interface
interface LoginProps {
  handleLogin: (result: boolean) => void,
}

interface LoginState {
  emailValid: boolean,
  loading: boolean,
  loginData: {
    email: string,
    password: string,
  }
  loginResponse: {
    status: boolean,
    msg: string,
  }
}

class LoginComponent extends Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props)
    this.state = {
      emailValid: true,
      loading: false,
      loginData: {
        ...loginStructure.loginData
      },
      loginResponse: {
        ...loginStructure.loginResponse
      }
    }
  }

  shouldComponentUpdate(nextProps: any, nextStates: any) {
    if(
      this.state.emailValid !== nextStates.emailValid ||
      this.state.loading !== nextStates.loading ||
      this.state.loginResponse !== nextStates.loginResponse) {
        return true
      }
      return false
  }

  async login() {
    const regexp : RegExp = new RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const url = "http://localhost:8080/loginAdmin"
    if(regexp.test(this.state.loginData.email)) {
      this.setState({
        loading: true,
        emailValid: true,
      })
      await fetch(url, Config("POST", this.state.loginData))
        .then(response => response.json())
        .then(data => {
          this.setState({
            loading: false,
            loginResponse:  {
              status: data["status"],
              msg: data["msg"]
            }
          })
          this.props.handleLogin(data["status"])
        })
    } else {
      this.setState({
        emailValid: false,
      })
    }
  }

  handleChange(e: React.FormEvent<HTMLInputElement>, type: string) {
    e.preventDefault()
    var value = e.currentTarget.value;
    this.setState({loginData: {
      ...this.state.loginData,
      [type]: value
    }});
  }

  render() {
    // spinner
    let spinner = <></>
    if(this.state.loading) {
      spinner = (
        <Spinner color="primary" className="spinner">
          Loading...
        </Spinner>
      )
    }
    if(!this.state.loading && this.state.loginResponse.msg.length > 0) {
      const loginValid: boolean = this.state.loginResponse.status
      spinner = (
        <CardTitle tag="h6" style={{"color": loginValid ? "black" : "red"}}>
          <b>
            {this.state.loginResponse.msg} 
          </b>
        </CardTitle>
      )
    }

    return (
    <div className='text-center'>
        <Navbar
          color="primary"
          dark
          expand
        >
            <NavbarBrand href="/">
            Whatsapp Web Backoffice
            </NavbarBrand>
            <NavbarToggler />
        </Navbar>
        <div>
            <Card body outline className='loginForm'>
                <CardBody>
                <CardTitle tag="h5">Admin login backoffice</CardTitle>
                <Input
                    bsSize="sm"
                    placeholder="enter email"
                    invalid={!this.state.emailValid}
                    onChange={(e) => this.handleChange(e, "email")}
                />
                <Input
                    type="password"
                    bsSize="sm"
                    placeholder="enter password"
                    onChange={(e) => this.handleChange(e, "password")}
                />
                <br />
                <Button className='loginButton' onClick={() => this.login()}>
                    Login
                </Button>
                </CardBody>
                {spinner}
            </Card>
        </div>
    </div>
    );
  }
}

export const Login = LoginComponent;

