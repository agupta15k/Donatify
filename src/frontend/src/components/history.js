import React, { Component } from "react";
import { Col, Row, Slider } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, FolderViewOutlined } from '@ant-design/icons';
import getDonotHistoryAPI from '../API/getDonorHistory';
import getRecipietHistoryAPI from '../API/getRecipientHistory';
import { Card, Avatar, Radio,Modal,Button } from 'antd';
const { Meta } = Card;

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donorHistory: [],
      recipientHistory: [],
      history: 'All',
      isModalOpen: false,
      options: [
        {
          label: 'All',
          value: 'All',
        },
        {
          label: 'Donor History',
          value: 'Donor History',
        },
        {
          label: 'Recipient History',
          value: 'Recipient History',
        },
      ]
    }
  }

  loadHistory = async () => {
    // const donorHistory= await getDonorHistoryAPI(this.props.props.userId)
    // const recipientHistory = await getRecipietHistoryAPI(this.props.props.userId)

    const donorHistory = [{
      itemName: 'rice1',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorId: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice2',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorId: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice3',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorId: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice4',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorId: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice5',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorId: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice6',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorId: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice7',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorId: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice8',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorId: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice9',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorId: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice10',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorId: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice11',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorId: '1',
      itemCategory: 'food'
    },
    {
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
      donorHistory
    })
    const recipientHistory = [{
      itemName: 'rice1',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice2',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice3',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice4',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice5',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice6',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice7',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice8',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice9',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice10',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice11',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    },
    {
      itemName: 'rice12',
      itemQuantity: 1,
      itemDescription: 'left over rice',
      itemZipCode: '27606',
      itemCity: 'raleigh',
      itemDonorName: '1',
      itemCategory: 'food'
    }
    ]
    this.setState({
      recipientHistory
    })
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),
      this.loadHistory
    );
  };

  componentDidMount() {
    // console.log(this.state)
    console.log("history component")
    console.log(this.props)
    this.loadHistory();
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

  render() {
    const gridStyle = {
      width: '25%',
      textAlign: 'center',
    };

    const showModal = () => {
      this.setIsModalOpen(true);
    };

    const handleOk = () => {
      this.setIsModalOpen(false);
    };

    const handleCancel = () => {
      this.setIsModalOpen(false);
    };
    return (
      <>
        <Radio.Group options={this.state.options} onChange={this.setHistory} value={this.state.history} optionType="button" buttonStyle="solid" />
        <Card title={this.state.history}>
          {(this.state.history === 'All' || this.state.history === 'Donor History') ?
            this.state.donorHistory.map((d) => (
              <Card.Grid style={gridStyle}>
                <Card
                  style={{
                    width: 50,
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
                    Item Details
                  </Button>
                  <Modal title="Basic Modal" open={this.state.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
            :
            (<div></div>)
          }
          {(this.state.history === 'All' || this.state.history === 'Recipient History') ?
            this.state.recipientHistory.map((d) => (
              <Card.Grid style={gridStyle}>
                <Card
                  style={{
                    width: 50,
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
                    Item Details
                  </Button>
                  <Modal title="Item Details" open={this.state.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Item Name: {d.itemName}</p> 
                    <p>Item Quantity: {d.itemQuantity}</p>
                    <p>Item Description: {d.itemDescription}</p>
                    <p>Item Zip Code: {d.itemZipCode}</p>
                    <p>Item City: {d.itemCity}</p>
                    <p>Donor Name: {d.itemDonorName}</p>
                    <p>Item Category: {d.itemCategory}</p>
                  </Modal>
                </Card>
              </Card.Grid>
            ))
            :
            (<div></div>)
          }
        </Card>
      </>);
  }
}

export default History;
