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
    HeartOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { Component, useState } from 'react';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';

import Profile from './profile';
import History from './history';
import Settings from './settings';
// import Donate from './donate';

const { Header, Sider, Content } = Layout;

const redirectToPath = (path) => {
    const url = new URL(document.location.href);
    document.location.href = `${url.origin}${path}`;
};

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            content: 'profile',
            navigateTo: '/home'
        }
    }

    redirectToPath = (value) => {
        this.setState({
            navigateTo: value
        })
    }

    setCollapsed = () => {
        this.setState({
            ...this.state,
            collapsed: !this.state.collapsed
        })
    }
    setContent = (value) => {
        this.setState({
            ...this.state,
            content: value
        })
    }
    render() {
        let userLogonDetails = JSON.parse(localStorage.getItem('userLogonDetails'));
        if (!userLogonDetails.signInStatus) {
            this.redirectToPath('/');
        }
        const items3 = [
            // {
            //     key: `donate`,
            //     icon: React.createElement(HeartOutlined),
            //     label: `DONATE`,
            //     onClick: () => setContent('donate'),
            // },
            {
                key: `profile`,
                icon: React.createElement(UserOutlined),
                label: `PROFILE`,
                onClick: () => {
                    this.setContent('profile');
                    this.redirectToPath('/home/profile');
                }
            },
            {
                key: `history`,
                icon: React.createElement(HistoryOutlined),
                label: `HISTORY`,
                onClick: () => {
                    this.setContent('history');
                    this.redirectToPath('/home/history');
                }
            },
            {
                key: 'logout',
                icon: React.createElement(LogoutOutlined),
                label: 'LOGOUT',
                onClick: () => {
                    userLogonDetails.signInStatus = false;
                    localStorage.setItem('userLogonDetails', JSON.stringify(userLogonDetails));
                    this.redirectToPath('/');
                }
            }
        ]
        return (<div>
            {!userLogonDetails.signInStatus ? (<Navigate to={'/'} />) : (
                < Layout >
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="inline"
                            // defaultSelectedKeys={['profile']}
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
                                onClick: () => this.setCollapsed,
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
                            {/* {content === 'history' && <History />} */}
                            {/* {content === 'donate' && <Donate />} */}
                            {this.state.content === 'settings' && <Settings props={this.props}/>}
                            {(this.state.content === 'profile' || this.props.tab === 'profile') && <Profile props={this.props}/>}
                            {(this.state.content === 'history' || this.props.tab === 'history') && <History props={this.props}/>}
                        </Content>
                    </Layout>
                </Layout>
            )}
        </div >);
    }
}

export default Test;
