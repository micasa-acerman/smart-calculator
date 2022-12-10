import { Grid, useMediaQuery } from '@mui/material';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDoubleClick from 'use-double-click';
import './card.css';

function Card({ front, back, link, href, backend, frontend }) {
  const navigate = useNavigate();
  const isMobileMatch = useMediaQuery('(max-width:600px)');
  const cardRef = useRef();

  useDoubleClick({
    onSingleClick: () => {
      if (isMobileMatch) return;
      if (link) navigate(link);
      else window.open(href);
    },
    onDoubleClick: () => {
      if (link) navigate(link);
      else window.open(href);
    },
    ref: cardRef,
    latency: 250
  });
  const label = (
    <>
      {frontend && (
        <div className="label" title="Вычисления для расчета выполняются на вашей ЭВМ">
          Ваша машина
        </div>
      )}
      {backend && (
        <div className="label" title="Вычисления производятся на сервере">
          Сервер
        </div>
      )}
    </>
  );

  const rootCls = [
    'cardContainer',
    backend && 'cardContainerBackend',
    frontend && 'cardContainerFrontend'
  ]
    .filter((x) => x)
    .join(' ');

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div className={rootCls} ref={cardRef}>
        <div className="card">
          <div className="front">
            {front}
            {label}
          </div>
          <div className="back">
            {back}
            {label}
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default Card;
