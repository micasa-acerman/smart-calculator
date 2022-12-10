import { Alert, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FieldSetTable from 'src/components/FieldSetTable/FieldSetTable';
import FieldSetVector from 'src/components/FieldSetVector/FieldSetVector';
import Page from 'src/components/Page';
import { EnumerationMethod } from 'src/utils/methods';

function TechnologySystemPage() {
  const [n, setN] = useState(1);
  const [m, setM] = useState(1);
  const [Q, setQ] = useState([[0]]);
  const [S, setS] = useState([0]);
  const [C, setC] = useState([0]);
  const [W, setW] = useState([0]);
  const [P, setP] = useState([0]);
  const [result, setResult] = useState();

  useEffect(() => {
    setQ(new Array(n).fill(() => 0).map(() => new Array(m).fill(0)));
    setC(new Array(n).fill(() => 0));
    setW(new Array(n).fill(() => 0));
    setS(new Array(m).fill(() => 0));
    setP(new Array(n).fill(() => 0));
  }, [n, m]);

  const handleClick = () => {
    // eslint-disable-next-line no-undef
    const d1 = new Date();
    const result = EnumerationMethod(m, goalFunction, comparator);
    setResult(
      <>
        <div>Результат: {result.record}</div>
        <div>Перестановка: x=[{result.recordPer.join(',')}]</div>
        <div>Время вычисления: {new Date() - d1}</div>
      </>
    );
    function goalFunction(z) {
      let QZS = 0;
      let WS = 0;
      let PS = 0;
      for (let i = 0; i < n; i += 1) {
        WS += W[i];
        PS += P[i];
        for (let j = 0; j < m; j += 1) {
          QZS += Q[(i, j)] * z[j];
        }
      }
      const b = QZS - WS - PS;
      if (b > 0) return null;

      let SZ = 0;
      let P1 = 0;
      for (let j = 0; j < m; j += 1) {
        SZ += S[j] * z[j];
      }
      for (let i = 0; i < n; i += 1) {
        let sum = 0;
        for (let j = 0; j < m; j += 1) {
          sum += Q[i][j] * z[j];
        }
        P1 += C[i] * sum;
      }

      return SZ - (P1 - PS);
    }
    function comparator(a, b) {
      return b === null && a !== null ? true : a > b;
    }
  };

  return (
    <Page title="Управление комплексом подсистем технической подготовки производства">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Управление комплексом подсистем технической подготовки производства
        </Typography>
        <TextField
          label="Ресурсы"
          type="number"
          onChange={(e) => setN(+e.target.value)}
          value={n}
        />
        <TextField label="Заказы" type="number" onChange={(e) => setM(+e.target.value)} value={m} />
        <Button variant="contained" type="submit" onClick={handleClick} sx={{ mt: 1, ml: 2 }}>
          Решить
        </Button>
        {result && <Alert severity="success">{result}</Alert>}
        <FieldSetTable
          label="Затраты i-го вида ресурса на исполнение j-го наряд – заказа"
          table={Q}
          setTable={setQ}
        />
        <FieldSetVector label="цена исполнения j-го наряд – заказа" value={S} setValue={setS} />
        <FieldSetVector
          label="Стоимость приобретения единицы i-го вида ресурса"
          value={C}
          setValue={setC}
        />
        <FieldSetVector
          label="верхняя граница объема i-го вида ресурса, для которого имеется возможность приобретения"
          value={W}
          setValue={setW}
        />
        <FieldSetVector label="наличие i-го вида ресурса на складе" value={P} setValue={setP} />
      </Container>
    </Page>
  );
}

export default TechnologySystemPage;
