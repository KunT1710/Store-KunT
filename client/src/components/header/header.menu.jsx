import React from "react";
import { Dropdown, Menu } from "antd";

const CategoryDropdown = ({ categories, onSelectCategory }) => {
  const menu = (
    <Menu
      onClick={({ key }) => onSelectCategory(key)}
      items={categories.map((cat) => ({
        key: cat.id,
        label: cat.name,
      }))}
    />
  );

  return (
    <Dropdown menu={menu} trigger={["click"]} placement="bottomLeft">
      <i className="iconfont icon-category" style={{ fontSize: 20, cursor: "pointer" }} />
    </Dropdown>
  );
};
export default CategoryDropdown;