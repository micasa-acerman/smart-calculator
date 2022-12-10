import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Page from 'src/components/Page';
import VariablesManager from 'src/components/VariablesManager';
import { calculateFunctionRoot } from 'src/utils/montecarlo';
import { getVariableNameByIndex } from 'src/utils/variables';

function CalculateEquationsRootPage() {
  const [result, setResult] = useState(null);

  const handleSubmit = (values) => {
    if (values.function.replaceAll('=', '').length + 1 !== values.function.length) {
      alert("В уравнении должен присутствовать символ '='");
      return;
    }
    const result = calculateFunctionRoot(values.function, values.variables, values.eps);
    const countDigits = `${values.eps}`.split('.')[1].length + 1;
    setResult(
      `Значение переменных: ${result[0].map(
        (v, i) => `${getVariableNameByIndex(i)}=${(+v).toFixed(countDigits)}`
      )} Отклонение: ${result[1].toFixed(countDigits)}`
    );
  };

  return (
    <Page title="Вычисление корня ур-ния нескольких переменных">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Вычисление корня ур-ния нескольких переменных
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            variables: [{ min: 0, max: 2 }],
            eps: 0.01,
            function: 'x1**3=8'
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
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

export default CalculateEquationsRootPage;
