import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  Alert,
  AlertTitle,
  ButtonGroup,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useState } from 'react';
import { ExpReg, GiperReg, KvadReg, LinReg, PokazReg, StepenReg } from '../utils/regression';
import Page from '../components/Page';

export default function RegressionPage() {
  const [fInput, setFInput] = useState('1 2 3');
  const [fOutput, setFOutput] = useState('1 2 3');
  const [eps, setEps] = useState(4);
  const [alpha, setAlpha] = useState(0.05);
  const [result, setResult] = useState(null);

  return (
    <Page title="МНК и регрессионный анализ">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">МНК и регрессионный анализ Онлайн</Typography>
          <Typography variant="p">
            Данный онлайн-сервис позволяет найти с помощью метода наименьших квадратов уравнения
            линейной, квадратичной, гиперболической, степенной, логарифмической, показательной,
            экспоненциальной регрессии и др., коэффициенты и индексы корреляции и детерминации.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item md={12} />
          <Grid item md={12} columnSpacing={3}>
            <TextField
              sx={{ mr: 2 }}
              label="X"
              value={fInput}
              onChange={(e) => setFInput(e.target.value)}
            />
            <TextField
              sx={{ mr: 2 }}
              label="Y"
              value={fOutput}
              onChange={(e) => setFOutput(e.target.value)}
            />

            <FormControl>
              <InputLabel id="select-eps">Огруглять до</InputLabel>
              <Select
                labelId="select-eps"
                value={eps}
                sx={{ mr: 2, width: 200 }}
                label="Огруглять до"
                onChange={(event) => setEps(event.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="select-alpha">Уровень значимости</InputLabel>
              <Select
                labelId="select-alpha"
                value={alpha}
                label="Уровень значимости"
                sx={{ width: 200 }}
                onChange={(event) => setAlpha(event.target.value)}
              >
                <MenuItem value={0.001}>0.001</MenuItem>
                <MenuItem value={0.002}>0.002</MenuItem>
                <MenuItem value={0.005}>0.005</MenuItem>
                <MenuItem value={0.01}>0.01</MenuItem>
                <MenuItem value={0.02}>0.02</MenuItem>
                <MenuItem value={0.05}>0.05</MenuItem>
                <MenuItem value={0.1}>0.1</MenuItem>
                <MenuItem value={0.2}>0.2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {result && (
            <Grid item md={12}>
              <Alert severity="success">
                <AlertTitle>Результат</AlertTitle>
                {result}
              </Alert>
            </Grid>
          )}
          <Grid item md={12}>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button onClick={() => setResult(LinReg(fInput, fOutput, eps, alpha))}>
                Линейная
              </Button>
              <Button onClick={() => setResult(KvadReg(fInput, fOutput, eps, alpha))}>
                Квадратичная
              </Button>
              <Button onClick={() => setResult(StepenReg(fInput, fOutput, eps, alpha))}>
                Степенная
              </Button>
              <Button onClick={() => setResult(GiperReg(fInput, fOutput, eps, alpha))}>
                Гиперболическая
              </Button>
              <Button onClick={() => setResult(PokazReg(fInput, fOutput, eps, alpha))}>
                Показательная
              </Button>
              <Button onClick={() => setResult(ExpReg(fInput, fOutput, eps, alpha))}>
                Экспоненциальная
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
