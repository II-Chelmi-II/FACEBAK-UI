import { useState } from 'react';
import './App.css';
import Login from "../src/components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Interface from "./components/Interface/Interface";



function App() {
  const [display, setDisplay] = useState(<Login />);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Interface" component={Interface} />
      </Switch>
    </Router>
  );
}

export default App;
