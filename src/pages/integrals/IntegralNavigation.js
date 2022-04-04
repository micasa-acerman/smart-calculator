import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Card from 'src/components/Card/Card';

const CARDS = [
  {
    link: '/dashboard/integrals/monte-carlo',
    front: <h2>Кратные интегралы методом Монте-Карло</h2>,
    back: <Typography>Кратные интегралы методом Монте-Карло</Typography>,
    frontend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/Integrals',
    front: <h2>Решение простых интегралов методом прямоугольников</h2>,
    back: <Typography>Решение простых интегралов методом прямоугольников</Typography>,
    backend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/Integrals',
    front: <h2>Решение простых интегралов методом трапеций</h2>,
    back: <Typography>Решение простых интегралов методом трапеций</Typography>,
    backend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/Integrals',
    front: <h2>Решение простых интегралов методом Гаусса</h2>,
    back: <Typography>Решение простых интегралов методом Гаусса</Typography>,
    backend: true
  },
  {
    href: 'http://back.calc-skgmi.ru/Integrals',
    front: <h2>Решение простых интегралов методом Симпсона</h2>,
    back: <Typography>Решение простых интегралов методом Симпсона</Typography>,
    backend: true
  }
];

function IntegralNavigation() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom textAlign="center">
            Вычисление интегралов
          </Typography>
        </Grid>
        {CARDS.map((props) => (
          <Card key={props.link || props.href} {...props} />
        ))}
      </Grid>
    </Container>
  );
}

export default IntegralNavigation;
