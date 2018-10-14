import React, { Component } from 'react'
import { loginUser } from '../actions/authenticate';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',

        }
    }
    componentDidMount() {
        // console.log("After login", this.props.auth.isAuthenticated);

        if (this.props.auth.isAuthenticated) {
            // console.log("After login");

            this.props.history.push('/todos')
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log("NextProps: ", nextProps);
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/todos')
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
            email: this.state.email,
            password: this.state.password
        }
        console.log("From client", user);

        this.props.loginUser(user);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="form-group">

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                />

                            </div>

                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { loginUser })(withRouter(Signin));