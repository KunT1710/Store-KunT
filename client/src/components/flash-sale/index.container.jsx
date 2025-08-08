import React, { useState } from "react";
import useAutoUpdate from "../../hooks/useAutoUpdate.hooks";
import { useFetch } from "../../hooks/useFetch.hooks";
import FlashSale from "./index";

const MARKET_ENDPOINTS = {
  "morning-market": "http://localhost:5000/api/product-sales/market/morningMarket",
  "afternoon-market": "http://localhost:5000/api/product-sales/market/afternoonMarket",
  "night-market": "http://localhost:5000/api/product-sales/market/nightMarket",
};

const FLASH_ENDPOINTS = {
  "flash-morning": "http://localhost:5000/api/product-sales/flash/morning",
  "flash-noon": "http://localhost:5000/api/product-sales/flash/noon",
  "flash-evening": "http://localhost:5000/api/product-sales/flash/evening",
};

function getMarketLabel(market) {
  switch (market) {
    case "morning-market": return "Chợ sáng 6h-12h";
    case "afternoon-market": return "Chợ chiều 12h-20h";
    case "night-market": return "Chợ đêm 20h-6h";
    default: return "";
  }
}
function getFlashLabel(flash) {
  switch (flash) {
    case "flash-morning": return "Khuyến mãi khủng";
    case "flash-noon": return "Flash Sale";
    case "flash-evening": return "Ưu đãi đặc biệt";
    default: return "";
  }
}

export default function FlashSaleContainer() {
  const [selectedTab, setSelectedTab] = useState("market");
  const [refreshKey, setRefreshKey] = useState(0); 
  const { selectedMarket, selectedFlash } = useAutoUpdate();

  // console.log("DEBUG ENDPOINT: ",MARKET_ENDPOINTS[selectedMarket]);

  const { data: marketData = [], loading: loadingMarket } = useFetch(MARKET_ENDPOINTS[selectedMarket], refreshKey);
  const { data: flashData = [], loading: loadingFlash } = useFetch(FLASH_ENDPOINTS[selectedFlash], refreshKey);

  const currentMarketLabel = getMarketLabel(selectedMarket);
  const currentFlashLabel = getFlashLabel(selectedFlash);

  const handleFlashSaleEnd = () => {
    console.log("Flash sale đã kết thúc, đang refresh dữ liệu...");
    setRefreshKey(prev => prev + 1); 
  };

  return (
    <FlashSale
      products={marketData}
      flashProducts={flashData}
      selectedTab={selectedTab}
      onChangeTab={setSelectedTab}
      currentMarketLabel={currentMarketLabel}
      currentFlashLabel={currentFlashLabel}
      loading={loadingMarket || loadingFlash}
      onFlashSaleEnd={handleFlashSaleEnd}
    />
  );
}