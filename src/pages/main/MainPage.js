import { Alert, AlertTitle, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import MainNavigation from './MainNavigation';
import './mainPage.css';

function MainPage() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1" gutterBottom textAlign="center">
            Универсальный вычисляющий модуль
          </Typography>
          <Typography>
            Универсальный вычисляющий онлайн модуль для расчета определенных интегралов, значений
            диф. уравнений, проведения регрессионого анализа и т.д. на работе, учёбе или дома. В
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
          <Alert severity="info" sx={{ my: 2 }}>
            <AlertTitle>Информация для разработчиков</AlertTitle>
            Если у вас есть программная реализация оптимизационной задачи или любой другой, то мы
            можем ее добавить на нашу платформу. По поводу предложений можете писать разработчикам
            на адрес <a href="email:mrikaevkm@vk.com">mrikaevkm@vk.com</a>
          </Alert>
        </Grid>
        <MainNavigation />
      </Grid>
    </Container>
  );
}

export default MainPage;
