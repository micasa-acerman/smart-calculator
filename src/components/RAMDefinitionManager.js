import { Grid, Button, ButtonGroup, FormGroup, TextField } from '@mui/material';
import { Field, FieldArray } from 'formik';
import React from 'react';

function RAMDefinitionManager() {
  return (
    <FieldArray
      name="variables"
      render={({ push, pop, form: { values } }) => (
        <>
          <FormGroup sx={{ my: 2 }}>
            <ButtonGroup
              variant="outlined"
              color="secondary"
              aria-label="outlined secondary button group"
            >
              <Button onClick={() => push({ v: 0, n: 0 })}>Добавить</Button>
              <Button onClick={() => pop()}>Убрать</Button>
            </ButtonGroup>
          </FormGroup>
          <Grid container spacing={2}>
            {values.variables.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} md={6}>
                  <Field name={`variables.${index}.n`}>
                    {({ field }) => (
                      <TextField
                        fullWidth
                        label={`Количество обращений ${index + 1}`}
                        value={item}
                        {...field}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} key={index}>
                  <Field key={index} name={`variables.${index}.v`}>
                    {({ field }) => (
                      <TextField
                        fullWidth
                        label={`Объем оперативной памяти ${index + 1}`}
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

export default RAMDefinitionManager;
