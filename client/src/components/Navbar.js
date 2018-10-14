import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/authenticate';

class Navbar extends Component {
    onLogout(e) {
        e.preventDefault();
        console.log("onLogout Props", this.props);

        this.props.logoutUser(this.props.history);

    }
    render() {
        console.log("In nav", this.props);
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/todos">Todo</Link>
                </li>
                <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                    Logout {user.name}
                </a>
            </ul>
        )
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">SignUp</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signin">Login</Link>
                </li>
            </ul>
        )
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {isAuthenticated ? authLinks : guestLinks}
            </nav >


        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));