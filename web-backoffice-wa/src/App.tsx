import { Component, ReactNode } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar, NavbarBrand } from 'reactstrap'

// Class Component
import { Login } from './components/Login'
import { Dashboard } from './components/Backoffice'

// CSS
import './App.css'

// DB
import { Config } from './model/requestModel'

// component interface
interface AppProps {

}

interface AppStates {
  validate: boolean,
}

class App extends Component<AppProps, AppStates> {
  public state = {
    validate: false,
    adminAuth: false,
  }

  public async componentDidMount() {
    const userEmail = localStorage.getItem("email")
    const url = "http://localhost:8080/adminAuth"
    if(userEmail !== null) {
      const boolUserAuth = await fetch(url, Config("POST", JSON.parse(userEmail)))
        .then(res => res.json())
      this.setState({
        validate: boolUserAuth,
      })
    }
  }

  public shouldComponentUpdate(nextProps: any, nextState: any) {
    // avoid validate re-render
    if (this.state.validate === nextState.validate) {
      return false
    }
    return true
  }

  private IsValidate(args: boolean) {
    this.setState({
      validate: args
    })
  }

  private async Logout(args: boolean) {
    const userAuth = localStorage.getItem("email")
    const url = "http://localhost:8080/logoutAdmin"
    if(userAuth !== null) {
      const logoutSuccess = await fetch(url, Config("POST", JSON.parse(userAuth)))
        .then(res => res.json())
      if(logoutSuccess !== null && logoutSuccess) {
        localStorage.clear()
        this.setState({
          validate: args
        })
      }
    }
  }

  public render(): ReactNode {
    return (
      <div>
        <Navbar
          color="primary"
          dark
          expand
          fixed='top'
        >
          <NavbarBrand href="/">
            Whatsapp Web Backoffice
          </NavbarBrand>
        </Navbar>
        
        <BrowserRouter>
          <Routes>
            <Route path="*" element={
              this.state.validate
                ? <Navigate to="/dashboard" />
                : <Navigate to="/login" />
            }
            />
            <Route path="/login" element={!this.state.validate ? <Login handleLogin={(bool) => this.IsValidate(bool)} /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={this.state.validate ? <Dashboard handleLogout={(log) => this.Logout(log)} /> : <Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
