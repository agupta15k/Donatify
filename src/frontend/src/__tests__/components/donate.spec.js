import renderer from 'react-test-renderer';
import Donate from '../../components/donate';

describe('donateComponent', () => {
    it('renders without crashing', () => {
        const component = renderer.create(<Donate />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('initial state set correctly', () => {
        const component = renderer.create(<Donate />);
        const expectedOutput = {
            itemName: '',
            itemQuantity: 1,
            itemDescription: '',
            itemZipCode: '',
            itemCity: {},
            itemDonorId: undefined,
            itemCategory: {},
            loading: false
        };
        const actualOutput = component.getInstance().state;
        expect(expectedOutput).toEqual(actualOutput);
    });

    it('handleInput function updates state correctly - input', () => {
        const component = renderer.create(<Donate />);
        const expectedOutput = {
            itemName: 'test',
            itemQuantity: 1,
            itemDescription: '',
            itemZipCode: '',
            itemCity: {},
            itemDonorId: undefined,
            itemCategory: {},
            loading: false
        };
        const input = {
            type: 'change',
            target: {
                id: 'itemName',
                value: 'test'
            }
        };
        component.getInstance().handleInput(input);
        const actualOutput = component.getInstance().state;
        expect(expectedOutput).toEqual(actualOutput);
    });

    it('handleInput function updates state correctly - dropdown', () => {
        const component = renderer.create(<Donate />);
        const expectedOutput = {
            itemName: '',
            itemQuantity: 1,
            itemDescription: '',
            itemZipCode: '',
            itemCity: {
                label: 'test',
                value: 'test'
            },
            itemDonorId: undefined,
            itemCategory: {},
            loading: false
        };
        const input = {
            name: 'itemCity',
            values: {
                label: 'test',
                value: 'test'
            }
        };
        component.getInstance().handleInput(input);
        const actualOutput = component.getInstance().state;
        expect(expectedOutput).toEqual(actualOutput);
    });

    it('handleSubmit function returns false if itemName missing', (done) =>{
        const component = renderer.create(<Donate />);
        component.getInstance().setState({
            itemName: ''
        });
        component.getInstance().handleSubmit({}).then((val) => {
            expect(val).toEqual(false);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('handleSubmit function returns false if itemDescription missing', (done) =>{
        const component = renderer.create(<Donate />);
        component.getInstance().setState({
            itemName: 'test',
            itemDescription: ''
        });
        component.getInstance().handleSubmit({}).then((val) => {
            expect(val).toEqual(false);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('handleSubmit function returns false if itemZipCode missing', (done) =>{
        const component = renderer.create(<Donate />);
        component.getInstance().setState({
            itemName: 'test',
            itemDescription: 'test',
            itemZipCode: ''
        });
        component.getInstance().handleSubmit({}).then((val) => {
            expect(val).toEqual(false);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('handleSubmit function returns false if itemCity missing', (done) =>{
        const component = renderer.create(<Donate />);
        window.alert = jest.fn();
        component.getInstance().setState({
            itemName: 'test',
            itemDescription: 'test',
            itemZipCode: 'test',
            itemCity: {}
        });
        component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
            expect(val).toEqual(false);
            expect(window.alert).toHaveBeenCalledWith('Missing value for city. Enter city for the item.');
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('handleSubmit function returns false if itemCategory missing', (done) =>{
        const component = renderer.create(<Donate />);
        window.alert = jest.fn();
        component.getInstance().setState({
            itemName: 'test',
            itemDescription: 'test',
            itemZipCode: 'test',
            itemCity: {test: 'test'}
        });
        component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
            expect(val).toEqual(false);
            expect(window.alert).toHaveBeenCalledWith('Missing value for category. Enter category for the item.');
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('handleSubmit function returns false if props do not exist', (done) =>{
        const component = renderer.create(<Donate />);
        component.getInstance().setState({
            itemName: 'test',
            itemDescription: 'test',
            itemZipCode: 'test',
            itemCity: {test: 'test'},
            itemCategory: {test: 'test'}
        });
        component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
            expect(val).toEqual(false);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('handleSubmit function returns false if API calls fails - no error message', (done) =>{
        const props = {
            onAddItem: () => {},
            apiStatus: false
        };
        const component = renderer.create(<Donate props={props}/>);
        window.alert = jest.fn();
        component.getInstance().setState({
            itemName: 'test',
            itemDescription: 'test',
            itemZipCode: 'test',
            itemCity: {test: 'test'},
            itemCategory: {test: 'test'}
        });
        component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
            expect(val).toEqual(false);
            expect(window.alert).toHaveBeenCalledWith('Item addition could not complete. Please try again.');
            expect(component.getInstance().state.loading).toEqual(false);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('handleSubmit function returns false if API calls fails - with error message', (done) =>{
        const props = {
            onAddItem: () => {},
            apiStatus: false,
            apiMessage: 'test'
        };
        const component = renderer.create(<Donate props={props}/>);
        window.alert = jest.fn();
        component.getInstance().setState({
            itemName: 'test',
            itemDescription: 'test',
            itemZipCode: 'test',
            itemCity: {test: 'test'},
            itemCategory: {test: 'test'}
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
        const props = {
            onAddItem: mockFn,
            apiStatus: true
        };
        const currentState = {
            itemName: 'test',
            itemDescription: 'test',
            itemZipCode: 'test',
            itemCity: {label: 'test', value: 'test'},
            itemCategory: {label: 'test', value: 'test'}
        };
        const expectedOutput = {
            itemName: 'test',
            itemDescription: 'test',
            itemDonorId: undefined,
            itemQuantity: 1,
            itemZipCode: 'test',
            itemCity: 'test',
            itemCategory: 'test'
        };
        const component = renderer.create(<Donate props={props}/>);
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

    it('state updates when itemName input value changes', () => {
        const props = {
            onAddItem: () => {},
            apiStatus: true
        };
        const onChangeInput = {
            type: 'change',
            target: {
                id: 'itemName',
                value: 'test1'
            }
        };
        const component = renderer.create(<Donate props={props}/>);
        component.root.findAllByType('input')[0].props.onChange(onChangeInput);
        expect(component.getInstance().state.itemName).toEqual('test1');
    });

    it('state updates when itemDescription input value changes', () => {
        const props = {
            onAddItem: () => {},
            apiStatus: true
        };
        const onChangeInput = {
            type: 'change',
            target: {
                id: 'itemDescription',
                value: 'test1'
            }
        };
        const component = renderer.create(<Donate props={props}/>);
        component.root.findAllByType('textarea')[0].props.onChange(onChangeInput);
        expect(component.getInstance().state.itemDescription).toEqual('test1');
    });

    it('state updates when itemZipCode input value changes', () => {
        const props = {
            onAddItem: () => {},
            apiStatus: true
        };
        const onChangeInput = {
            type: 'change',
            target: {
                id: 'itemZipCode',
                value: 'test1'
            }
        };
        const component = renderer.create(<Donate props={props}/>);
        component.root.findAllByType('input')[1].props.onChange(onChangeInput);
        expect(component.getInstance().state.itemZipCode).toEqual('test1');
    });

    it('state updates when itemCity input value changes', () => {
        const props = {
            onAddItem: () => {},
            apiStatus: true
        };
        const onChangeInput = {
            type: 'change',
            target: {
                id: 'itemCity',
                value: 'test1'
            }
        };
        const component = renderer.create(<Donate props={props}/>);
        component.root.findAllByType('input')[1].props.onChange(onChangeInput);
        expect(component.getInstance().state.itemCity).toEqual('test1');
    });

    it('state updates when itemCategory input value changes', () => {
        const props = {
            onAddItem: () => {},
            apiStatus: true
        };
        const onChangeInput = {
            type: 'change',
            target: {
                id: 'itemCategory',
                value: 'test1'
            }
        };
        const component = renderer.create(<Donate props={props}/>);
        component.root.findAllByType('input')[1].props.onChange(onChangeInput);
        expect(component.getInstance().state.itemCategory).toEqual('test1');
    });

    it('renders spinner when loading is true', () => {
        const props = {
            onAddItem: () => {},
            apiStatus: true
        };
        const component = renderer.create(<Donate props={props}/>);
        component.getInstance().setState({
            loading: true
        });
        let spinner = component.root.findAllByType('span').filter((comp) => comp.props && comp.props.className === 'visually-hidden');
        expect(spinner && spinner[0] && spinner[0].props && spinner[0].props.children).toEqual('Loading...');
    });

    it('renders input when loading is false', (done) => {
        const props = {
            onAddItem: () => {},
            apiStatus: true
        };
        const component = renderer.create(<Donate props={props}/>);
        component.root.findAllByType('input')[6].props.onClick().then((val) => {
            expect(val).toEqual(false);
            done();
        }).catch((err) => {
            done(err);
        });
    });
});
