import { useEffect, useState } from "react";

const OfferTimer = ({ endTime, onExpiry }) => {
  // Core dynamic mathematical milliseconds lookup engine
  const calculateTimeLeft = () => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // 🎯 Isolated ticking stream: Iska impact bas is single tiny node text ke upar hi active rahega
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      if (Object.keys(remaining).length === 0) {
        clearInterval(timer);
        if (onExpiry) onExpiry(); // Auto triggers re-fetch functions natively on timer endpoints
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (Object.keys(timeLeft).length === 0) {
    return (
      <span className="badge bg-secondary-subtle text-secondary border px-2 py-1 small fw-bold rounded-2">
        Deal Ended
      </span>
    );
  }

  return (
    <div className="d-inline-flex align-items-center gap-1.5 px-2.5 py-1 rounded-2 border bg-danger-subtle text-danger fw-bold" style={{ fontSize: "12px", borderColor: '#f8d7da' }}>
      <i className="bi bi-stopwatch animate-pulse"></i>
      <span>
        {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}
        {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")} left
      </span>
    </div>
  );
};

export default OfferTimer;