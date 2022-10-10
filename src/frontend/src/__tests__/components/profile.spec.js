import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../../components/profile';
import axios from '../../axios';

describe('profileComponent', () => {
	it('renders without crashing', () => {
		localStorage.setItem('userLogonDetails', JSON.stringify({ userId: 1, signInTime: new Date(), signInStatus: true }));
		const component = renderer.create(<Profile props={{userId: 1}} />);
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('initial state set correctly', () => {
		localStorage.setItem('userLogonDetails', JSON.stringify({ userId: 1, signInTime: new Date(), signInStatus: true }));
		const component = renderer.create(<Profile props={{userId: 1}} />);
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
		const component = renderer.create(<Profile props={{userId: 1}} />);
		component.getInstance().toggle = jest.fn();
		component.getInstance().loadProfile = jest.fn();
		component.getInstance().cancelChange().then(() => {
			expect(component.getInstance().toggle).toHaveBeenCalled();
			expect(component.getInstance().loadProfile).toHaveBeenCalled();
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('toggle function updates state correctly', () => {
		localStorage.setItem('userLogonDetails', JSON.stringify({ userId: 1, signInTime: new Date(), signInStatus: true }));
		const component = renderer.create(<Profile props={{userId: 1}} />);
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
		const component = renderer.create(<Profile props={{userId: 1}} />);
		component.getInstance().setState = jest.fn();
		window.alert = jest.fn();
		const mockfn = () => {
			return Promise.resolve('test');
		};
		axios.get = mockfn;
		component.getInstance().loadProfile().then((val) => {
			expect(val).toEqual(false);
			expect(window.alert).toHaveBeenCalledWith('No response from the server');
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('togglePassword function updates state correctly', () => {
		localStorage.setItem('userLogonDetails', JSON.stringify({ userId: 1, signInTime: new Date(), signInStatus: true }));
		const component = renderer.create(<Profile props={{userId: 1}} />);
		const expectedOutput = {
			modal: false,
			codes: [],
			showPassword: true,
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
		component.getInstance().preventDefault = jest.fn();
		component.getInstance().togglePassword({ preventDefault: () => { } });
		expect(component.getInstance().setState).toHaveBeenCalledWith(expectedOutput);
	});

	it('handleSave function updates state correctly', (done) => {
		localStorage.setItem('userLogonDetails', JSON.stringify({ userId: 1, signInTime: new Date(), signInStatus: true }));
		const component = renderer.create(<Profile props={{userId: 1}} />);
		component.getInstance().setState = jest.fn();
		window.alert = jest.fn();
		const mockfn = () => {
			return Promise.resolve('test');
		};
		axios.put = mockfn;
		component.getInstance().handleSave().then((val) => {
			expect(val).toEqual(false);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('handleChange function updates state correctly', () => {
		const component = renderer.create(<Profile props={{userId: 1}} />);
		const expectedOutput = {
			modal: false,
			codes: [],
			showPassword: false,
			user: {
				id: 1,
				name: 'test',
				email: '',
				phone: '',
				city: [],
				zipCodes: [],
				password: '',
				interests: []
			}
		};
		const input = {
			target: {
				id: 'name',
				value: 'test'
			}
		};
		component.getInstance().setState = jest.fn();
		component.getInstance().handleChange(input);
		expect(component.getInstance().setState).toHaveBeenCalledWith(expectedOutput);
	});

	it('handleAddition function updates state correctly', () => {
		const component = renderer.create(<Profile props={{userId: 1}} />);
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
				zipCodes: [
					{
						id: '12345',
						text: '12345'
					}
				],
				password: '',
				interests: []
			}
		};
		const input = {
			id: '12345',
			text: '12345'
		};
		component.getInstance().handleAddition(input);
		expect(component.getInstance().state).toEqual(expectedOutput);
	});

	it('handleCityChange function updates state correctly', () => {
		const component = renderer.create(<Profile props={{userId: 1}} />);
		const expectedOutput = {
			modal: false,
			codes: [],
			showPassword: false,
			user: {
				id: 1,
				name: '',
				email: '',
				phone: '',
				city: ['durham'],
				zipCodes: [],
				password: '',
				interests: []
			}
		};
		const input = {
			values: [{
				id: 'city',
				value: 'durham'
			}]
		};
		component.getInstance().handleCityChange(input);
		expect(component.getInstance().state).toEqual(expectedOutput);
	});

	it('handleInterestsChange function updates state correctly', () => {
		const component = renderer.create(<Profile props={{userId: 1}} />);
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
				interests: ['Table']
			}
		};
		const input = {
			values: [{
				id: 'interests',
				value: 'Table'
			}]
		};
		component.getInstance().handleInterestsChange(input);
		expect(component.getInstance().state).toEqual(expectedOutput);
	});
});
