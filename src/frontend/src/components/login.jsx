import React from 'react';


class LoginUser extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        return true;
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
                            <figure><img src="signin-image.jpg" alt="sign in"/></figure>
                            <a href="" onClick={this.redirectToLogin} class="signup-image-link">Create an account</a>
                        </div>
                        <div class="signin-form">
                            <h2 class="form-title">Sign in</h2>
                            <form class="register-form" id="login-form">
                                <div class="form-group">
                                    <img src="signup-email.png"/>
                                    <input type="email" name="email" id="email" placeholder="Your Email" required/>
                                </div>
                                <div class="form-group">
                                    <img src="signup-pass.png"/>
                                    <input type="password" name="your_pass" id="your_pass" placeholder="Password" required/>
                                </div>
                                <div class="form-group form-button">
                                    <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginUser;
