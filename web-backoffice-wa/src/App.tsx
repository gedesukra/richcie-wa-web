import { PureComponent, ReactNode } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate 
} from "react-router-dom";
import { Login } from './components/login'
import { Office } from './components/backoffice'

class App extends PureComponent {
  render() : ReactNode {
    return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Office" element={<Office />} />
      </Routes>
    </BrowserRouter>
    )
  }
}

export default App;
