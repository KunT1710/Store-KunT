import React, { useState } from "react";
import "./order.list.scss";

function OrderList() {
  const [activeTab, setActiveTab] = useState("Tất cả");

  const tabs = [
    "Tất cả",
    "Chờ thanh toán",
    "Vận chuyển",
    "Chờ giao hàng",
    "Hoàn thành",
    "Đã hủy",
    "Trả hàng/Hoàn tiền",
  ];

  return (
    <>
      <div className="container-orderList">
        <div className="order-status-header">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OrderList;
