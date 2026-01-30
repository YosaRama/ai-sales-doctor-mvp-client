import React from "react";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "@tanstack/react-router";

type MenuItem = Required<MenuProps>["items"][number];

export const NavigationItems = () => {
  const navigate = useNavigate();

  function getItem({
    label,
    key,
    icon,
    children,
    onClick,
  }: {
    label: React.ReactNode;
    key: React.Key;
    icon?: React.ReactNode;
    children?: MenuItem[];
    onClick?: () => void;
  }): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      onClick,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem({
      label: "Leads Data",
      key: "leads",
      icon: <UserOutlined />,
      onClick: () => {
        navigate({ to: "/dashboard/leads" });
      },
    }),
  ];

  return items;
};
