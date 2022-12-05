import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { WithContext as ReactTags } from 'react-tag-input';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { json } from 'react-router-dom';

/**
 * React component for RegisterUser
 * @extends React.Component
 */
class RegisterUser extends React.Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
	constructor(props) {
		super(props);
		this.state = {
			otpbtn: 'Verify OTP',
			mailbtn: 'Send OTP',
			name: '',
			email: '',
			otp:'',
			genotp:'',
			pass: '',
			rePass: '',
			cities: [],
			zipCodes: [],
			interests: [],
		};
	}

	/**
	 * Update state with user entered values
	 * @param {Object} event Event sent for onChange event
	 */
	handleInput = (event) => {
		if (event.type === 'change') {
			if (event.target) {
				this.setState({
					[event.target.id]: event.target.value
				});
			}
		} else {
			this.setState({
				[event.name]: event.values
			});
		}
	};

	/**
	 * Add new zip codes to state
	 * @param {Object} event New zip code addition event
	 */
	handleAddition = (event) => {
		this.setState({
			zipCodes: [...this.state.zipCodes, event]
		});
	};

	/**
	 * Remove deleted zip code from state
	 * @param {Number} id Id of the item to be removed
	 */
	handleDelete = (id) => {
		this.setState({
			zipCodes: this.state.zipCodes.filter((tag, index) => index !== id)
		});
	};

	/**
	 * Validate input values and call onSubmitRegister API to register new user
	 * @param {Object} event Button click event
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	handleSubmit = async (event) => {
		const keys = ['name', 'email', 'pass', 'rePass'];
		for (let i = 0; i < keys.length; i++) {
			if (this.state[keys[i]] === '') return false;
		}
		event.preventDefault();
		const emailRegex = new RegExp('\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})');
		if (!this.state.email.match(emailRegex)) {
			alert('Email format not correct. Enter email in correct format');
			return false;
		}
		if (this.state.pass !== this.state.rePass) {
			alert('Password does not match the confirmation. Ensure to enter matching passwords');
			return false;
		}
		if (this.state.cities.length === 0) {
			alert('Missing values for city. Enter your city.');
			return false;
		}
		if (this.state.zipCodes.length === 0) {
			alert('Missing values for zip codes. Enter your zip code.');
			return false;
		}
		if (Object.keys(this.props).length > 0) {
			const apiInput = {
				name: this.state.name,
				email: this.state.email,
				pass: this.state.pass,
				rePass: this.state.rePass,
				cities: this.state.cities.map((city) => city.value),
				zipCodes: this.state.zipCodes.map((zipCode) => zipCode.id),
				interests: this.state.interests.map((interest) => interest.value)
			};
			this.setState({
				loading: true
			});
			await this.props.onSubmitRegister(apiInput);
			if (this.props.apiStatus) {
				this.redirectToPath('/');
				return true;
			} else {
				alert(this.props.apiMessage || 'User creation could not complete. Please try again.');
				this.setState({
					loading: false
				});
				return false;
			}
		}
		return false;
	};

	/**
	 * Redirect to specified path
	 * @param {String} path Path to redirect
	 */
	redirectToPath = (path) => {
		const url = new URL(document.location.href);
		document.location.href = `${url.origin}${path}`;
		document.getElementsByClassName('signup-image-link')[0].href = url.origin;
	};

	genOTP = async () => {
		var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		let OTP = '';
		var len = string.length;
		for (let i = 0; i < 6; i++ ) {
			var char = string[Math.floor(Math.random() * len)];
			OTP = OTP + char;
		}
		this.setState({genotp: OTP});
	};

	sendOTP = async(e) => {
		e.preventDefault();
		// const OTP = await this.genOTP();
		// this.setState({genotp: OTP});
		if(this.state.email === ''){
			alert('Please enter the mail ID and retry.');
			return;
		}
		const emailRegex = new RegExp('\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})');
		if (!this.state.email.match(emailRegex)) {
			alert('Email format not correct. Enter email in correct format');
			return;
		}
		this.setState({mailbtn: 'Sending mail...'});
		await this.genOTP();
		console.log('genotp',this.state.genotp);
		var data = {
			'mail': this.state.email,
			'otp': this.state.genotp
		};
		let response = await fetch('http://localhost:5001/getOTP', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify(data),
		});
		let res = await response.json();
		this.setState({mailbtn: 'Resend mail'});
		if(res.status !== 200)
			alert('OTP not sent. Please try again.');
		return res;
	};
	authOTP = () => {
		console.log('genotp',this.state.genotp);
		console.log('otp', this.state.otp);
		if(this.state.genotp === this.state.otp){
			console.log('success');
			this.setState({otpbtn: 'OTP verified'});
		}
		else{
			alert('Invalid OTP. Please try again.');
		}
	};

	/**
	 * Render RegisterUser component
	 * @returns {React.Component} Form with register user related HTML tags
	 */
	render() {
		const cities = [
			{
				label: 'Raleigh',
				value: 'raleigh'
			},
			{
				label: 'Cary',
				value: 'cary'
			},
			{
				label: 'Durham',
				value: 'durham'
			}
		];
		const interestItems = [
			{
				label: 'Fruits',
				value: 'fruits'
			},
			{
				label: 'Vegetables',
				value: 'vegetables'
			},
			{
				label: 'Table',
				value: 'table'
			},
			{
				label: 'Chair',
				value: 'chair'
			},
			{
				label: 'Chair1',
				value: 'chair1'
			},
			{
				label: 'Chair2',
				value: 'chair2'
			}
		];
		const animatedComponents = makeAnimated();
		const keyCodes = {
			comma: 188,
			enter: 13,
		};
		const delimiters = [keyCodes.comma, keyCodes.enter];
		const Button = styled.button`
		background-color: blue;
		color: white;
		font-size: 12px;
		padding: 8px 8px;
		border-radius: 5px;
		margin: 5px 0px;
		cursor: pointer;
		`;
		return (
			<div className='signup'>
				<div className="container">
					<div className="signup-content">
						<div className="signup-form">
							<h2 className="form-title">Sign up</h2>
							<form className="register-form" id="register-form">
								<div className="form-group">
									<img src="signup-name.png" alt='signup name'/>
									<input autoFocus type="text" name="name" id="name" placeholder="Your Name" value={this.state.name} onChange={this.handleInput} required/>
								</div>
								<div className="form-group">
									<img src="signup-email.png" alt='signup enail'/>
									<input type="email" name="email" id="email" placeholder="Your Email" value={this.state.email} onChange={this.handleInput} required/>
								</div>
								<div><Button onClick={this.sendOTP}>
									{this.state.mailbtn}
								</Button></div>
								<div className="form-group">
									<img src="OTP-email.png" alt='OTP for the email'/>
									<input type="text" name="otp" id="otp" placeholder="Please enter the received OTP" value={this.state.otp} onChange={this.handleInput} required/>
								</div>
								<div><Button onClick={this.authOTP}>
									{this.state.otpbtn}
								</Button></div>
								<div className="form-group">
									<img src="signup-pass.png" alt='signup password'/>
									<input type="password" name="pass" id="pass" placeholder="Password" value={this.state.pass} onChange={this.handleInput} required/>
								</div>
								<div className="form-group">
									<img src="signup-repass.png" alt='signup repeat password'/>
									<input type="password" className={this.state.pass !== this.state.rePass ? 'error' : ''} name="rePass" id="rePass" placeholder="Repeat your password" value={this.state.rePass} onChange={this.handleInput} required/>
								</div>
								<div className="form-group" style={{overflow: 'unset'}}>
									<img src="signup-city.png" alt='signup city'/>
									<Select
										closeMenuOnSelect={false}
										components={animatedComponents}
										isMulti
										options={cities}
										placeholder={'Your city'}
										maxMenuHeight={200}
										menuPlacement='top'
										name='city'
										onChange={(event) => this.handleInput({values: event, name: 'cities'})}
									/>
								</div>
								<div className="form-group">
									<img src="signup-zip.png" alt='signup zip'/>
									<ReactTags
										name='zip'
										id='zip'
										placeholder='Your zip codes'
										tags={this.state.zipCodes}
										delimiters={delimiters}
										handleAddition={this.handleAddition}
										handleDelete={this.handleDelete}
										autofocus={false}
									/>
								</div>
								<div className="form-group" style={{overflow: 'unset'}}>
									<img src="signup-groceries.png" alt='signup items'/>
									<Select
										closeMenuOnSelect={false}
										components={animatedComponents}
										isMulti
										options={interestItems}
										placeholder={'Interested items'}
										maxMenuHeight={200}
										menuPlacement='top'
										name='interests'
										onChange={(event) => this.handleInput({values: event, name: 'interests'})}
									/>
								</div>
								{/* <div className="form-group">
									<input type="checkbox" name="agree-term" id="agree-term" className="agree-term" required/>
									<label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in <a className="term-service">Terms of service</a></label>
								</div> */}
								<div className="form-group form-button">
									{this.state.loading ? <Spinner /> : <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={this.handleSubmit}/>}
								</div>
							</form>
						</div>
						<div className="signup-image">
							<figure><img src="signup-image.png" alt="sign up"/></figure>
							<a href="" onClick={() => this.redirectToPath('/')} className="signup-image-link">I am already a member</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RegisterUser;
