import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Card from 'src/components/Card/Card';

const CARDS = [
  {
    href: 'http://back.calc-skgmi.ru/Differential',
    front: <h2>Решение обыкновенных дифференциальных уравнений методом Эйлера</h2>,
    back: <Typography>Решение обыкновенных дифференциальных уравнений методом Эйлера</Typography>,
    backend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/Differential',
    front: <h2>Решение обыкновенных дифференциальных уравнений методом Рунге-Кута</h2>,
    back: (
      <Typography>Решение обыкновенных дифференциальных уравнений методом Рунге-Кута</Typography>
    ),
    backend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/Differential',
    front: <h2>Решение обыкновенных дифференциальных уравнений метод Эйлера-Коши</h2>,
    back: (
      <Typography>Решение обыкновенных дифференциальных уравнений метод Эйлера-Коши</Typography>
    ),
    backend: true
  }
];

function DifferentialEquationsNavigation() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom textAlign="center">
            Вычисление дифференциальных уравнений
          </Typography>
        </Grid>
        {CARDS.map((props) => (
          <Card key={props.link || props.href} {...props} />
        ))}
      </Grid>
    </Container>
  );
}

export default DifferentialEquationsNavigation;
