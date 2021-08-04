import { useState, useEffect } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { Home, Login, } from './pages'
import history from './utils/history'
import ProtectedRoutes from './routes/ProtectedRoutes'

function App() {
  const token = JSON.parse(localStorage.getItem('userData'))?.token
  const [isAuthenticated, setIsAuthenticated] = useState(token && token.length > 0)

  // useEffect(() => {
  //   if(token){
  //     setIsAuthenticated(true)
  //   } else {
  //     setIsAuthenticated(false)
  //   }
  // }, [token])

  useEffect(() => {
    var query = history.location.search;
    if (query.token) {
      setIsAuthenticated(true)
      window.localStorage.setItem("jwt", query.token);
      this.props.history.push("/");
    }
  }, [])

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Login setIsAuthenticated={setIsAuthenticated} />
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
