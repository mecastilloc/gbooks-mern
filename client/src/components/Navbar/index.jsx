import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

class Navbar extends Component {
  render(){
    return (
    <div className="navbar navbar-dark bg-dark">
      <h2 className="navbar-brand">Google Book Search</h2>
      <nav className="d-flex ml-auto">
        <NavLink to='/' className="nav-link " exact activeClassName="active">Search</NavLink>
        <NavLink to='/saved' className="nav-link " exact activeClassName="active">Saved</NavLink>
      </nav>
    </div>
  )
    }
}

export default Navbar;
