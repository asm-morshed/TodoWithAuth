import React, { Component } from 'react'
import { registerUser } from '../actions/authenticate';
import { connect } from 'react-redux';

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: ''
        }
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        this.props.registerUser(user, this.props.history);
        console.log(user);

    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.value}
                                />
                            </div>
                            <div className="form-group">

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="form-group">

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                />
                            </div>
                            {/* <div className="form-group">

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password Confirmation"
                                    name="password_confirm"
                                    onChange={this.handleChange}
                                    value={this.state.password_confirm}
                                />
                            </div> */}

                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { registerUser })(Signup);