import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const FooterClock = () => {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer>
      {time.format('HH:mm:ss dddd MMMM D, YYYY')}
    </footer>
  );
};

export default FooterClock;
