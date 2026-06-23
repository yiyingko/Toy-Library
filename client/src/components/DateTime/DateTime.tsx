import { useEffect, useState } from 'react';

function DateTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="date-time">
      <p className="date-time__date">Date: {date.toLocaleDateString()}</p>
      <p className="date-time__time">Time: {date.toLocaleTimeString()}</p>
    </div>
  );
}

export default DateTime;
