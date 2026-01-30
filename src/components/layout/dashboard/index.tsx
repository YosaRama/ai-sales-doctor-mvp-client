import { Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { Avatar, Badge, Layout, Menu } from "antd";
import styles from "./index.module.css";
import { NavigationItems } from "@/data/navigation";
import { BellFilled } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

export function LayoutDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const navItems = NavigationItems();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={styles.sider}
        width={"15%"}
      >
        <div className={styles.logo}>
          <img src="/logo.png" alt="logo" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["leads"]}
          mode="inline"
          items={navItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: "orangered" }}
          className="flex items-center justify-end !px-8"
        >
          <div className="flex items-center gap-6">
            <Badge count={5} color={"geekblue"}>
              <BellFilled style={{ fontSize: 24, color: "white" }} />
            </Badge>
            <Avatar src="/avatar.svg" alt="avatar" size={"large"} />
          </div>
        </Header>
        <Content style={{ margin: "20px 16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          AI Sales Doctor ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
