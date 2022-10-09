import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardText, CardTitle, CardSubtitle, FormGroup, Form, Input } from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { WithContext as ReactTags } from 'react-tag-input';
import updateProfileAPI from '../API/updateProfile';
import getProfileAPI from '../API/getProfile';

/**
 * React component for showing user profile
 * @extends React.Component
 */
class Profile extends Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			codes: [],
			showPassword: false,
			user: {
				id: 1,
				name: '',
				email: '',
				phone: '',
				city: [],
				zipCodes: [],
				password: '',
				interests: []
			}
		};
	}

	/**
	 * Reload the original profile when Cancel button is clicked after edit operation
	 */
	cancelChange = async () => {
		await this.loadProfile();
		this.toggle();
	};

	/**
	 * Toggle modal display
	 */
	toggle = () => {
		this.setState({
			...this.state,
			modal: !this.state.modal
		});
	};

	/**
	 * Calls getProfileAPI API and get user profile details
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	loadProfile = async () => {
		let userId = JSON.parse(localStorage.getItem('userLogonDetails')).userId;
		let res = await getProfileAPI(userId);
		if (res.data && res.data.data) {
			this.setState({
				...this.state,
				user: {
					id: res.data.data.id,
					name: res.data.data.name,
					email: res.data.data.email,
					city: res.data.data.city,
					zipCodes: res.data.data.zipcode.map((code) => ({ id: code, text: code })),
					password: res.data.data.password,
					interests: res.data.data.interests
				},
			});
			return true;
		}
		alert('No response from the server');
		return false;
	};

	/**
	 * Toggle show password
	 * @param {Object} event onClick event on Show button
	 */
	togglePassword = (event) => {
		event.preventDefault();
		this.setState({
			...this.state,
			showPassword: !this.state.showPassword,
		});
	};

	/**
	 * Calls updateProfileAPI API to update the profile details
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	handleSave = async () => {
		let zipCodes = this.state.user.zipCodes.map((code) => (code.text));
		let res = await updateProfileAPI({ ...this.state.user, zipCodes });
		if (res.data && res.data.success) {
			alert('Profile updated successfully');
			await this.loadProfile();
			this.toggle();
			return true;
		}
		return false;
	};

	/**
	 * Update state with user entered values
	 * @param {Object} event Event sent for onChange event
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	handleChange = (event) => {
		this.setState({
			...this.state,
			user: {
				...this.state.user,
				[event.target.id]: event.target.value
			}
		});
		return true;
	};

	/**
	 * Add new zip codes to state
	 * @param {Object} event New zip code addition event
	 */
	handleAddition = (event) => {
		this.setState({
			user: { ...this.state.user, zipCodes: [...this.state.user.zipCodes, event] }
		});
	};

	/**
	 * Remove deleted zip code from state
	 * @param {Number} id Id of the item to be removed
	 */
	handleDelete = (id) => {
		this.setState({
			user: { ...this.state.user, zipCodes: this.state.user.zipCodes.filter((tag, index) => index !== id) }
		});
	};

	/**
	 * Store updated city into state
	 * @param {Object} event Event with new value for city
	 */
	handleCityChange = (event) => {
		let city = event.values.map(item => item.value);
		this.setState({
			user: {
				...this.state.user,
				city
			}
		});
	};

	// handleZipCodeChange = (event) => {
	// 	let zipCodes = event.values.map(item => item.text);
	// 	this.setState({
	// 		user: {
	// 			...this.state.user,
	// 			zipCodes
	// 		}
	// 	});
	// };

	/**
	 * Store updated city into state
	 * @param {Object} event Event with new value for interest
	 */
	handleInterestsChange = (event) => {
		let interests = event.values.map(item => item.value);
		this.setState({
			user: {
				...this.state.user,
				interests
			}
		});
	};

	/**
	 * Lifecycle method to trigger loading profile
	 */
	componentDidMount = async () => {
		await this.loadProfile();
	};

	/**
	 * Render Profile component
	 * @returns {React.Component} Profile card with edit button and modal to edit profile details
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
		return (
			<div>
				<Card
					style={{
						width: '18rem'
					}}
				>
					<img
						alt="Sample"
						src="https://picsum.photos/300/200"
					/>
					<CardBody>
						<CardTitle tag="h5">
							{this.state.user.name}
						</CardTitle>
						<CardSubtitle
							className="mb-2 text-muted"
							tag="h6"
						>
							{this.state.user.email}
						</CardSubtitle>
						<CardText>
							CItites: {this.state.user.city}
						</CardText>
						<Button color="danger" onClick={this.toggle}>
							Edit Profile
						</Button>
					</CardBody>
				</Card>

				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								{/* <Label> */}
								Name
								{/* </Label> */}
								<Input
									id="name"
									name="nam"
									placeholder="name"
									type="name"
									value={this.state.user.name}
									onChange={this.handleChange}
								/>
							</FormGroup>
							<FormGroup>
								{/* <Label for="password"> */}
								Password
								{/* </Label> */}
								<Input
									id="password"
									name="password"
									placeholder="password"
									type={this.state.showPassword ? 'text' : 'password'}
									value={this.state.user.password}
									onChange={this.handleChange}
								/>
								<button onClick={this.togglePassword}>Show</button>
							</FormGroup>
							<FormGroup>
								{/* <Label for="password"> */}
								Email
								{/* </Label> */}
								<Input
									id="email"
									name="email"
									type={'text'}
									value={this.state.user.email}
									readOnly={true}
								/>
							</FormGroup>
							<div className="form-group" style={{ overflow: 'unset' }}>
								{/* <img src="signup-city.png" alt='signup city' /> */}
								<Select
									closeMenuOnSelect={false}
									components={animatedComponents}
									isMulti
									options={cities}
									placeholder={'Your city'}
									maxMenuHeight={200}
									menuPlacement='top'
									name='city'
									onChange={(event) => this.handleCityChange({ values: event, name: 'city' })}
								/>
							</div>
							<div className="form-group">
								{/* <img src="signup-zip.png" alt='signup zip' /> */}
								<ReactTags
									name='zip'
									id='zip'
									placeholder='Your zip codes'
									tags={this.state.user.zipCodes}
									delimiters={delimiters}
									handleAddition={this.handleAddition}
									handleDelete={this.handleDelete}
									autofocus={false}
								/>
							</div>
							<div className="form-group" style={{ overflow: 'unset' }}>
								{/* <img src="signup-groceries.png" alt='signup items' /> */}
								<Select
									closeMenuOnSelect={false}
									components={animatedComponents}
									isMulti
									options={interestItems}
									placeholder={'Interested items'}
									maxMenuHeight={200}
									menuPlacement='top'
									name='interests'
									onChange={(event) => this.handleInterestsChange({ values: event, name: 'interests' })}
								/>
							</div>
							{/* <FormGroup>
                                <Label for="exampleFile">
                                    File
                                </Label>
                                <Input
                                    id="exampleFile"
                                    name="file"
                                    type="file"
                                />
                                <FormText>
                                    This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                                </FormText>
                            </FormGroup> */}
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.handleSave}>
							Save
						</Button>{' '}
						<Button color="secondary" onClick={this.cancelChange}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default Profile;
