import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomePage } from "./pages/home-pages";
import { Header } from "./components/header";
import {Provider} from "react-redux";
import { store } from "./redux";
import { StackPage } from "./pages/stack-page";
import { AuthPage } from "./pages/auth-page";
import {LogoutPage} from "./pages/logout";
import {RegistrationPage} from "./pages/registration";



function App() {
  return (
      <Provider store={store}>
        <Router>
            <div className="App">
                <Header/>
            <Switch>
                <Route exact path="/">
                    <HomePage/>
                </Route>
                <Route exact path="/stack">
                    <StackPage/>
                </Route>
                <Route exact path="/login">
                    <AuthPage/>
                </Route>
                <Route exact path="/logout">
                    <LogoutPage/>
                </Route>
                <Route exact path="/registration">
                    <RegistrationPage/>
                </Route>
            </Switch>
            </div>
        </Router>
      </Provider>
  );
}

export default App;
