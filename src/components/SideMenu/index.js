import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TeamOutlined,
  DesktopOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const menuItems = [
    {
      key: "1",
      title: "Course",
      link: "/student/course",
      icon: <AppstoreOutlined />,
    },
    {
      key: "2",
      title: "Current Course",
      link: "/student/CurrentCourse",
      icon: <ReadOutlined />,
    },
    {
      key: "3",
      title: "Team",
      link: "/student/team",
      icon: <TeamOutlined />,
    },
  ];

  return (
    <>
      <Menu defaultSelectedKeys={["1"]}>
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
}

export default SideMenu;
