import { Button, ButtonGroup, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { Field, FieldArray } from 'formik';
import React from 'react';

function TransportDefinitionManager() {
  return (
    <FieldArray
      name="variables"
      render={({ push, pop, form: { values } }) => (
        <>
          <FormGroup sx={{ my: 2 }}>
            <Typography>Переменные</Typography>
          </FormGroup>
          <FormGroup sx={{ my: 2 }}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button onClick={() => push({ c: 0, t: 0, m: 0 })}>Добавить</Button>
              <Button onClick={() => pop()}>Убрать</Button>
            </ButtonGroup>
          </FormGroup>
          <Grid container spacing={1}>
            {values.variables.map((item, index) => (
              <React.Fragment key={index}>
                <Grid key={index} item xs={12} md={4}>
                  <Field name={`variables.${index}.c`}>
                    {({ field }) => (
                      <TextField
                        sx={{ mr: 1 }}
                        fullWidth
                        label={`Стоимость единицы времени эксплуатации ${index + 1}`}
                        value={item}
                        {...field}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item key={index} xs={12} md={4}>
                  <Field key={index} name={`variables.${index}.t`}>
                    {({ field }) => (
                      <TextField
                        fullWidth
                        label={`Время, затрачиваемое ТС ${index + 1}`}
                        value={item}
                        {...field}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid key={index} item xs={12} md={4}>
                  <Field key={index} name={`variables.${index}.m`}>
                    {({ field }) => (
                      <TextField
                        fullWidth
                        label={`грузоподъемность ТС ${index + 1}`}
                        value={item}
                        {...field}
                      />
                    )}
                  </Field>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </>
      )}
    />
  );
}

export default TransportDefinitionManager;
