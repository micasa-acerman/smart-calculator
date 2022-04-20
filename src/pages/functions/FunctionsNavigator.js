import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Card from 'src/components/Card/Card';

const CARDS = [
  {
    link: '/dashboard/functions/extremum/monte-carlo',
    front: <h2>Нахождение экстремума ф-ции нескольких переменных методом Монте-Карло</h2>,
    back: (
      <Typography>Нахождение экстремума ф-ции нескольких переменных методом Монте-Карло</Typography>
    ),
    frontend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/Extremum',
    front: <h2>Поиск экстремума методом Монте-Карло</h2>,
    back: <Typography>Поиск экстремума методом Монте-Карло</Typography>,
    backend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/Extremum',
    front: <h2>Поиск экстремума методом градиентного спуска</h2>,
    back: <Typography>Поиск экстремума методом градиентного спуска</Typography>,
    backend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/Extremum',
    front: <h2>Поиск экстремума методом дихотомии</h2>,
    back: <Typography>Поиск экстремума методом дихотомии</Typography>,
    backend: true
  }
];

function FunctionsNavigator() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom textAlign="center">
            Вычисление экстремума функции
          </Typography>
        </Grid>
        {CARDS.map((props) => (
          <Card key={props.link || props.href} {...props} />
        ))}
      </Grid>
    </Container>
  );
}

export default FunctionsNavigator;
