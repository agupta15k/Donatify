import renderer from 'react-test-renderer';
import RegisterUser from '../../components/register';
import React from 'react';

describe('registerUserComponent', () => {
	it('renders without crashing', () => {
		const component = renderer.create(<RegisterUser />);
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('initial state set correctly', () => {
		const component = renderer.create(<RegisterUser />);
		const expectedOutput = {
			name: '',
			email: '',
			pass: '',
			rePass: '',
			cities: [],
			zipCodes: [],
			interests: []
		};
		const actualOutput = component.getInstance().state;
		expect(expectedOutput).toEqual(actualOutput);
	});

	it('handleInput function updates state correctly - input', () => {
		const component = renderer.create(<RegisterUser />);
		const expectedOutput = {
			name: '',
			email: 'test@test.com',
			pass: '',
			rePass: '',
			cities: [],
			zipCodes: [],
			interests: []
		};
		const input = {
			type: 'change',
			target: {
				id: 'email',
				value: 'test@test.com'
			}
		};
		component.getInstance().handleInput(input);
		const actualOutput = component.getInstance().state;
		expect(expectedOutput).toEqual(actualOutput);
	});

	it('handleInput function updates state correctly - dropdown', () => {
		const component = renderer.create(<RegisterUser />);
		const expectedOutput = {
			name: '',
			email: '',
			pass: '',
			rePass: '',
			cities: ['test'],
			zipCodes: [],
			interests: []
		};
		const input = {
			name: 'cities',
			values: ['test']
		};
		component.getInstance().handleInput(input);
		const actualOutput = component.getInstance().state;
		expect(expectedOutput).toEqual(actualOutput);
	});

	it('handleAddition function updates state correctly', () => {
		const component = renderer.create(<RegisterUser />);
		const expectedOutput = {
			name: '',
			email: '',
			pass: '',
			rePass: '',
			cities: [],
			zipCodes: [{
				id: 'test',
				text: 'test'
			}],
			interests: []
		};
		const input = {
			id: 'test',
			text: 'test'
		};
		component.getInstance().handleAddition(input);
		const actualOutput = component.getInstance().state;
		expect(expectedOutput).toEqual(actualOutput);
	});

	it('handleDelete function updates state correctly', () => {
		const component = renderer.create(<RegisterUser />);
		const expectedOutput = {
			name: '',
			email: '',
			pass: '',
			rePass: '',
			cities: [],
			zipCodes: [],
			interests: []
		};
		component.getInstance().setState({
			zipCodes: [{
				id: 'test',
				text: 'test'
			}]
		});
		component.getInstance().handleDelete(0);
		const actualOutput = component.getInstance().state;
		expect(expectedOutput).toEqual(actualOutput);
	});

	it('handleSubmit function returns false if name missing', (done) =>{
		const component = renderer.create(<RegisterUser />);
		component.getInstance().setState({
			name: ''
		});
		component.getInstance().handleSubmit({}).then((val) => {
			expect(val).toEqual(false);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleSubmit function returns false if email missing', (done) =>{
		const component = renderer.create(<RegisterUser />);
		component.getInstance().setState({
			name: 'test',
			email: ''
		});
		component.getInstance().handleSubmit({}).then((val) => {
			expect(val).toEqual(false);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleSubmit function returns false if pass missing', (done) =>{
		const component = renderer.create(<RegisterUser />);
		component.getInstance().setState({
			name: 'test',
			email: 'test@test.com',
			pass: ''
		});
		component.getInstance().handleSubmit({}).then((val) => {
			expect(val).toEqual(false);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleSubmit function returns false if rePass missing', (done) =>{
		const component = renderer.create(<RegisterUser />);
		component.getInstance().setState({
			name: 'test',
			email: 'test@test.com',
			pass: 'test',
			rePass: ''
		});
		component.getInstance().handleSubmit({}).then((val) => {
			expect(val).toEqual(false);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleSubmit function returns false if email is not correctly formatted', (done) =>{
		const component = renderer.create(<RegisterUser />);
		window.alert = jest.fn();
		component.getInstance().setState({
			name: 'test',
			email: 'test',
			pass: 'test',
			rePass: 'test'
		});
		component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
			expect(val).toEqual(false);
			expect(window.alert).toHaveBeenCalledWith('Email format not correct. Enter email in correct format');
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleSubmit function returns false if pass is not equal to rePass', (done) =>{
		const component = renderer.create(<RegisterUser />);
		window.alert = jest.fn();
		component.getInstance().setState({
			name: 'test',
			email: 'test@test.com',
			pass: 'test',
			rePass: 'test1'
		});
		component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
			expect(val).toEqual(false);
			expect(window.alert).toHaveBeenCalledWith('Password does not match the confirmation. Ensure to enter matching passwords');
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleSubmit function returns false if cities list is empty', (done) =>{
		const component = renderer.create(<RegisterUser />);
		window.alert = jest.fn();
		component.getInstance().setState({
			name: 'test',
			email: 'test@test.com',
			pass: 'test',
			rePass: 'test',
			cities: []
		});
		component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
			expect(val).toEqual(false);
			expect(window.alert).toHaveBeenCalledWith('Missing values for city. Enter your city.');
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleSubmit function returns false if zipCodes list is empty', (done) =>{
		const component = renderer.create(<RegisterUser />);
		window.alert = jest.fn();
		component.getInstance().setState({
			name: 'test',
			email: 'test@test.com',
			pass: 'test',
			rePass: 'test',
			cities: [{
				label: 'test',
				value: 'test'
			}],
			zipCodes: []
		});
		component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
			expect(val).toEqual(false);
			expect(window.alert).toHaveBeenCalledWith('Missing values for zip codes. Enter your zip code.');
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleSubmit function returns false if props do not exist', (done) =>{
		const component = renderer.create(<RegisterUser />);
		component.getInstance().setState({
			name: 'test',
			email: 'test@test.com',
			pass: 'test',
			rePass: 'test',
			cities: [{
				label: 'test',
				value: 'test'
			}],
			zipCodes: [{
				id: 'test',
				text: 'test'
			}]
		});
		component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
			expect(val).toEqual(false);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleSubmit function returns false if API calls fails - no error message', (done) =>{
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={false}/>);
		window.alert = jest.fn();
		component.getInstance().setState({
			name: 'test',
			email: 'test@test.com',
			pass: 'test',
			rePass: 'test',
			cities: [{
				label: 'test',
				value: 'test'
			}],
			zipCodes: [{
				id: 'test',
				text: 'test'
			}]
		});
		component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
			expect(val).toEqual(false);
			expect(window.alert).toHaveBeenCalledWith('User creation could not complete. Please try again.');
			expect(component.getInstance().state.loading).toEqual(false);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleSubmit function returns false if API calls fails - with error message', (done) =>{
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={false} apiMessage={'test'}/>);
		window.alert = jest.fn();
		component.getInstance().setState({
			name: 'test',
			email: 'test@test.com',
			pass: 'test',
			rePass: 'test',
			cities: [{
				label: 'test',
				value: 'test'
			}],
			zipCodes: [{
				id: 'test',
				text: 'test'
			}]
		});
		component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
			expect(val).toEqual(false);
			expect(window.alert).toHaveBeenCalledWith('test');
			expect(component.getInstance().state.loading).toEqual(false);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleSubmit function returns true if API calls succeeds', (done) =>{
		const mockFn = jest.fn();
		const currentState = {
			name: 'test',
			email: 'test@test.com',
			pass: 'test',
			rePass: 'test',
			cities: [{
				label: 'test',
				value: 'test'
			}],
			zipCodes: [{
				id: 'test',
				text: 'test'
			}],
			interests: [{
				label: 'test',
				value: 'test'
			}]
		};
		const expectedOutput = {
			name: 'test',
			email: 'test@test.com',
			pass: 'test',
			rePass: 'test',
			cities: ['test'],
			zipCodes: ['test'],
			interests: ['test']
		};
		const component = renderer.create(<RegisterUser onSubmitRegister={mockFn} apiStatus={true}/>);
		window.alert = jest.fn();
		component.getInstance().setState(currentState);
		component.getInstance().redirectToPath = jest.fn();
		component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
			expect(val).toEqual(true);
			expect(component.getInstance().state.loading).toEqual(true);
			expect(mockFn).toHaveBeenCalledWith(expectedOutput);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('redirect function updates state correctly', () => {
		const component = renderer.create(<RegisterUser />);
		document.getElementsByClassName = () => {
			return [{
				href: ''
			}];
		};
		component.getInstance().redirectToPath('/');
		expect(document.location.href).toEqual('http://localhost/');
	});

	it('state updates when name input value changes', () => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		const onChangeInput = {
			type: 'change',
			target: {
				id: 'name',
				value: 'test1'
			}
		};
		component.root.findAllByType('input')[0].props.onChange(onChangeInput);
		expect(component.getInstance().state.name).toEqual('test1');
	});

	it('state updates when email input value changes', () => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		const onChangeInput = {
			type: 'change',
			target: {
				id: 'email',
				value: 'test1'
			}
		};
		component.root.findAllByType('input')[1].props.onChange(onChangeInput);
		expect(component.getInstance().state.email).toEqual('test1');
	});

	it('state updates when pass input value changes', () => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		const onChangeInput = {
			type: 'change',
			target: {
				id: 'pass',
				value: 'test1'
			}
		};
		component.root.findAllByType('input')[2].props.onChange(onChangeInput);
		expect(component.getInstance().state.pass).toEqual('test1');
	});

	it('state updates when rePass input value changes', () => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		const onChangeInput = {
			type: 'change',
			target: {
				id: 'rePass',
				value: 'test1'
			}
		};
		component.root.findAllByType('input')[3].props.onChange(onChangeInput);
		expect(component.getInstance().state.rePass).toEqual('test1');
	});

	it('rePass class changes when rePass does not match pass', () => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		component.getInstance().setState({
			name: 'test',
			email: 'test@test.com',
			pass: 'test',
			rePass: 'test1',
			cities: [{
				label: 'test',
				value: 'test'
			}],
			zipCodes: [{
				id: 'test',
				text: 'test'
			}],
			interests: [{
				label: 'test',
				value: 'test'
			}]
		});
		expect(component.root.findAllByType('input')[3].props.className).toEqual('error');
	});

	it('state updates when cities value changes', () => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		const onChangeInput = {
			type: 'change',
			target: {
				id: 'cities',
				value: 'test1'
			}
		};
		component.root.findAllByType('input')[3].props.onChange(onChangeInput);
		expect(component.getInstance().state.cities).toEqual('test1');
	});

	it('state updates when zipCodes value changes', () => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		const onChangeInput = {
			type: 'change',
			target: {
				id: 'zipCodes',
				value: [{id: 'test1', text: 'test1'}]
			}
		};
		component.root.findAllByType('input')[3].props.onChange(onChangeInput);
		expect(component.getInstance().state.zipCodes).toEqual([{id: 'test1', text: 'test1'}]);
	});

	it('state updates when interests value changes', () => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		const onChangeInput = {
			type: 'change',
			target: {
				id: 'interests',
				value: 'test1'
			}
		};
		component.root.findAllByType('input')[3].props.onChange(onChangeInput);
		expect(component.getInstance().state.interests).toEqual('test1');
	});

	it('renders spinner when loading is true', () => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		component.getInstance().setState({
			loading: true
		});
		let spinner = component.root.findAllByType('span').filter((comp) => comp.props && comp.props.className === 'visually-hidden');
		expect(spinner && spinner[0] && spinner[0].props && spinner[0].props.children).toEqual('Loading...');
	});

	it('renders input when loading is false', (done) => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		component.root.findAllByType('input')[9].props.onClick().then((val) => {
			expect(val).toEqual(false);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('renders login button correctly', () => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		component.getInstance().redirectToPath = jest.fn();
		component.root.findAllByType('a')[0].props.onClick();
		expect(component.root.findAllByType('a')[0].props.className).toEqual('signup-image-link');
		expect(component.getInstance().redirectToPath).toHaveBeenCalledWith('/');
	});

	it('renders images correctly', () => {
		const component = renderer.create(<RegisterUser onSubmitRegister={() => {}} apiStatus={true}/>);
		expect(component.root.findAllByType('img')[0].props.src).toEqual('signup-name.png');
		expect(component.root.findAllByType('img')[1].props.src).toEqual('signup-email.png');
		expect(component.root.findAllByType('img')[2].props.src).toEqual('signup-pass.png');
		expect(component.root.findAllByType('img')[3].props.src).toEqual('signup-repass.png');
		expect(component.root.findAllByType('img')[4].props.src).toEqual('signup-city.png');
		expect(component.root.findAllByType('img')[5].props.src).toEqual('signup-zip.png');
		expect(component.root.findAllByType('img')[6].props.src).toEqual('signup-groceries.png');
		expect(component.root.findAllByType('img')[7].props.src).toEqual('signup-image.png');
	});
});
