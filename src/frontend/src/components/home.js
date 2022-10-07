import './home.css'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    HistoryOutlined,
    SettingOutlined,
    VideoCameraOutlined,
    LogoutOutlined,
    HeartOutlined,
    ShopOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { Component, useState } from 'react';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';

import Profile from './profile';
import History from './history';
import Settings from './settings';
import Donate from './donate';
import MarketPlace from './marketPlace';

const { Header, Sider, Content } = Layout;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            content: '',
            userLogonDetails: {}
        }
    }

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

    redirectToPath = (value) => {
        const url = new URL(document.location.href);
        document.location.href = `${url.origin}${value}`;
    }

    setCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    setContent = (value) => {
        this.setState({
            content: value
        })
    }

    render() {
        const items3 = [
            {
                key: `history`,
                icon: React.createElement(HistoryOutlined),
                label: `HISTORY`,
                onClick: () => this.redirectToPath('/home/history')
            },
            {
                key: `donate`,
                icon: React.createElement(HeartOutlined),
                label: `DONATE`,
                onClick: () => this.redirectToPath('/home/donate')
            },
            {
                key: `profile`,
                icon: React.createElement(UserOutlined),
                label: `PROFILE`,
                onClick: () => this.redirectToPath('/home/profile')
            },
            {
                key: `marketPlace`,
                icon: React.createElement(ShopOutlined),
                label: `MARKET PLACE`,
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
        ]
        return (<div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[this.state.content || 'history']}
                        items={items3}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
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
                        className="site-layout-background"
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
