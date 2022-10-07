import React, { Component } from "react";
import { Col, Row, Slider } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, FolderViewOutlined } from '@ant-design/icons';
import getRecipientItemsAPI from '../API/getRecipientItems';
import { Card, Avatar, Radio, Modal, Button, Alert } from 'antd';
const { Meta } = Card;
const recieveItemAPI = require('../API/recieveItem');

class MarketPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipientItems: [],
            history: 'All',
            isModalOpen: false,
            showAlert: false,
        }
    }

    loadData = async () => {
        // const recipientItems = await getRecipientItemsAPI(this.props.props.userId)

        const recipientItems = [{
            itemId: 1,
            itemName: 'rice1',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food',
            donorEmail: 'abc@gmail.com'
        },
        {
            itemId: 2,
            itemName: 'rice2',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food'
        },
        {
            itemId: 3,
            itemName: 'rice3',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food'
        },
        {
            itemId: 4,
            itemName: 'rice4',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food'
        },
        {
            itemId: 5,
            itemName: 'rice5',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food'
        },
        {
            itemId: 6,
            itemName: 'rice6',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food'
        },
        {
            itemId: 7,
            itemName: 'rice7',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food'
        },
        {
            itemId: 8,
            itemName: 'rice8',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food'
        },
        {
            itemId: 9,
            itemName: 'rice9',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food'
        },
        {
            itemId: 10,
            itemName: 'rice10',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food'
        },
        {
            itemId: 11,
            itemName: 'rice11',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food'
        },
        {
            itemId: 12,
            itemName: 'rice12',
            itemQuantity: 1,
            itemDescription: 'left over rice',
            itemZipCode: '27606',
            itemCity: 'raleigh',
            itemDonorId: '1',
            itemCategory: 'food'
        }
        ]
        this.setState({
            recipientItems
        });
    };

    loadMore = () => {
        this.setState(
            prevState => ({
                page: prevState.page + 1,
                scrolling: true
            }),
            this.loadData
        );
    };

    componentDidMount() {
        // console.log(this.state)
        console.log("history component")
        console.log(this.props)
        this.loadData();
    }

    setHistory = (event) => {
        console.log("radio", event)
        this.setState({
            history: event.target.value
        })
    }
    setIsModalOpen = (value) => {
        this.setState({
            isModalOpen: value
        })
    }
    showDonorContact = (email) => {
        alert(`This item is donated by the seller directly, please contact them at : ${email}`)
        // this.setState({
        //     showAlert: !this.state.showAlert
        // })
    }

    render() {
        const gridStyle = {
            width: '25%',
            textAlign: 'center',
        };

        const showModal = () => {
            this.setIsModalOpen(true);
        };

        const handleOk = (itemId) => {
            // const res= await recieveItemAPI({itemId,userId:this.props.props.userId})
            // const res={status:200,data:{
            //     success:true
            // }}
            // if(res.data.success){
            //     console.log('successfully bought the item')
            // }
            // await this.loadData();
            this.setIsModalOpen(false);
        };

        const handleCancel = () => {
            this.setIsModalOpen(false);
        };
        return (
            <>
                <Card title="market place">
                    {
                        this.state.recipientItems.map((d) => (
                            <Card.Grid style={gridStyle}>
                                <Card
                                    style={{
                                        width: 100,
                                    }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://picsum.photos/300/200"
                                        />
                                    }
                                // actions={[
                                //   <FolderViewOutlined key="view" />
                                // ]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                        title={d.itemName}
                                        description={d.itemDescription}
                                    />
                                    <Button type="primary" onClick={showModal}>
                                        View Details
                                    </Button>
                                    <Button type="primary" onClick={() => this.showDonorContact(d.donorEmail)}>
                                        Contact Donor
                                    </Button>
                                    {/* {this.state.showAlert ? (<Alert
                                        message="Donor Details"
                                        description={`email: ${d.donorEmail}`}
                                        type="info"
                                        showIcon
                                    />) : (<div></div>)} */}

                                    <Modal title={d.itemName} open={this.state.isModalOpen}  onOk={() => { handleOk(d.itemId) }} onCancel={handleCancel}>
                                        <p>Item Name: {d.itemName}</p>
                                        <p>Item Quantity: {d.itemQuantity}</p>
                                        <p>Item Description: {d.itemDescription}</p>
                                        <p>Item Zip Code: {d.itemZipCode}</p>
                                        <p>Item City: {d.itemCity}</p>
                                        <p>Item Category: {d.itemCategory}</p>
                                    </Modal>
                                </Card>
                            </Card.Grid>
                        ))
                    }
                </Card>
            </>);
    }
}

export default MarketPlace;
