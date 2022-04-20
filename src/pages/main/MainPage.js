import { Alert, AlertTitle, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import MainNavigation from './MainNavigation';
import LogoIcon from './skgmi.png';
import MobileIcon from './mobile.png';
import './mainPage.css';

function MainPage() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={2}>
          <img src={LogoIcon} alt="logo" />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h1" gutterBottom textAlign="center">
            Универсальный вычислительный модуль
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Универсальный вычислительный онлайн модуль для расчета определенных интегралов, значений
            диф. уравнений, проведения регрессионного анализа и т.д. на работе, учёбе или дома. В
            модуле присутствует:
            <ul className="list">
              <li>
                Универсальный калькулятор для расчета арифметических, тригонометрических,
                логарифмических выражений.
              </li>
              <li>Вычисление коэффициентов регрессионных функций по точкам методом МНК.</li>
              <li>Вычисления Д/У.</li>
              <li>Нахождение значения определенного интеграла.</li>
              <li>Вычисления экстремума функции.</li>
              <li>Вычисление корней уравнения приближенными методами.</li>
            </ul>
          </Typography>
        </Grid>

        <Grid sx={{ p: 2, pt: 4 }} item xs={12} sm={8} md={9}>
          <Typography>
            Вы можете загрузить на свое устройство универсальный вычислительный калькулятор в виде{' '}
            <strong>мобильного приложения</strong>. Для этого скачайте мобильное приложения и
            установите его на свое устройства (ссылка расположена правее).
          </Typography>
        </Grid>
        <Grid sx={{ pt: 4, pb: 2 }} item xs={8} sm={4} md={3}>
          <Box>
            <a href="https://disk.yandex.ru/d/jJM7YptoS0zjEA">
              <img src={MobileIcon} alt="Google Play" />
            </a>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Alert severity="info" sx={{ my: 2 }}>
            <AlertTitle>Информация для разработчиков</AlertTitle>
            Если у вас есть программная реализация оптимизационной задачи или любой другой, то мы
            можем ее добавить на нашу платформу. По поводу предложений можете писать разработчикам
            на адрес <a href="email:mrikaevkm@vk.com">mrikaevkm@vk.com</a>.
          </Alert>
        </Grid>
        <MainNavigation />
      </Grid>
    </Container>
  );
}

export default MainPage;
