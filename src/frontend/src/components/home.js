import './home.css';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
	HistoryOutlined,
	LogoutOutlined,
	HeartOutlined,
	ShopOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { Component } from 'react';
import Profile from './profile';
import History from './history';
import Donate from './donate';
import MarketPlace from './marketPlace';

const { Header, Sider, Content } = Layout;

/**
 * React component for user dashboard
 * @extends React.Component
 */
class Home extends Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
	constructor(props) {
		super(props);
		this.state = {
			collapsed: true,
			content: '',
			userLogonDetails: {}
		};
	}

	/**
	 * React lifecycle method to route to login page if user is not logged in, else route to history page
	 */
	componentDidMount() {
		const userLogonDetails = JSON.parse(localStorage.getItem('userLogonDetails'));
		if (!userLogonDetails.signInStatus) {
			this.redirectToPath('/');
		} else {
			this.setState({
				userLogonDetails: userLogonDetails
			});
			const url = new URL(document.location.href);
			const pathWithoutHome = url.pathname.split('/')[2];
			if (url.pathname === '/home') {
				this.redirectToPath('/home/history');
			} else {
				const paths = ['profile', 'history', 'donate','marketPlace'];
				if (paths.includes(pathWithoutHome)) {
					this.setState({
						content: pathWithoutHome
					});
				}
			}
		}
	}

	/**
	 * Redirect to specified path
	 * @param {String} path Path to redirect
	 */
	redirectToPath = (value) => {
		const url = new URL(document.location.href);
		document.location.href = `${url.origin}${value}`;
	};

	/**
	 * Toggle side panel view
	 */
	setCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	/**
	 * Change tab based on user input
	 * @param {String} value Name of the tab to render
	 */
	setContent = (value) => {
		this.setState({
			content: value
		});
	};

	/**
	 * Render user dashboard component
	 * @returns {React.Component} Layout containing options for user dashboard
	 */
	render() {
		const items3 = [
			{
				key: 'history',
				icon: React.createElement(HistoryOutlined),
				label: 'HISTORY',
				onClick: () => this.redirectToPath('/home/history')
			},
			{
				key: 'donate',
				icon: React.createElement(HeartOutlined),
				label: 'DONATE',
				onClick: () => this.redirectToPath('/home/donate')
			},
			{
				key: 'profile',
				icon: React.createElement(UserOutlined),
				label: 'PROFILE',
				onClick: () => this.redirectToPath('/home/profile')
			},
			{
				key: 'marketPlace',
				icon: React.createElement(ShopOutlined),
				label: 'MARKET PLACE',
				onClick: () => this.redirectToPath('/home/marketPlace')
			},
			{
				key: 'logout',
				icon: React.createElement(LogoutOutlined),
				label: 'LOGOUT',
				onClick: () => {
					let userLogonDetails = this.state.userLogonDetails;
					userLogonDetails.signInStatus = false;
					localStorage.setItem('userLogonDetails', JSON.stringify(userLogonDetails));
					this.redirectToPath('/');
				}
			}
		];
		return (<div>
			<Layout>
				<Sider trigger={null} collapsible collapsed={this.state.collapsed}>
					<div className='logo' />
					<Menu
						theme='dark'
						mode='inline'
						selectedKeys={[this.state.content || 'history']}
						items={items3}
					/>
				</Sider>
				<Layout className='site-layout'>
					<Header
						className='site-layout-background'
						style={{
							padding: 0,
						}}
					>
						{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
							className: 'trigger',
							onClick: () => this.setCollapsed(),
						})}
					</Header>
					<Content
						className='site-layout-background'
						style={{
							margin: '24px 16px',
							padding: 24,
							minHeight: 280,
						}}
					>
						{(this.state.content === 'history' || this.props.tab === 'history') && <History props={this.props}/>}
						{(this.state.content === 'donate' || this.props.tab === 'donate') && <Donate props={this.props}/>}
						{(this.state.content === 'profile' || this.props.tab === 'profile') && <Profile props={this.props}/>}
						{(this.state.content === 'marketPlace' || this.props.tab === 'marketPlace') && <MarketPlace props={this.props}/>}
					</Content>
				</Layout>
			</Layout>
		</div >);
	}
}

export default Home;
