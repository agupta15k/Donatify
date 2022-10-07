import React from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


class Donate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemQuantity: 1,
            itemDescription: '',
            itemZipCode: '',
            itemCity: {},
            itemDonorId: props.props.userId,
            itemCategory: {}
        };
    }

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
    }

    handleSubmit = async (event) => {
        const keys = ['itemName', 'itemDescription', 'itemZipCode'];
        for (let i = 0; i < keys.length; i++) {
            if (this.state[keys[i]] === '') return;
        }
        event.preventDefault();
        if (Object.keys(this.state.itemCity).length === 0) {
            alert('Missing value for city. Enter city for the item.');
            return false;
        }
        if (Object.keys(this.state.itemCategory).length === 0) {
            alert('Missing value for category. Enter category for the item.');
            return false;
        }
        if (this.props.props) {
            const apiInput = {
                itemName: this.state.itemName,
                itemQuantity: this.state.itemQuantity,
                itemDescription: this.state.itemDescription,
                itemZipCode: this.state.itemZipCode,
                itemCity: this.state.itemCity.value,
                itemDonorId: this.state.itemDonorId,
                itemCategory: this.state.itemCategory.value
            };
            await this.props.props.onAddItem(apiInput);
            if (this.props.props.apiStatus) {
                this.redirectToPath('/home/history');
                return true;
            } else {
                alert(this.props.props.apiMessage || 'Item addition could not complete. Please try again.');
                return false;
            }
        }
        return false;
    };

    redirectToPath = (path) => {
        const url = new URL(document.location.href);
        document.location.href = `${url.origin}${path}`;
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
        return (
            <section>
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Donate</h2>
                            <form className="register-form" id="donate-form">
                                <div className="form-group">
                                    <img src="../signup-name.png" alt='item name' />
                                    <input autoFocus type="text" name="name" id="itemName" placeholder="Item name" value={this.state.itemName} onChange={this.handleInput} required />
                                </div>
                                <div className="form-group">
                                    <img src="../item-description.png" alt='item description' />
                                    <textarea  name="description" id="itemDescription" placeholder="Item description" value={this.state.itemDescription} onChange={this.handleInput} required />
                                </div>
                                <div className="form-group">
                                    <img src="../signup-zip.png" alt='item zipcode' />
                                    <input type="text" name="zipcode" id="itemZipCode" placeholder="Item zipcode" value={this.state.itemZipCode} onChange={this.handleInput} required />
                                </div>
                                <div className="form-group" style={{overflow: 'unset'}}>
                                    <img src="../signup-city.png" alt='item city'/>
                                    <Select
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        options={cities}
                                        placeholder={'City'}
                                        maxMenuHeight={200}
                                        menuPlacement='top'
                                        name='itemCity'
                                        onChange={(event) => this.handleInput({values: event, name: 'itemCity'})}
                                    />
                                </div>
                                <div className="form-group" style={{overflow: 'unset'}}>
                                    <img src="../signup-groceries.png" alt='signup items'/>
                                    <Select
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        options={interestItems}
                                        placeholder={'Category'}
                                        maxMenuHeight={200}
                                        menuPlacement='top'
                                        name='itemCategory'
                                        onChange={(event) => this.handleInput({values: event, name: 'itemCategory'})}
                                    />
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="donate" id="donate" className="form-submit" value="Donate" onClick={this.handleSubmit} />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src="../donate-image.jpg" alt="donate" /></figure>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Donate;
