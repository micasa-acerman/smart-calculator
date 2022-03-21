/* eslint-disable no-eval */
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  TextField,
  FormControl,
  Link
} from '@mui/material';
// components
import { useState } from 'react';
import Page from '../components/Page';
import Iconify from '../components/Iconify';

export default function CalculatorPage() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  return (
    <Page title="Калькулятор">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Калькулятор
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => {
              setResult(eval(expression));
            }}
          >
            Расчитать
          </Button>
        </Stack>

        <Card>
          <Box sx={{ m: 2 }}>
            <Alert severity="info" sx={{ my: 1 }}>
              Универсальный калькулятор. Поддерживает большое количество мат. операций. Так же вы
              можете использовать&nbsp;
              <Link href="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math">
                список математических функций
              </Link>
            </Alert>
            <FormControl fullWidth sx={{ my: 1 }}>
              <TextField
                placeholder="2+4"
                label="Выражение"
                onChange={(e) => {
                  setExpression(e.target.value);
                  setResult('');
                }}
                multiline
                rows={2}
                maxRows={4}
              />
            </FormControl>
            {result && <TextField label="Результат" disabled value={result} />}
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
