import renderer from 'react-test-renderer';
import LoginUser from '../../components/login';

describe('loginComponent', () => {
    it('renders without crashing', () => {
        const component = renderer.create(<LoginUser />);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('initial state set correctly', () => {
        const component = renderer.create(<LoginUser />);
        const expectedOutput = {
            email: '',
            pass: '',
            loginSuccess: false,
            loading: false
        };
        const actualOutput = component.getInstance().state;
        expect(expectedOutput).toEqual(actualOutput);
    });

    it('handleInput function updates state correctly - input', () => {
        const component = renderer.create(<LoginUser />);
        const expectedOutput = {
            email: 'test@test.com',
            pass: '',
            loginSuccess: false,
            loading: false
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

    it('handleSubmit function returns false if email missing', (done) =>{
        const component = renderer.create(<LoginUser />);
        component.getInstance().setState({
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
        const component = renderer.create(<LoginUser />);
        component.getInstance().setState({
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

    it('handleSubmit function returns false if email is not correctly formatted', (done) =>{
        const component = renderer.create(<LoginUser />);
        window.alert = jest.fn();
        component.getInstance().setState({
            email: 'test',
            pass: 'pass'
        });
        component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
            expect(val).toEqual(false);
            expect(window.alert).toHaveBeenCalledWith('Email format not correct. Enter email in correct format');
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('handleSubmit function returns false if props do not exist', (done) =>{
        const component = renderer.create(<LoginUser />);
        component.getInstance().setState({
            email: 'test@test.com',
            pass: 'pass'
        });
        component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
            expect(val).toEqual(false);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('handleSubmit function returns false if API calls fails - no error message', (done) =>{
        const component = renderer.create(<LoginUser onSubmitLogin={() => {}} apiStatus={false}/>);
        window.alert = jest.fn();
        component.getInstance().setState({
            email: 'test@test.com',
            pass: 'pass'
        });
        component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
            expect(val).toEqual(false);
            expect(window.alert).toHaveBeenCalledWith('Invalid email or password. Enter correct email and password, and try again.');
            expect(component.getInstance().state.loading).toEqual(false);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('handleSubmit function returns false if API calls fails - with error message', (done) =>{
        const component = renderer.create(<LoginUser onSubmitLogin={() => {}} apiStatus={false} apiMessage={'test'}/>);
        window.alert = jest.fn();
        component.getInstance().setState({
            email: 'test@test.com',
            pass: 'pass'
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
            email: 'test@test.com',
            pass: 'pass'
        };
        const expectedOutput = {
            email: 'test@test.com',
            pass: 'pass'
        };
        const component = renderer.create(<LoginUser onSubmitLogin={mockFn} apiStatus={true} userId={1}/>);
        window.alert = jest.fn();
        component.getInstance().setState(currentState);
        component.getInstance().setState = jest.fn();
        component.getInstance().redirectToPath = jest.fn();
        component.getInstance().handleSubmit({preventDefault: () => {}}).then((val) => {
            expect(val).toEqual(true);
            expect(mockFn).toHaveBeenCalledWith(expectedOutput);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('state updates when email input value changes', () => {
        const component = renderer.create(<LoginUser onSubmitLogin={() => {}} apiStatus={true} userId={1}/>);
        const onChangeInput = {
            type: 'change',
            target: {
                id: 'email',
                value: 'test1'
            }
        };
        component.root.findAllByType('input')[0].props.onChange(onChangeInput);
        expect(component.getInstance().state.email).toEqual('test1');
    });

    it('state updates when pass input value changes', () => {
        const component = renderer.create(<LoginUser onSubmitLogin={() => {}} apiStatus={true} userId={1}/>);
        const onChangeInput = {
            type: 'change',
            target: {
                id: 'pass',
                value: 'test1'
            }
        };
        component.root.findAllByType('input')[0].props.onChange(onChangeInput);
        expect(component.getInstance().state.pass).toEqual('test1');
    });

    it('renders spinner when loading is true', () => {
        const component = renderer.create(<LoginUser onSubmitLogin={() => {}} apiStatus={true} userId={1}/>);
        component.getInstance().setState({
            loading: true
        });
        let spinner = component.root.findAllByType('span').filter((comp) => comp.props && comp.props.className === 'visually-hidden');
        expect(spinner && spinner[0] && spinner[0].props && spinner[0].props.children).toEqual('Loading...');
    });

    it('renders input when loading is false', (done) => {
        const component = renderer.create(<LoginUser onSubmitLogin={() => {}} apiStatus={true} userId={1}/>);
        component.root.findAllByType('input')[2].props.onClick().then((val) => {
            expect(val).toEqual(false);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('renders register button correctly', () => {
        const component = renderer.create(<LoginUser onSubmitLogin={() => {}} apiStatus={true} userId={1}/>);
        component.getInstance().redirectToPath = jest.fn();
        component.root.findAllByType('a')[0].props.onClick();
        expect(component.root.findAllByType('a')[0].props.className).toEqual('signup-image-link');
        expect(component.getInstance().redirectToPath).toHaveBeenCalledWith('/register');
    });

    it('renders images correctly', () => {
        const component = renderer.create(<LoginUser onSubmitLogin={() => {}} apiStatus={true} userId={1}/>);
        expect(component.root.findAllByType('img')[0].props.src).toEqual('signin-image.jpg');
        expect(component.root.findAllByType('img')[1].props.src).toEqual('signup-email.png');
        expect(component.root.findAllByType('img')[2].props.src).toEqual('signup-pass.png');
    });
});
