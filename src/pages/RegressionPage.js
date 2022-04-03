import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery
} from '@mui/material';
import { useState } from 'react';
import { ExpReg, GiperReg, KvadReg, LinReg, PokazReg, StepenReg } from '../utils/regression';
import Page from '../components/Page';

function genPoints(x) {
  const result = [];
  for (let i = 0; i < x; i += 1) {
    result.push(Math.floor(Math.random() * 100) + 1);
  }
  return result.join(' ');
}

// eslint-disable-next-line no-unused-vars
function testReg() {
  const FUNCS = [LinReg, StepenReg, PokazReg, ExpReg, GiperReg, KvadReg];
  const result = ['LinReg;StepenReg;PokazReg;ExpReg;GiperReg;KvadReg'];
  for (let i = 1; i < 10; i += 1) {
    const row = [];
    for (let j = 0; j < FUNCS.length; j += 1) {
      const x = genPoints(i * 100000);
      const y = genPoints(i * 100000);
      const d = new Date();
      FUNCS[j](x, y, 4, 0.01);
      row.push(new Date() - d);
    }
    result.push(`${row.join(';')}`);
  }
  console.log(result.join('\r\n'));
}

export default function RegressionPage() {
  const [fInput, setFInput] = useState('1 2 3');
  const [fOutput, setFOutput] = useState('1 2 3');
  const [eps, setEps] = useState(4);
  const [alpha, setAlpha] = useState(0.05);
  const [result, setResult] = useState(null);
  const isMobileMatch = useMediaQuery('(max-width:600px)');

  return (
    <Page title="МНК и регрессионный анализ">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h2">МНК и регрессионный анализ Онлайн</Typography>
          <Typography variant="p">
            Данный онлайн-сервис позволяет найти с помощью метода наименьших квадратов уравнения
            линейной, квадратичной, гиперболической, степенной, логарифмической, показательной,
            экспоненциальной регрессии и др., коэффициенты и индексы корреляции и детерминации.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              label="X"
              fullWidth
              value={fInput}
              onChange={(e) => setFInput(e.target.value)}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Y"
              value={fOutput}
              onChange={(e) => setFOutput(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-eps">Огруглять до</InputLabel>
              <Select
                labelId="select-eps"
                value={eps}
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
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-alpha">Уровень значимости</InputLabel>
              <Select
                labelId="select-alpha"
                value={alpha}
                label="Уровень значимости"
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

          <Grid item xs={12}>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              orientation={isMobileMatch ? 'vertical' : 'horizontal'}
              fullWidth
            >
              <Button
                onClick={() => {
                  setResult(LinReg(fInput, fOutput, eps, alpha));
                }}
                size="large"
              >
                Линейная
              </Button>
              <Button onClick={() => setResult(KvadReg(fInput, fOutput, eps, alpha))} size="large">
                Квадратичная
              </Button>
              <Button
                onClick={() => setResult(StepenReg(fInput, fOutput, eps, alpha))}
                size="large"
              >
                Степенная
              </Button>
              <Button onClick={() => setResult(GiperReg(fInput, fOutput, eps, alpha))} size="large">
                Гиперболическая
              </Button>
              <Button onClick={() => setResult(PokazReg(fInput, fOutput, eps, alpha))} size="large">
                Показательная
              </Button>
              <Button
                fullWidth
                onClick={() => setResult(ExpReg(fInput, fOutput, eps, alpha))}
                size="large"
              >
                Экспоненциальная
              </Button>
            </ButtonGroup>
          </Grid>

          {result && (
            <Grid item md={12}>
              {result}
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
