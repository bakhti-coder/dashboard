import { useState } from "react";
import {
    LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme, Modal } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

import "./Admin.css";
import { TOKEN } from "../../constants/Token";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logOut = () => {
    Modal.confirm({
      title: "Do you want to exit?",
      onOk: () => {
        navigate("/login");
        // setIsLogin(false);
        localStorage.removeItem(TOKEN);
      },
    });
  };

  return (
    <Layout>
      <Sider
        className="sidebar-admin"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="admin-title">Admin</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/teachers",
              icon: <VideoCameraOutlined />,
              label: <Link to="/teachers">Teachers</Link>,
            },
            {
              key: "/students",
              icon: <UploadOutlined />,
              label: <Link to="/students">Students</Link>,
            },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: <Button type="primary" danger onClick={logOut}>Logout</Button>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="admin-content"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
