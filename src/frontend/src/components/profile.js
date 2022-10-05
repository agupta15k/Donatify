import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardText, CardTitle, CardSubtitle, FormGroup, Form, Label, Input, FormText,Col } from 'reactstrap';
import RegisterUser from './register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { WithContext as ReactTags } from 'react-tag-input';
import updateProfileAPI from '../API/updateProfile';

class ModalExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            modal: false,
            nestedModal: false,
            closeAll: false,
            codes: [],
            show_password: false,
            user: {
                id: 1,
                name: 'abc',
                email: 'email',
                phone: '1231231231',
                city: ['raleigh', 'durham', 'charlotte'],
                zipCodes: ['12345', '27606'],
                password: 'abcdef'
            }
        }
    }
    cancelChange=async ()=>{
        await this.loadProfile();
        this.toggle();
    }
    toggle = () => {
        this.setState({
            ...this.state,
            modal: !this.state.modal
        })
    }

    toggleNested = () => {
        this.setState({
            ...this.state,
            nestedModal: !this.state.nestedModal,
            closeAll: false,
        })
    }
    toggleAll = () => {
        this.setState({
            ...this.state,
            nestedModal: !this.state.nestedModal,
            closeAll: true
        })
    }
    loadProfile = async () => {
        // const { per, page, } = this.state;
        // const endpoint = `https://randomuser.me/api/?nat=us&results=${per}&page=${page}`;
        // const res= await getProfleAPI(this.props.user_id)
        const res = {
            data: {
                success: true,
                user: {
                    id: 1,
                    name: 'Newyork nagaram nidaroya vela nene vontari',
                    email: 'abc@intel.com',
                    city: ['raleigh', 'durham', 'charlotte'],
                    zipCodes: ['12345', '27606'],
                    password: '4903'
                }
            }
        }
        this.setState({
            user: res.data.user,
        });
    };
    togglePassword = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            show_password: !this.state.show_password,
        })
    }

    
    handleDelete = (id) => {
        this.setState({
            codes: this.state.codes.filter((tag, index) => index !== id)
        })
    };
    handleSave = async ()=>{
        // const res=await updateProfileAPI(this.state.user)
        const res= {
            status:200,
            data:{
                success:true
            }
        }
        await this.loadProfile();
        this.toggle();
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.id]: event.target.value
            }
        })
    }

    handleAddition = (event) => {
        this.setState({
            codes: [...this.state.codes, event]
        });
    };

    componentDidMount() {
        console.log(this.state)
        this.loadProfile();
    }
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
                            CItites: {this.state.user.city.join(",")}
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
                                    type={this.state.show_password ? 'text' : 'password'}
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
                            <div className="form-group" style={{overflow: 'unset'}}>
                                    <img src="signup-city.png" alt='signup city'/>
                                    <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={cities}
                                        placeholder={'Your city'}
                                        maxMenuHeight={100}
                                        menuPlacement='top'
                                        name='city'
                                    ></Select>
                                </div>
                                <div className="form-group">
                                    <img src="signup-zip.png" alt='signup zip'/>
                                    <ReactTags name='zip' id='zip' placeholder='Your zip codes' tags={this.state.codes} delimiters={delimiters} handleAddition={this.handleAddition} handleDelete={this.handleDelete} autofocus={false}/>
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

export default ModalExample;
