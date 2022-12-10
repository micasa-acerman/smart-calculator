import { Grid, Typography } from '@mui/material';
import React from 'react';
import Card from 'src/components/Card/Card';
import CalculateIcon from '@mui/icons-material/Calculate';
import SsidChartOutlinedIcon from '@mui/icons-material/SsidChartOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const CARDS = [
  {
    link: '/dashboard/mnk',
    front: (
      <Grid>
        <SsidChartOutlinedIcon style={{ fontSize: 60 }} />
        <h2>Регрессионный анализ</h2>
      </Grid>
    ),
    back: <Typography>Регрессионный анализ методом МНК</Typography>,
    frontend: true
  },
  {
    link: '/dashboard/calculator',
    front: (
      <Grid>
        <CalculateIcon style={{ fontSize: 60 }} />
        <h2>Универсальный калькулятор</h2>
      </Grid>
    ),
    back: (
      <Typography component="span" variant="body2">
        Позволяет рассчитывать математические выражения. В калькуляторе можно использовать
        тригонометрические, показательные, логарифмические функции и т.д.
      </Typography>
    ),
    frontend: true
  },
  {
    link: '/dashboard/optimization',
    front: (
      <Grid>
        <CorporateFareOutlinedIcon style={{ fontSize: 60 }} />
        <h2>Оптимизация технологичных процессов</h2>
      </Grid>
    ),
    back: <Typography>Оптимизация технологичных процессов</Typography>
  },
  {
    link: '/dashboard/functions',
    front: (
      <Grid>
        <TimelineOutlinedIcon style={{ fontSize: 60 }} />
        <h2>Экстремум</h2>
      </Grid>
    ),
    back: <Typography>Нахождение экстремума ф-ций приближенными методами</Typography>
  },
  {
    link: '/dashboard/integrals',
    front: (
      <Grid>
        <FunctionsOutlinedIcon style={{ fontSize: 60 }} />
        <h2>Интегралы</h2>
      </Grid>
    ),
    back: <Typography>Модуль для решения определенных интегралов приближенными методами</Typography>
  },
  {
    link: '/dashboard/equations',
    front: (
      <Grid>
        <BrokenImageOutlinedIcon style={{ fontSize: 60 }} />
        <h2>Корень уравнения</h2>
      </Grid>
    ),
    back: <Typography>Нахождение корней уравнения</Typography>
  },
  {
    link: '/dashboard/differential-equations',
    front: (
      <Grid>
        <TrendingUpIcon style={{ fontSize: 60 }} />
        <h2>Дифференциальные уравнения</h2>
      </Grid>
    ),
    back: <Typography>Решение дифференциальных уравнений</Typography>
  }
];

function MainNavigation() {
  return CARDS.map((props) => <Card key={props.link || props.href} {...props} />);
}

export default MainNavigation;
