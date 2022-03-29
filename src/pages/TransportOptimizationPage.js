import { Alert, Button, Container, FormControl, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Page from 'src/components/Page';
import TransportDefinitionManager from 'src/components/TransportDefinitionManager';
import { EnumerationMethod } from 'src/utils/methods';

function TransportOptimizationPage() {
  const [result, setResult] = useState(null);
  const handleSubmit = (values) => {
    console.log(values);
    const T = +values.T;
    const M = +values.M;
    const params = values.variables;
    const d1 = new Date();
    const result = EnumerationMethod(params.length, goalFunction, comparator);
    setResult(
      <>
        <div>Результат: {result.record}</div>
        <div>Перестановка: x=[{result.recordPer.join(',')}]</div>
        <div>Время вычисления: {new Date() - d1}</div>
      </>
    );

    function goalFunction(z) {
      let a = 0;
      let b = 0;
      z.forEach((item, i) => {
        if (item) {
          a += +params[i].c;
          b += (T / +params[i].t) * +params[i].m;
        }
      });
      console.log(z.join(''), M > b ? null : a * T);
      return M > b ? null : a * T;
    }
    function comparator(a, b) {
      return b === null && a !== null ? true : a < b;
    }
  };
  return (
    <Page title="Управление арендой транспортных средств">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Управление арендой транспортных средств
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            variables: [
              {
                c: 3,
                m: 5,
                t: 3
              },
              {
                c: 2,
                m: 7,
                t: 6
              },
              {
                c: 1,
                m: 15,
                t: 10
              }
            ],
            T: 10,
            M: 10
          }}
        >
          <Form>
            <FormControl>
              <Field name="T">
                {({ field }) => (
                  <TextField sx={{ mr: 1, my: 2 }} label="плановый период" {...field} />
                )}
              </Field>
              <Field name="M">
                {({ field }) => (
                  <TextField sx={{ mr: 1, my: 2 }} label="объем перевозок за время Т" {...field} />
                )}
              </Field>
              <Button variant="contained" type="submit">
                Рассчитать
              </Button>
              {result && <Alert severity="success">{result}</Alert>}
            </FormControl>
            <TransportDefinitionManager />
          </Form>
        </Formik>
      </Container>
    </Page>
  );
}

export default TransportOptimizationPage;
