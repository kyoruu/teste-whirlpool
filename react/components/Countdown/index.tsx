import React, { useState, useEffect } from 'react';
import { index as RichText } from 'vtex.rich-text'

import "./styles.global.css";

type ComponentWithSchema<T, U> = React.FC<T> & { schema?: U };

interface CountdownSchema {
  title: string;
  type: string;
  description: string;
  properties: SchemaProps;
}

interface SchemaProps {
  text: {
    title: string;
    type: string;
    description: string;
    default: string;
    format: string;
  }
  title: {
    title: string;
    type: string;
    description: string;
    default: string;
    format: string;
  }
  endDate: {
    title: string;
    type: string;
    format: string;
    description: string;
    widget: {
      'ui:widget': string;
    };
  };
  banner: {
    title: string,
    type: string,
    widget: {
      'ui:widget': string,
    },
  };
  bannerMobile: {
    title: string,
    type: string,
    widget: {
      'ui:widget': string,
    },
  }
}

interface Props {
  endDate: string;
  text:string;
  title:string;
  banner:string;
  bannerMobile:string;
}

const Countdown: ComponentWithSchema<Props, CountdownSchema> = ({
  endDate = '11/24/2022 23:59:59',
  text,
  title,
  banner,
  bannerMobile
}) => {
  console.log( banner, bannerMobile)

  const calculateTimeLeft = () => {
    const now = new Date();
    const nextSecond = new Date(now);
    nextSecond.setSeconds(nextSecond.getSeconds() + 1);
    nextSecond.setMilliseconds(0);

    const target = new Date(endDate);
    if (nextSecond >= target) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    let difference = target.getTime() - nextSecond.getTime();

    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours: h, minutes: m, seconds: s };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      <div className='countdownContent'>
        <div className="countdownInfo">
          <span className="countdownText"><RichText text={text} /></span>
          <span className="countdownTile"><RichText text={title} /></span>
        </div>
        <div className="countdownTime">
          <span className="countdownTimeContent">
            <span className="countdownTimeText">{`${timeLeft.hours > 1 ? timeLeft.hours : '00'}`}</span>
            <span className="countdownTimeTwoPoints">:</span>
          </span>
          <span className="countdownTimeContent">
            <span className="countdownTimeText">{`${timeLeft.minutes < 10? `0${timeLeft?.minutes}` : timeLeft?.minutes}`}</span>
            <span className="countdownTimeTwoPoints">:</span>
          </span>
          <span className="countdownTimeContent">
            <span className="countdownTimeText">{`${timeLeft.seconds < 10? `0${timeLeft?.seconds}` : timeLeft?.seconds}`}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

Countdown.schema = {
  title: 'Countdown',
  description: 'Countdown Component',
  type: 'object',
  properties: {
    text: {
      title: 'texto do Contador',
      default: 'POR TEMPO LIMITADO',
      type: 'string',
      format: 'RichText',
      description: 'Texto de sucesso ',
    },
    title: {
      title: 'Titulo do Contador',
      default: 'Camisetas a partir de R$ 99,90',
      type: 'string',
      format: 'RichText',
      description: 'Titulo do Contador',
    },
    endDate: {
      description: 'FORMATO: MM/DD/YYYY hh:mm:ss',
      title: 'Data final do countdown',
      type: 'string',
      format: 'date-time',
      widget: {
        'ui:widget': 'datetime',
      },
    },
    banner: {
      title: 'Banner',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    bannerMobile: {
      title: 'Banner - Mobile',
      type: 'string',
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
  },
};

export default Countdown;
