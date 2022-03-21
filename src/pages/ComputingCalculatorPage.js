import { Alert, Button, Container, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import VariablesManager from 'src/components/VariablesManager';
import { Formik, Field, Form } from 'formik';
import {
  calculateFunctionExtremum,
  calculateFunctionRoot,
  calculateIntegral
} from 'src/utils/montecarlo';
import { getVariableNameByIndex } from 'src/utils/variables';
import Page from '../components/Page';

export default function ComputingCalculatorPage() {
  const [tab, setTab] = useState('one');
  const [result, setResult] = useState(null);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = (values) => {
    try {
      switch (tab) {
        case 'one': {
          const result = calculateIntegral(
            values.function,
            values.variables,
            values.iterations,
            values.integralLimit
          );
          setResult(`Результат: ${result.toFixed(4)}`);
          break;
        }
        case 'two': {
          const result = calculateFunctionExtremum(values.function, values.variables, values.eps);
          const countDigits = `${values.eps}`.split('.')[1].length + 1;
          setResult(
            `Значение переменных: ${result[0].map(
              (v, i) => `${getVariableNameByIndex(i)}=${v.toFixed(countDigits)}`
            )} Результат: ${result[1].toFixed(countDigits)}`
          );
          break;
        }

        case 'three': {
          const result = calculateFunctionRoot(values.function, values.variables, values.eps);
          const countDigits = `${values.eps}`.split('.')[1].length + 1;
          setResult(
            `Значение переменных: ${result[0].map(
              (v, i) => `${getVariableNameByIndex(i)}=${(+v).toFixed(countDigits)}`
            )} Результат: ${result[1].toFixed(countDigits)}`
          );
          break;
        }
        default:
          alert('Error');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Page title="Монте-Карло">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Монте-Карло
        </Typography>
        <Tabs value={tab} onChange={handleChange} aria-label="wrapped label tabs example">
          <Tab value="one" label="Кратные определенные интегралы" wrapped />
          <Tab value="two" label="Экстремум функций" />
          <Tab value="three" label="Корни функции" />
        </Tabs>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            variables: [{ min: 0, max: 2 }],
            eps: 0.01,
            function: 'x1*Math.exp(-x1)',
            iterations: 1000,
            integralLimit: { min: 0, max: 0.4 }
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Grid container direction="column">
                  <Field name="function">
                    {({ field }) => <TextField sx={{ my: 2 }} label="Функция" {...field} />}
                  </Field>
                  {tab === 'one' ? (
                    <>
                      <Field name="iterations">
                        {({ field }) => <TextField sx={{ my: 2 }} label="Итераций" {...field} />}
                      </Field>
                      <Grid container>
                        <Grid item md={6}>
                          <Field name="integralLimit.min">
                            {({ field }) => (
                              <TextField
                                sx={{ my: 2 }}
                                label="Мин значение подынтегральной функции"
                                {...field}
                              />
                            )}
                          </Field>
                        </Grid>
                        <Grid item md={6}>
                          <Field name="integralLimit.max">
                            {({ field }) => (
                              <TextField
                                sx={{ my: 2 }}
                                label="Мин значение подынтегральной функции"
                                {...field}
                              />
                            )}
                          </Field>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <Field name="eps">
                      {({ field }) => <TextField sx={{ my: 2 }} label="Погрешность" {...field} />}
                    </Field>
                  )}
                  {result && (
                    <Alert sx={{ my: 2 }} severity="success">
                      {result}
                    </Alert>
                  )}
                  <Button variant="contained" type="submit">
                    Рассчитать
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={6}>
                <VariablesManager />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Container>
    </Page>
  );
}
