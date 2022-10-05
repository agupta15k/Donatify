import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { WithContext as ReactTags } from 'react-tag-input';

class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codes: []
        };
    }
    validateInput = (key) => {
        const value = document.getElementsByName(key);
        if (value.length == 1 && !value[0].value) return false;
        return true;
    };

    handleSubmit = (event) => {
        const keys = ['name', 'email', 'pass', 're_pass', 'zip'];
        for (let i = 0; i < keys.length; i++) {
            if (!this.validateInput(keys[i])) return;
        }
        const selectedCitites = document.getElementsByName('city');
        if (selectedCitites.length == 1 && !selectedCitites[0].value) {
            alert('Missing values for city. Please enter your city.');
            event.preventDefault();
            return false;
        }
        return true;
    };

    redirectToLogin = () => {
        const url = new URL(document.location.href);
        document.location.href = url.origin;
        document.getElementsByClassName('signup-image-link')[0].href = url.origin;
    };

    handleAddition = (event) => {
        this.setState({
            codes: [...this.state.codes, event]
        });
    };

    handleDelete = (id) => {
        this.setState({
            codes: this.state.codes.filter((tag, index) => index !== id)
        })
    };

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
            <div className='signup'>
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form className="register-form" id="register-form">
                                <div className="form-group">
                                    <img src="signup-name.png"/>
                                    <input autoFocus type="text" name="name" id="name" placeholder="Your Name" required/>
                                </div>
                                <div className="form-group">
                                    <img src="signup-email.png"/>
                                    <input type="email" name="email" id="email" placeholder="Your Email" required/>
                                </div>
                                <div className="form-group">
                                    <img src="signup-pass.png"/>
                                    <input type="password" name="pass" id="pass" placeholder="Password" required/>
                                </div>
                                <div className="form-group">
                                    <img src="signup-repass.png"/>
                                    <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" required/>
                                </div>
                                <div className="form-group" style={{overflow: 'unset'}}>
                                    <img src="signup-city.png"/>
                                    <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={cities}
                                        placeholder={'Your city'}
                                        maxMenuHeight={100}
                                        menuPlacement='auto'
                                        name='city'
                                    ></Select>
                                </div>
                                <div className="form-group">
                                    <img src="signup-zip.png"/>
                                    <ReactTags name='zip' id='zip' placeholder='Your zip codes' tags={this.state.codes} delimiters={delimiters} handleAddition={this.handleAddition} handleDelete={this.handleDelete} autofocus={false}/>
                                </div>
                                <div className="form-group" style={{overflow: 'unset'}}>
                                    <img src="signup-groceries.png"/>
                                    <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={interestItems}
                                        placeholder={'Interested items'}
                                        maxMenuHeight={100}
                                        menuPlacement='auto'
                                        name='groceries'
                                    ></Select>
                                </div>
                                {/* <div className="form-group">
                                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" required/>
                                    <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in <a className="term-service">Terms of service</a></label>
                                </div> */}
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={this.handleSubmit}/>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src="signup-image.png" alt="sign up"/></figure>
                            <a href="" onClick={this.redirectToLogin} className="signup-image-link">I am already member</a>
                        </div>
                    </div>
                </div>
                {console.log(document.getElementById('name'))}
            </div>
        );
    }
}

export default RegisterUser;
