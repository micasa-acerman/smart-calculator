import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Card from 'src/components/Card/Card';

const CARDS = [
  {
    link: '/dashboard/equations/root/monte-carlo',
    front: <h2>Вычисление корня ур-ния нескольких переменных</h2>,
    back: (
      <Typography>Вычисление корня ур-ния нескольких переменных методом Монте-Карло</Typography>
    ),
    frontend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/EquationRoot',
    front: <h2>Вычисление корня ур-ния одной переменной (метод хорд)</h2>,
    back: <Typography>Вычисление корня ур-ния одной переменной (метод хорд)</Typography>,
    backend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/EquationRoot',
    front: <h2>Вычисление корня ур-ния одной переменной (метод касательных)</h2>,
    back: <Typography>Вычисление корня ур-ния одной переменной (метод касательных)</Typography>,
    backend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/EquationRoot',
    front: (
      <h2>Вычисление корня ур-ния одной переменной (метод комбинированный хорд и касательных )</h2>
    ),
    back: (
      <Typography>
        Вычисление корня ур-ния одной переменной (метод комбинированный хорд и касательных )
      </Typography>
    ),
    backend: true
  }
];

function EquationsNavigation() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom textAlign="center">
            Вычисление корней ур-ний
          </Typography>
        </Grid>
        {CARDS.map((props) => (
          <Card key={props.link || props.href} {...props} />
        ))}
      </Grid>
    </Container>
  );
}

export default EquationsNavigation;
