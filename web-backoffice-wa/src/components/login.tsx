import { Component } from 'react'

import {Card, CardBody, Input, CardTitle, Button, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap'

import '../css/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface MyProps {

}

interface MyState {
  loginData: {
    email: string,
    emailValid: boolean,
    password: string,
  }
}

class App extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props)
    this.state = {
      loginData: {
        email: "",
        emailValid: true,
        password: ""
      }
    }
  }

  async login() {
    const regexp : RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const url = "http://localhost:8080/loginAdmin"
    const requestOpt = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...this.state.loginData
      })
    }
    if(regexp.test(this.state.loginData.email)) {
      this.setState({
        loginData: {
          ...this.state.loginData,
          emailValid: true,
        }
      })
      await fetch(url, requestOpt)
        .then((res) => console.log(res))
      
    } else {
      this.setState({
        loginData: {
          ...this.state.loginData,
          emailValid: false,
        }
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
                <CardTitle tag="h5"> Admin login backoffice </CardTitle>
                <Input
                    bsSize="sm"
                    placeholder="enter email"
                    invalid={!this.state.loginData.emailValid}
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
            </Card>
        </div>
    </div>
    );
  }
}

export const Login = App;

