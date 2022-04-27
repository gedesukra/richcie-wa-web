import { Component } from 'react'
import { Form } from '../container/loginForm';

import {Card, CardBody, Input, CardTitle, Navbar, NavbarBrand, NavbarToggler, Button} from 'reactstrap'

import '../css/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
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
        <Form />
    </div>
    );
  }
}

export const Login = App;

