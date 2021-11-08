import React, { Component } from "react";
import { Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FavoriteMovies from "./FavoritesDropdown";

class NavigationBar extends Component {
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img
            alt=""
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          MyMoviz
        </NavbarBrand>
      </Navbar>
    );
  }
}

export default NavigationBar;
