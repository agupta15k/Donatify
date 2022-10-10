import React, { Component } from 'react';
import getDonorHistoryAPI from '../API/getDonorHistory';
import getRecipientHistoryAPI from '../API/getRecipientHistory';
import { Card, Avatar, Radio, Modal, Button } from 'antd';
const { Meta } = Card;

/**
 * React component for showing user donation and receive history
 * @extends React.Component
 */
class History extends Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
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

	/**
	 * Get donor and receiver history from database and save it to state
	 */
	loadHistory = async () => {
		let userId = JSON.parse(localStorage.getItem('userLogonDetails')).userId;
		const donorHistoryResponse = await getDonorHistoryAPI(userId);
		if (donorHistoryResponse.data && donorHistoryResponse.data.data) {
			this.setState({
				...this.state,
				donorHistory: donorHistoryResponse.data.data,
			});
		}

		const recipientHistoryResponse = await getRecipientHistoryAPI(userId);
		if (recipientHistoryResponse.data && donorHistoryResponse.data.data) {
			this.setState({
				...this.state,
				recipientHistory: recipientHistoryResponse.data.data
			});
		}
		return true;
	};

	// /**
	//  * Load next page results
	//  */
	// loadMore = () => {
	// 	this.setState(
	// 		prevState => ({
	// 			page: prevState.page + 1,
	// 			scrolling: true
	// 		}),
	// 		this.loadHistory
	// 	);
	// };

	/**
	 * Lifecycle method to trigger loading history
	 */
	componentDidMount = async () => {
		await this.loadHistory();
	};

	/**
	 * Update state with type of history required
	 * @param {Object} event onChange event for user input
	 */
	setHistory = (event) => {
		this.setState({
			history: event.target.value
		});
		return true;
	};

	/**
	 * Set modal display to be true
	 * @param {Boolean} value True to display the modal, false otherwise
	 */
	setIsModalOpen = (value) => {
		this.setState({
			isModalOpen: value
		});
		return true;
	};

	/**
	 * Render History component
	 * @returns {React.Component} History related cards
	 */
	render() {
		const gridStyle = {
			width: '25%',
			textAlign: 'center',
		};

		/**
		 * Store selected item data in state and display model
		 * @param {Object} data Object containing item details
		 */
		const showModal = (data) => {
			this.setState({
				d: {
					...data
				}
			});
			this.setIsModalOpen(true);
		};

		/**
		 * Hide modal when OK button clicked
		 */
		const handleOk = () => {
			this.setIsModalOpen(false);
		};

		/**
		 * Hide model when Cancel button clicked
		 */
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
					{!this.state.history==='Donor History'?(<p>Donor Name: {this.state.d.itemDonorName || ''}</p>):(<></>)}
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
