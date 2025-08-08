import React from "react";
import "./selection.sale.scss";
import CountdownClock from "./countdown.Clock";

function SelectionSale({ selectedTab, onChangeTab, currentMarketLabel, currentFlashLabel, onFlashSaleEnd }) {

  function getNextFlashSaleTime() {
    const now = new Date();
    const hour = now.getHours();
    const flashHours = [6, 12, 18]; 
    let nextHour = flashHours.find(h => h > hour);
    if (!nextHour) {
      nextHour = flashHours[0] + 24; 
    }
    const nextFlashTime = new Date(now);
    nextFlashTime.setHours(nextHour, 0, 0, 0);
    return nextFlashTime;
  }

  const nextFlashSaleTime = getNextFlashSaleTime();
  
  return (
    <div className="selection-sale">
      <span
        className={`sale-time${selectedTab === "market" ? " active" : ""}`}
        onClick={() => onChangeTab("market")}
      >
        {currentMarketLabel}
      </span>

      <div
        className={`counter-sale${selectedTab === "flash" ? " active-counter" : ""
          }`}
        onClick={() => onChangeTab("flash")}
      >
        <span className="flash-text">{currentFlashLabel}</span>
        <CountdownClock targetTime={nextFlashSaleTime} onFlashSaleEnd={onFlashSaleEnd} />
      </div>

      <span
        className={`view-all-sale${selectedTab === "all" ? " active" : ""}`}
        onClick={() => onChangeTab("all")}
      >
        Tất cả khuyến mãi
      </span>
    </div>
  );
}

export default SelectionSale;
