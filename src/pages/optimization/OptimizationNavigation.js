import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Card from 'src/components/Card/Card';

const CARDS = [
  {
    link: '/dashboard/optimization/ram',
    front: <h2>Оптимизация управления данными в иерархической памяти ЭВМ</h2>,
    back: <Typography>Регрессионный анализ методом МНК</Typography>,
    frontend: true
  },
  {
    link: '/dashboard/optimization/ts',
    front: <h2>Управление арендой транспортных средств</h2>,
    back: (
      <Typography component="span" variant="body2">
        Транспортная компания заключила договор на двунаправленную транспортировку продуктов между
        населенными пунктами «А» и «В» в течение некоторого периода времени, причем объем перевозок
        в этот период задан. Компания обладает возможностью арендовать парк транспортных средств.
        Требуется так организовать аренду транспортных средств, чтобы, выполнив договор,
        минимизировать транспортные издержки.
      </Typography>
    ),
    frontend: true
  },
  {
    link: '/dashboard/optimization/tech',
    front: <h2>Управление комплексом подсистем технической подготовки производства</h2>,
    back: (
      <Typography component="span" variant="body2">
        Требуется создать пакет программ, реализующий ряд функций подсистемы технологической
        подготовки производства: требуется на планируемый отрезок времени сформировать:
        <ul>
          <li>портфель заказов;</li>
          <li>
            заказы на необходимые для его выполнения ресурсы (энергоресурсы, сырье и заготовки,
            оснастка станков, ЗИП и т.п.) с учетом имеющихся запасов таким образом, чтобы прибыль
            предприятия была максимальной. При этом следует учитывать ограничения, которые могут
            существовать на приобретение определенных видов ресурсов.
          </li>
        </ul>
        В приводимой ниже формальной постановке задачи используются следующие обозначения и
        определения:
      </Typography>
    ),
    frontend: true
  }
];

function OptimizationNavigation() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom textAlign="center">
            Оптимизация технологических процессов
          </Typography>
        </Grid>
        {CARDS.map((props) => (
          <Card key={props.link || props.href} {...props} />
        ))}
      </Grid>
    </Container>
  );
}

export default OptimizationNavigation;
