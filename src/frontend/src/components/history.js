import React, { Component } from 'react';
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
		};
	}

	loadHistory = async () => {
		let userId = JSON.parse(localStorage.getItem('userLogonDetails')).userId;
		const donorHistoryResponse = await getDonorHistoryAPI(userId);
		const recipientHistoryResponse = await getRecipientHistoryAPI(userId);
		this.setState({
			...this.state,
			donorHistory: donorHistoryResponse.data.data,
			recipientHistory: recipientHistoryResponse.data.data
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
	};

	setHistory = (event) => {
		this.setState({
			history: event.target.value
		});
	};
	setIsModalOpen = (value) => {
		this.setState({
			isModalOpen: value
		});
	};

	render() {
		const gridStyle = {
			width: '25%',
			textAlign: 'center',
		};

		const showModal = (data) => {
			this.setState({
				d: {
					...data
				}
			});
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
				{this.state.isModalOpen ? (<Modal title="Basic Modal" open={this.state.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
					<p>Item Name: {this.state.d.itemName}</p>
					<p>Item Quantity: {this.state.d.itemQuantity}</p>
					<p>Item Description: {this.state.d.itemDescription}</p>
					<p>Item Zip Code: {this.state.d.itemZipCode}</p>
					<p>Item City: {this.state.d.itemCity}</p>
					<p>Item Category: {this.state.d.itemCategory}</p>
					<p>Donor Name: {this.state.d.itemDonorName || ''}</p>
				</Modal>) : (<></>)}

				{/* <Modal title="Item Details" open={this.state.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Item Name: {d.itemName}</p>
          <p>Item Quantity: {d.itemQuantity}</p>
          <p>Item Description: {d.itemDescription}</p>
          <p>Item Zip Code: {d.itemZipCode}</p>
          <p>Item City: {d.itemCity}</p>
          <p>Donor Name: {d.itemDonorName}</p>
          <p>Item Category: {d.itemCategory}</p>
        </Modal> */}
				<Radio.Group options={this.state.options} onChange={this.setHistory} value={this.state.history} optionType="button" buttonStyle="solid" />
				<Card title={this.state.history}>
					{((this.state.history === 'All' || this.state.history === 'Donor History') && this.state.donorHistory.length > 0) ?
						this.state.donorHistory.map((donor) => (
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
										title={donor.itemName}
										description={donor.itemDescription}
									/>
									<Button type="primary" onClick={() => showModal(donor)}>
										View Details
									</Button>

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
