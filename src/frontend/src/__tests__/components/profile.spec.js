import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../../components/profile';
import axios from '../../axios';

describe('profileComponent', () => {
	it('renders without crashing', () => {
		localStorage.setItem('userLogonDetails', JSON.stringify({ userId: 1, signInTime: new Date(), signInStatus: true }));
		const component = renderer.create(<Profile />);
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('initial state set correctly', () => {
		localStorage.setItem('userLogonDetails', JSON.stringify({ userId: 1, signInTime: new Date(), signInStatus: true }));
		const component = renderer.create(<Profile />);
		const expectedOutput = {
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
		const actualOutput = component.getInstance().state;
		expect(expectedOutput).toEqual(actualOutput);
	});

	it('cancelChange function updates state correctly', (done) => {
		localStorage.setItem('userLogonDetails', JSON.stringify({ userId: 1, signInTime: new Date(), signInStatus: true }));
		const component = renderer.create(<Profile />);
		component.getInstance().toggle = jest.fn();
		component.getInstance().loadProfile = jest.fn();
		component.getInstance().cancelChange().then(() => {
			expect(component.getInstance().toggle).toHaveBeenCalled();
			expect(component.getInstance().loadProfile).toHaveBeenCalled();
			done();
		}).catch((err) => {
			done(err);
		});
		// expect(component.getInstance().setState).toHaveBeenCalledWith(expectedOutput);

		// component.getInstance().setState = jest.fn();
		// // component.getInstance().cancelChange();
		// // component.getInstance().setState//).toHaveBeenCalledWith(expectedOutput);
		// component.getInstance().cancelChange({ preventDefault: () => { } }).then((val) => {
		// 	expect(val).toEqual(false);
		// 	expect(window.alert).toHaveBeenCalledWith('No response from the server');
		// 	// expect(component.getInstance().state.loading).toEqual(false);
		// 	done();
		// }).catch((err) => {
		// 	done(err);
		// });
	});

	it('toggle function updates state correctly', () => {
		localStorage.setItem('userLogonDetails', JSON.stringify({ userId: 1, signInTime: new Date(), signInStatus: true }));
		const component = renderer.create(<Profile />);
		const expectedOutput = {
			modal: true,
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
		component.getInstance().setState = jest.fn();
		component.getInstance().toggle();
		expect(component.getInstance().setState).toHaveBeenCalledWith(expectedOutput);
	});

	it('loadProfile function updates state correctly', (done) => {
		localStorage.setItem('userLogonDetails', JSON.stringify({ userId: 1, signInTime: new Date(), signInStatus: true }));
		const component = renderer.create(<Profile />);
		component.getInstance().setState = jest.fn();
		window.alert = jest.fn();
		const mockfn = () => {
			return Promise.resolve('test');
		};
		axios.get = mockfn;
		// component.getInstance().loadProfile();
		// expect(component.getInstance().setState).toHaveBeenCalledWith(expectedOutput);
		component.getInstance().loadProfile().then((val) => {
			expect(val).toEqual(false);
			expect(window.alert).toHaveBeenCalledWith('No response from the server');
			// expect(component.getInstance().state.loading).toEqual(false);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	// it('handleSubmit function returns false if itemName missing', (done) =>{
	//     const component = renderer.create(<Profile />);
	//     component.getInstance().setState({
	//         itemName: ''
	//     });
	//     component.getInstance().handleSubmit({}).then((val) => {
	//         expect(val).toEqual(false);
	//         done();
	//     }).catch((err) => {
	//         done(err);
	//     });
	// });

	// it('handleSubmit function returns false if itemDescription missing', (done) =>{
	//     const component = renderer.create(<Profile />);
	//     component.getInstance().setState({
	//         itemName: 'test',
	//         itemDescription: ''
	//     });
	//     component.getInstance().handleSubmit({}).then((val) => {
	//         expect(val).toEqual(false);
	//         done();
	//     }).catch((err) => {
	//         done(err);
	//     });
	// });

	// it('handleSubmit function returns false if itemZipCode missing', (done) =>{
	//     const component = renderer.create(<Profile />);
	//     component.getInstance().setState({
	//         itemName: 'test',
	//         itemDescription: 'test',
	//         itemZipCode: ''
	//     });
	//     component.getInstance().handleSubmit({}).then((val) => {
	//         expect(val).toEqual(false);
	//         done();
	//     }).catch((err) => {
	//         done(err);
	//     });
	// });

	// it('handleSubmit function returns false if itemCity missing', (done) =>{
	//     const component = renderer.create(<Profile />);
	//     window.alert = jest.fn();
	//     component.getInstance().setState({
	//         itemName: 'test',
	//         itemDescription: 'test',
	//         itemZipCode: 'test',
	//         itemCity: {}
	//     });
	//     component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
	//         expect(val).toEqual(false);
	//         expect(window.alert).toHaveBeenCalledWith('Missing value for city. Enter city for the item.');
	//         done();
	//     }).catch((err) => {
	//         done(err);
	//     });
	// });

	// it('handleSubmit function returns false if itemCategory missing', (done) =>{
	//     const component = renderer.create(<Profile />);
	//     window.alert = jest.fn();
	//     component.getInstance().setState({
	//         itemName: 'test',
	//         itemDescription: 'test',
	//         itemZipCode: 'test',
	//         itemCity: {test: 'test'}
	//     });
	//     component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
	//         expect(val).toEqual(false);
	//         expect(window.alert).toHaveBeenCalledWith('Missing value for category. Enter category for the item.');
	//         done();
	//     }).catch((err) => {
	//         done(err);
	//     });
	// });

	// it('handleSubmit function returns false if props do not exist', (done) =>{
	//     const component = renderer.create(<Profile />);
	//     component.getInstance().setState({
	//         itemName: 'test',
	//         itemDescription: 'test',
	//         itemZipCode: 'test',
	//         itemCity: {test: 'test'},
	//         itemCategory: {test: 'test'}
	//     });
	//     component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
	//         expect(val).toEqual(false);
	//         done();
	//     }).catch((err) => {
	//         done(err);
	//     });
	// });

	// it('handleSubmit function returns false if API calls fails - no error message', (done) =>{
	//     const props = {
	//         onAddItem: () => {},
	//         apiStatus: false
	//     };
	//     const component = renderer.create(<Profile props={props}/>);
	//     window.alert = jest.fn();
	//     component.getInstance().setState({
	//         itemName: 'test',
	//         itemDescription: 'test',
	//         itemZipCode: 'test',
	//         itemCity: {test: 'test'},
	//         itemCategory: {test: 'test'}
	//     });
	//     component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
	//         expect(val).toEqual(false);
	//         expect(window.alert).toHaveBeenCalledWith('Item addition could not complete. Please try again.');
	//         expect(component.getInstance().state.loading).toEqual(false);
	//         done();
	//     }).catch((err) => {
	//         done(err);
	//     });
	// });

	// it('handleSubmit function returns false if API calls fails - with error message', (done) =>{
	//     const props = {
	//         onAddItem: () => {},
	//         apiStatus: false,
	//         apiMessage: 'test'
	//     };
	//     const component = renderer.create(<Profile props={props}/>);
	//     window.alert = jest.fn();
	//     component.getInstance().setState({
	//         itemName: 'test',
	//         itemDescription: 'test',
	//         itemZipCode: 'test',
	//         itemCity: {test: 'test'},
	//         itemCategory: {test: 'test'}
	//     });
	//     component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
	//         expect(val).toEqual(false);
	//         expect(window.alert).toHaveBeenCalledWith('test');
	//         expect(component.getInstance().state.loading).toEqual(false);
	//         done();
	//     }).catch((err) => {
	//         done(err);
	//     });
	// });

	// it('handleSubmit function returns true if API calls succeeds', (done) =>{
	//     const props = {
	//         onAddItem: () => {},
	//         apiStatus: true
	//     };
	//     const component = renderer.create(<Profile props={props}/>);
	//     window.alert = jest.fn();
	//     component.getInstance().setState({
	//         itemName: 'test',
	//         itemDescription: 'test',
	//         itemZipCode: 'test',
	//         itemCity: {test: 'test'},
	//         itemCategory: {test: 'test'}
	//     });
	//     component.getInstance().redirectToPath = jest.fn();
	//     component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
	//         expect(val).toEqual(true);
	//         expect(component.getInstance().state.loading).toEqual(true);
	//         done();
	//     }).catch((err) => {
	//         done(err);
	//     });
	// });

	// it('state updates when itemName input value changes', () => {
	//     const props = {
	//         onAddItem: () => {},
	//         apiStatus: true
	//     };
	//     const onChangeInput = {
	//         type: 'change',
	//         target: {
	//             id: 'itemName',
	//             value: 'test1'
	//         }
	//     };
	//     const component = renderer.create(<Profile props={props}/>);
	//     component.root.findAllByType('input')[0].props.onChange(onChangeInput);
	//     expect(component.getInstance().state.itemName).toEqual('test1');
	// });

	// it('state updates when itemDescription input value changes', () => {
	//     const props = {
	//         onAddItem: () => {},
	//         apiStatus: true
	//     };
	//     const onChangeInput = {
	//         type: 'change',
	//         target: {
	//             id: 'itemDescription',
	//             value: 'test1'
	//         }
	//     };
	//     const component = renderer.create(<Profile props={props}/>);
	//     component.root.findAllByType('textarea')[0].props.onChange(onChangeInput);
	//     expect(component.getInstance().state.itemDescription).toEqual('test1');
	// });

	// it('state updates when itemZipCode input value changes', () => {
	//     const props = {
	//         onAddItem: () => {},
	//         apiStatus: true
	//     };
	//     const onChangeInput = {
	//         type: 'change',
	//         target: {
	//             id: 'itemZipCode',
	//             value: 'test1'
	//         }
	//     };
	//     const component = renderer.create(<Profile props={props}/>);
	//     component.root.findAllByType('input')[1].props.onChange(onChangeInput);
	//     expect(component.getInstance().state.itemZipCode).toEqual('test1');
	// });

	// it('state updates when itemCity input value changes', () => {
	//     const props = {
	//         onAddItem: () => {},
	//         apiStatus: true
	//     };
	//     const onChangeInput = {
	//         type: 'change',
	//         target: {
	//             id: 'itemCity',
	//             value: 'test1'
	//         }
	//     };
	//     const component = renderer.create(<Profile props={props}/>);
	//     component.root.findAllByType('input')[1].props.onChange(onChangeInput);
	//     expect(component.getInstance().state.itemCity).toEqual('test1');
	// });

	// it('state updates when itemCategory input value changes', () => {
	//     const props = {
	//         onAddItem: () => {},
	//         apiStatus: true
	//     };
	//     const onChangeInput = {
	//         type: 'change',
	//         target: {
	//             id: 'itemCategory',
	//             value: 'test1'
	//         }
	//     };
	//     const component = renderer.create(<Profile props={props}/>);
	//     component.root.findAllByType('input')[1].props.onChange(onChangeInput);
	//     expect(component.getInstance().state.itemCategory).toEqual('test1');
	// });

	// it('renders spinner when loading is true', () => {
	//     const props = {
	//         onAddItem: () => {},
	//         apiStatus: true
	//     };
	//     const component = renderer.create(<Profile props={props}/>);
	//     component.getInstance().setState({
	//         loading: true
	//     });
	//     let spinner = component.root.findAllByType('span').filter((comp) => comp.props && comp.props.className === 'visually-hidden');
	//     expect(spinner && spinner[0] && spinner[0].props && spinner[0].props.children).toEqual('Loading...');
	// });

	// it('renders input when loading is false', (done) => {
	//     const props = {
	//         onAddItem: () => {},
	//         apiStatus: true
	//     };
	//     const component = renderer.create(<Profile props={props}/>);
	//     component.root.findAllByType('input')[6].props.onClick().then((val) => {
	//         expect(val).toEqual(false);
	//         done();
	//     }).catch((err) => {
	//         done(err);
	//     });
	// });
});
