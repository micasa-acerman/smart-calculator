import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Page from 'src/components/Page';
import VariablesManager from 'src/components/VariablesManager';
import { calculateIntegral } from 'src/utils/montecarlo';

function CalculateExtremumPage() {
  const [result, setResult] = useState(null);

  const handleSubmit = (values) => {
    const result = calculateIntegral(values.function, values.variables, values.eps);
    setResult(`Результат: ${result[1].toFixed(4)}`);
  };

  return (
    <Page title="Нахождение экстремума ф-ции методом Монте-Карло">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Нахождение экстремума ф-ции методом Монте-Карло
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            variables: [{ min: 0, max: 2 }],
            eps: 0.01,
            function: 'x1*Math.exp(-x1)'
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Grid container direction="column">
                  <Field name="function">
                    {({ field }) => <TextField sx={{ my: 2 }} label="Функция" {...field} />}
                  </Field>
                  <Field name="eps">
                    {({ field }) => <TextField sx={{ my: 2 }} label="Погрешность" {...field} />}
                  </Field>
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

export default CalculateExtremumPage;
