import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';


class LoginUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: '',
			loginSuccess: false,
			loading: false
		};
	}

	handleInput = (event) => {
		if (event.type === 'change') {
			if (event.target) {
				this.setState({
					[event.target.id]: event.target.value
				});
			}
		}
	};

	handleSubmit = async (event) => {
		const keys = ['email', 'pass'];
		for (let i = 0; i < keys.length; i++) {
			if (this.state[keys[i]] === '') return false;
		}
		event.preventDefault();
		const emailRegex = new RegExp('\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})');
		if (!this.state.email.match(emailRegex)) {
			alert('Email format not correct. Enter email in correct format');
			return false;
		}
		if (Object.keys(this.props).length > 0) {
			const apiInput = {
				email: this.state.email,
				pass: this.state.pass
			};
			this.setState({
				loading: true
			});
			await this.props.onSubmitLogin(apiInput);
			if (this.props.userId && this.props.apiStatus) {
				this.setState({
					loginSuccess: true
				});
				return true;
			} else {
				this.setState({
					loading: false
				});
				alert(this.props.apiMessage || 'Invalid email or password. Enter correct email and password, and try again.');
				return false;
			}
		}
		return false;
	};

	redirectToPath = (path) => {
		const url = new URL(document.location.href);
		const target = `${url.origin}${path}`;
		document.location.href = target;
		document.getElementsByClassName('signup-image-link')[0].href = target;
	};

	render() {
		return (
			<section>
				{this.state.loginSuccess ? <Navigate to={'/home'}/> : <div className='signup'>
					<div className="container">
						<div className="signin-content">
							<div className="signin-image">
								<figure><img src="signin-image.jpg" alt="sign in" /></figure>
								<a href="" onClick={() => this.redirectToPath('/register')} className="signup-image-link">Create an account</a>
							</div>
							<div className="signin-form">
								<h2 className="form-title">Sign in</h2>
								<form className="register-form" id="login-form">
									<div className="form-group">
										<img src="signup-email.png" alt="signin email" />
										<input autoFocus type="email" name="email" id="email" placeholder="Your Email" value={this.state.email} onChange={this.handleInput} required />
									</div>
									<div className="form-group">
										<img src="signup-pass.png" alt="signin password" />
										<input type="password" name="pass" id="pass" placeholder="Password" value={this.state.pass} onChange={this.handleInput} required />
									</div>
									<div className="form-group form-button">
										{this.state.loading ? <Spinner/> : <input type="submit" onClick={this.handleSubmit} name="signin" id="signin" className="form-submit" value="Log in"/>}
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>}
			</section>
		);
	}
}

export default LoginUser;
