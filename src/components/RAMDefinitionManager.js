import { Box, Button, ButtonGroup, FormGroup, TextField, Typography } from '@mui/material';
import { Field, FieldArray } from 'formik';
import React from 'react';

function RAMDefinitionManager() {
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
              <Button onClick={() => push({ v: 0, n: 0 })}>Добавить</Button>
              <Button onClick={() => pop()}>Убрать</Button>
            </ButtonGroup>
          </FormGroup>
          {values.variables.map((item, index) => (
            <Box key={index} sx={{ m: 1 }}>
              <Field name={`variables.${index}.n`}>
                {({ field }) => (
                  <TextField
                    sx={{ mr: 1 }}
                    label={`Количество обращений ${index + 1}`}
                    value={item}
                    {...field}
                  />
                )}
              </Field>
              <Field key={index} name={`variables.${index}.v`}>
                {({ field }) => (
                  <TextField
                    label={`Объем оперативной памяти ${index + 1}`}
                    value={item}
                    {...field}
                  />
                )}
              </Field>
            </Box>
          ))}
        </>
      )}
    />
  );
}

export default RAMDefinitionManager;
