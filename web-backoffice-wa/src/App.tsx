import { Component, ReactNode } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  // useNavigate,
} from "react-router-dom";
import { Login } from './components/login'
import { Dashboard } from './components/backoffice'

import { Config } from './model/requestModel'

// component interface
interface AppProps {

}

interface AppStates {
  validate: boolean,
} 

class App extends Component<AppProps, AppStates> {
  state = {
    validate: true,
  }

  async componentDidMount() {
    const urlAdminAuth = "http://localhost:8080/adminAuth"
    const authBoolean = await fetch(urlAdminAuth, Config("GET"))
      .then(res => res.json())
      .then(data => data[0])
    this.setState({
      validate: authBoolean
    })
    }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    // avoid validate re-render
    if(this.state.validate === nextState.validate) {
      return false
    }
    return true
  }

  isValidate(result: boolean) {
    this.setState({
      validate: result,
    })
  }

  render() : ReactNode {
    return(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={
          this.state.validate 
            ? <Navigate to="/dashboard"/>
            : <Navigate to="/login"/>
          } 
        />
        <Route path="/login" element={!this.state.validate ? <Login handleLogin={(param) => this.isValidate(param)} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={this.state.validate ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
    )
  }
}

export default App;
