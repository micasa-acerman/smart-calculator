import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Page from 'src/components/Page';
import RAMDefinitionManager from 'src/components/RAMDefinitionManager';
import { EnumerationMethod } from 'src/utils/methods';

function RAMOptimizationPage() {
  const [result, setResult] = useState(null);
  const handleSubmit = (values) => {
    const V = +values.v;
    const params = values.variables;
    const d1 = new Date();
    const result = EnumerationMethod(params.length, goalFunction, comparator);
    setResult(
      <>
        <div>Результат: {result.record}</div>
        <div>Перестановка: z=[{result.recordPer.join(',')}]</div>
        <div>Время вычисления: {new Date() - d1}</div>
      </>
    );

    function goalFunction(z) {
      let a = 0;
      let b = 0;
      z.forEach((item, i) => {
        if (item) {
          a += +params[i].n;
          b += +params[i].v;
        }
      });
      console.log(z.join(''), V < b ? null : a);
      return V < b ? 0 : a;
    }
    function comparator(a, b) {
      return a > b;
    }
  };
  return (
    <Page title="Оптимального управления данными в иерархической памяти ЭВМ">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Оптимального управления данными в иерархической памяти ЭВМ
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            variables: [
              { n: 10, v: 10 },
              { n: 9, v: 9 },
              { n: 10, v: 1 }
            ],
            v: 10
          }}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field name="v">
                  {({ field }) => (
                    <TextField
                      sx={{ mr: 1, mb: 2 }}
                      fullWidth
                      label="Общий объем оперативной памяти"
                      {...field}
                    />
                  )}
                </Field>
                <Button fullWidth variant="contained" type="submit">
                  Рассчитать
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {result && <Alert severity="success">{result}</Alert>}
              </Grid>
            </Grid>
            <RAMDefinitionManager />
          </Form>
        </Formik>
      </Container>
    </Page>
  );
}

export default RAMOptimizationPage;
