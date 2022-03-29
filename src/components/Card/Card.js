import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

function Card({ front, back, link, href }) {
  return (
    <Grid item xs={3}>
      {link ? (
        <Link to={link}>
          <div className="cardContainer">
            <div className="card">
              <div className="front">{front}</div>
              <div className="back">{back}</div>
            </div>
          </div>
        </Link>
      ) : (
        <a href={href}>
          <div className="cardContainer">
            <div className="card">
              <div className="front">{front}</div>
              <div className="back">{back}</div>
            </div>
          </div>
        </a>
      )}
    </Grid>
  );
}

export default Card;
