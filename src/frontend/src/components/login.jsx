import React from 'react';
import { connect } from "react-redux";


class LoginUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: ''
        };
    }

    handleEmailInput = (event) => {
        this.setState({
            ...this.state,
            email: event.target.value
        })
    };

    handlePasswordInput = (event) => {
        this.setState({
            ...this.state,
            pass: event.target.value
        })
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state)
        console.log(document.getElementById('email'), document.getElementById('pass'))
        // let res = await onSubmitLogin({
        //     userName: this.state.email,
        //     password: this.state.pass
        // });
        let res = {
            data: {
                success: true,
                user_id: 1
            }
        }
        await this.props.dispatch_login_action(res.data);
        if (res.data.success) {
            const url = new URL(document.location.href);
            const target = `${url.origin}/home`;
            document.location.href = target;
            // return true;
        }
    };

    redirectToLogin = () => {
        const url = new URL(document.location.href);
        const target = `${url.origin}/register`;
        document.location.href = target;
        document.getElementsByClassName('signup-image-link')[0].href = target;
    };

    render() {
        return (
            <div className='signup'>
                <div class="container">
                    <div class="signin-content">
                        <div class="signin-image">
                            <figure><img src="signin-image.jpg" alt="sign in" /></figure>
                            <a href="" onClick={this.redirectToLogin} class="signup-image-link">Create an account</a>
                        </div>
                        <div class="signin-form">
                            <h2 class="form-title">Sign in</h2>
                            <form class="register-form" id="login-form">
                                <div class="form-group">
                                    <img src="signup-email.png" />
                                    <input type="email" name="email" id="email" placeholder="Your Email" value={this.state.email} onChange={this.handleEmailInput} required />
                                </div>
                                <div class="form-group">
                                    <img src="signup-pass.png" />
                                    <input type="password" name="your_pass" id="your_pass" placeholder="Password" value={this.state.pass} onChange={this.handlePasswordInput} required />
                                </div>
                                <div class="form-group form-button">
                                    <input type="submit" onClick={this.handleSubmit} name="signin" id="signin" class="form-submit" value="Log in" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        dispatch_login_action: (data) => {
            dispatch({
                type: "SUBMITLOGIN",
                payload: data
            })
        }
    }
}
const mapStateToProps = state => ({
    user_id: state.user_id
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);
