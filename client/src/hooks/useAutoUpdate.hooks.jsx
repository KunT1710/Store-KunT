import { useState, useEffect } from 'react';

function getCurrentMarket() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 6 && hour < 12) return "morning-market";
  if (hour >= 12 && hour < 20) return "afternoon-market";
  return "night-market";
}

function getCurrentFlashSale() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 6 && hour < 12) return "flash-morning";
  if (hour >= 12 && hour < 18) return "flash-noon";
  return "flash-evening";
}

function useAutoUpdate() {
  const [selectedMarket, setSelectedMarket] = useState(getCurrentMarket());
  const [selectedFlash, setSelectedFlash] = useState(getCurrentFlashSale());

  useEffect(() => {
    function getMsUntilNextSlot() {
      const now = new Date();
      const hour = now.getHours();
      // const minute = now.getMinutes();
      // const second = now.getSeconds();
      // const ms = now.getMilliseconds();

      const marketChangeHours = [6, 12, 20];
      const flashChangeHours = [6, 12, 18];

      const changeHours = [...new Set([...marketChangeHours, ...flashChangeHours])];


      const nextChangeHour = changeHours.find(h => h > hour) ?? changeHours[0] + 24;


      const nextChange = new Date(now);
      nextChange.setHours(nextChangeHour % 24, 0, 0, 0);

      return nextChange.getTime() - now.getTime();
    }

    function updateAndSchedule() {
      setSelectedMarket(getCurrentMarket());
      setSelectedFlash(getCurrentFlashSale());

      const delay = getMsUntilNextSlot();
      timerRef.current = setTimeout(updateAndSchedule, delay);
    }

    const timerRef = { current: null };
    updateAndSchedule(); 

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { selectedMarket, selectedFlash };
}

export default useAutoUpdate;