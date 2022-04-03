import { Button, ButtonGroup, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { Field, FieldArray } from 'formik';
import React from 'react';
import { getVariableNameByIndex, getVariableNames } from 'src/utils/variables';

function VariablesManager() {
  return (
    <FieldArray
      name="variables"
      render={({ push, pop, form: { values } }) => (
        <>
          <FormGroup sx={{ mt: 2 }}>
            <Typography>
              Переменные: {getVariableNames(values.variables.length).join(',')}
            </Typography>
          </FormGroup>
          <FormGroup sx={{ my: 2 }}>
            <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
              <Button onClick={() => push({ min: 0, max: 1 })}>Добавить</Button>
              <Button onClick={() => pop()}>Убрать</Button>
            </ButtonGroup>
          </FormGroup>
          {values.variables.map((item, index) => (
            <Grid container key={index} spacing={2}>
              <Grid item xs={12} md={6}>
                <Field name={`variables.${index}.min`}>
                  {({ field }) => (
                    <TextField
                      fullWidth
                      sx={{ mr: 1 }}
                      label={`Мин значение ${getVariableNameByIndex(index)}`}
                      value={item}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field key={index} name={`variables.${index}.max`}>
                  {({ field }) => (
                    <TextField
                      fullWidth
                      label={`Макс значение ${getVariableNameByIndex(index)}`}
                      value={item}
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    />
  );
}

export default VariablesManager;
