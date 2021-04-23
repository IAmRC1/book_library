import { useState, useEffect } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { Home, Login, } from './pages'
import history from './utils/history'
import ProtectedRoutes from './routes/ProtectedRoutes'

function App() {
  const assignment_token = localStorage.getItem('assignment_token')
  const [isAuthenticated, setIsAuthenticated] = useState(assignment_token && assignment_token.length > 0)

  useEffect(() => {
    if(assignment_token){
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [assignment_token])

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Login history={history} setIsAuthenticated={setIsAuthenticated} />
        </Route>
        <ProtectedRoutes
          path='/home'
          component={Home}
          isAuthenticated={isAuthenticated}
        />
      </Switch>
    </Router>
  );
}

export default App;
