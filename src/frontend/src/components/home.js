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
import React, { useState } from 'react';
import { connect } from "react-redux";

import Profile from './profile';
import History from './history';
import Settings from './settings';
// import Donate from './donate';

const { Header, Sider, Content } = Layout;

const redirectToPath = (path) => {
    const url = new URL(document.location.href);
    document.location.href = `${url.origin}${path}`;
};

const App = () => {
    let userLogonDetails = JSON.parse(localStorage.getItem('userLogonDetails'));
    if (!userLogonDetails.signInStatus) {
        redirectToPath('/');
    }
    const [collapsed, setCollapsed] = useState(false);
    const [content, setContent] = useState('history');
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
        onClick: () => setContent('profile'),
    },
    // {
    //     key: `history`,
    //     icon: React.createElement(HistoryOutlined),
    //     label: `HISTORY`,
    //     onClick: () => setContent('history'),
    // },
    {
        key: `settings`,
        icon: React.createElement(SettingOutlined),
        label: `SETTINGS`,
        onClick: () => setContent('settings'),
    },
    {
        key: 'logout',
        icon: React.createElement(LogoutOutlined),
        label: 'LOGOUT',
        onClick: () => {
            userLogonDetails.signInStatus = false;
            localStorage.setItem('userLogonDetails', JSON.stringify(userLogonDetails));
            redirectToPath('/');
        }
    }
    ]
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
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
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
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
                    {content === 'profile' && <Profile />}
                    {/* {content === 'history' && <History />} */}
                    {/* {content === 'donate' && <Donate />} */}
                    {content === 'settings' && <Settings />}
                </Content>
            </Layout>
        </Layout>
    );
};



const mapDispatchToProps = dispatch => {
    return {
        // onSubmitLoginAction,
    }
}
const mapStateToProps = state => ({
    // user_id,
})
export default connect(mapStateToProps, mapDispatchToProps)(App);

//   export default App;


//   export default App;
// import { LaptopOutlined, NotificationOutlined, UserOutlined, HistoryOutlined, SettingOutlined } from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu } from 'antd';
// import React , { useState } from 'react';
// import {
//     MenuFoldOutlined,
//     MenuUnfoldOutlined,
//     UploadOutlined,
//     VideoCameraOutlined,
//   } from '@ant-design/icons';
// const { Header, Content, Footer, Sider } = Layout;
// const items1 = ['1', '2', '3'].map((key) => ({
//     key,
//     label: `nav ${key}`,
// }));

// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//     const key = String(index + 1);
//     return {
//         key: `sub${key}`,
//         icon: React.createElement(icon),
//         label: `subnav ${key}`,
//         children: new Array(4).fill(null).map((_, j) => {
//             const subKey = index * 4 + j + 1;
//             return {
//                 key: subKey,
//                 label: `option${subKey}`,
//             };
//         }),
//     };
// });

// const App = () => {
//     const [collapsed, setCollapsed] = useState(false);
//     return (
//       <Layout>
//         <Sider trigger={null} collapsible collapsed={collapsed}>
//           <div className="logo" />
//           <Menu
//             theme="dark"
//             mode="inline"
//             defaultSelectedKeys={['1']}
//             items={items3}
//           />
//         </Sider>
//         <Layout className="site-layout">
//           <Header
//             className="site-layout-background"
//             style={{
//               padding: 0,
//             }}
//           >
//             {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//               className: 'trigger',
//               onClick: () => setCollapsed(!collapsed),
//             })}
//           </Header>
//           <Content
//             className="site-layout-background"
//             style={{
//               margin: '24px 16px',
//               padding: 24,
//               minHeight: 280,
//             }}
//           >
//             Content
//           </Content>
//         </Layout>
//       </Layout>
//     );
//   };

// export default App;
