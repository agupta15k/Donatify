import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../../components/home';

describe('homeComponent', () => {
	it('renders without crashing', () => {
		localStorage.setItem('userLogonDetails', JSON.stringify({ userId: 1, signInTime: new Date(), signInStatus: true }));
		const component = renderer.create(<Home />);
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('initial state set correctly', () => {
		localStorage.setItem('userLogonDetails', JSON.stringify({}));
		const component = renderer.create(<Home />);
		const expectedOutput = {
			collapsed: true,
			content: '',
			userLogonDetails: {}
		};
		const actualOutput = component.getInstance().state;
		expect(expectedOutput).toEqual(actualOutput);
	});

	it('setCollapsed function updates state correctly', () => {
		localStorage.setItem('userLogonDetails', JSON.stringify({}));
		const component = renderer.create(<Home />);
		const expectedOutput = {
			collapsed: false,
			content: '',
			userLogonDetails: {}
		};
		// component.getInstance().setState = jest.fn();
		component.getInstance().setCollapsed();
		const actualOutput = component.getInstance().state;
		expect(expectedOutput).toEqual(actualOutput);
		// expect(component.getInstance().setState).toHaveBeenCalledWith(expectedOutput);
	});

	it('setContent function updates state correctly', () => {
		localStorage.setItem('userLogonDetails', JSON.stringify({}));
		const component = renderer.create(<Home />);
		const expectedOutput ={
			collapsed: true,
			content: 'PROFILE',
			userLogonDetails: {}
		};
		// component.getInstance().setState = jest.fn();
		component.getInstance().preventDefault = jest.fn();
		component.getInstance().setContent('PROFILE');
		const actualOutput = component.getInstance().state;
		expect(expectedOutput).toEqual(actualOutput);
	});
});
