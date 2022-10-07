import React, { Component } from "react";
import { Col, Row, Slider } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, FolderViewOutlined } from '@ant-design/icons';
import getDonorHistoryAPI from '../API/getDonorHistory';
import getRecipientHistoryAPI from '../API/getRecipientHistory';
import { Card, Avatar, Radio, Modal, Button } from 'antd';
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
    let userId = JSON.parse(localStorage.getItem('userLogonDetails')).userId
    const donorHistory = await getDonorHistoryAPI(userId);
    const recipientHistory = await getRecipientHistoryAPI(userId);
    this.setState({
      donorHistory,
      recipientHistory
    });
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

  componentDidMount = async () => {
    await this.loadHistory();
  }

  setHistory = (event) => {
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
          {((this.state.history === 'All' || this.state.history === 'Donor History') && this.state.donorHistory.length > 0) ?
            this.state.donorHistory.map((d) => (
              <Card.Grid style={gridStyle}>
                <Card
                  style={{
                    width: '100%',
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
          {((this.state.history === 'All' || this.state.history === 'Recipient History') && this.state.recipientHistory.length > 0) ?
            this.state.recipientHistory.map((d) => (
              <Card.Grid style={gridStyle}>
                <Card
                  style={{
                    width: '100%',
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
