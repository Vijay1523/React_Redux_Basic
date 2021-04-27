import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AddUser from "./AddUser";
import UserList from "./UserList";
import Loader from "./common/Loader";
import { connect } from "react-redux";
import "./App.css";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content-part">
          {props.isLoading ? (
            <Loader />
          ) : (
            <Switch>
              <Route exact path="/">
                <UserList />
              </Route>
              <Route exact path="/add/:id?">
                <AddUser />
              </Route>
              <Route exact path="/dashboard">
                Dashboard Content
              </Route>
            </Switch>
          )}
        </div>

        <Footer />
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, null)(App);
