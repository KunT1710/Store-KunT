import React, { useEffect, useState } from "react";

function getTimeLeft(targetTime) {
  const now = new Date();
  const diff = targetTime.getTime() - now.getTime();

  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

function CountdownClock({ targetTime, onFlashSaleEnd }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetTime));
  const [hasTriggeredEnd, setHasTriggeredEnd] = useState(false);

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetTime));
    setHasTriggeredEnd(false); 

    const interval = setInterval(() => {
      const newTimeLeft = getTimeLeft(targetTime);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0 && !hasTriggeredEnd) {
        setHasTriggeredEnd(true);
        if (onFlashSaleEnd) {
          onFlashSaleEnd();
        }
        console.log("Flash sale đã kết thúc!");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, onFlashSaleEnd, hasTriggeredEnd]);

  const isExpired = timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <>
      {isExpired ? (
        <div className="flash-expired">Đã kết thúc</div>
      ) : (
        <>
          <div className="time-box">{pad(timeLeft.hours)}</div>
          <div className="colon">:</div>
          <div className="time-box">{pad(timeLeft.minutes)}</div>
          <div className="colon">:</div>
          <div className="time-box">{pad(timeLeft.seconds)}</div>
        </>
      )}
    </>
  );
}

export default CountdownClock;
