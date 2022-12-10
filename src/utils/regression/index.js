import RegressionResult from 'src/components/RegressionResult/RegressionResult';

Number.prototype.isInt = function () {
  return Math.round(this) == this;
};
Number.prototype.roundTo = function (n) {
  let x = 0;
  if (typeof n === 'number') if (n.isInt()) if (n >= -8 && n <= 8) x = n;
  x = 10 ** x;
  return Math.round(this * x) / x;
};
Math.roundTo = function (i, n) {
  if (typeof i === 'number') {
    return i.roundTo(n);
  }
  return false;
};

function Determinant(A) {
  const N = A.length;
  const B = [];
  let denom = 1;
  let exchanges = 0;
  for (var i = 0; i < N; ++i) {
    B[i] = [];
    for (var j = 0; j < N; ++j) {
      B[i][j] = A[i][j];
    }
  }
  for (var i = 0; i < N - 1; ++i) {
    let maxN = i;
    let maxValue = Math.abs(B[i][i]);
    for (var j = i + 1; j < N; ++j) {
      const value = Math.abs(B[j][i]);
      if (value > maxValue) {
        maxN = j;
        maxValue = value;
      }
    }
    if (maxN > i) {
      const temp = B[i];
      B[i] = B[maxN];
      B[maxN] = temp;
      ++exchanges;
    } else if (maxValue == 0) return maxValue;
    const value1 = B[i][i];
    for (var j = i + 1; j < N; ++j) {
      const value2 = B[j][i];
      B[j][i] = 0;
      for (let k = i + 1; k < N; ++k) B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
    }
    denom = value1;
  }
  if (exchanges % 2) return -B[N - 1][N - 1];
  return B[N - 1][N - 1];
}

function StatCom(q, i, j, b) {
  let zz = 1;
  let z = zz;
  let k = i;
  while (k <= j) {
    zz = (zz * q * k) / (k - b);
    z += zz;
    k += 2;
  }
  return z;
}

function FishF(f, n1, n2) {
  const x = n2 / (n1 * f + n2);
  if (n1 % 2 == 0) {
    return StatCom(1 - x, n2, n1 + n2 - 4, n2 - 2) * x ** (n2 / 2);
  }
  if (n2 % 2 == 0) {
    return 1 - StatCom(x, n1, n1 + n2 - 4, n1 - 2) * (1 - x) ** (n1 / 2);
  }
  const th = Math.atan(Math.sqrt((n1 * f) / n2));
  let a = th / (Math.PI / 2);
  const sth = Math.sin(th);
  const cth = Math.cos(th);
  if (n2 > 1) {
    a += (sth * cth * StatCom(cth * cth, 2, n2 - 3, -1)) / (Math.PI / 2);
  }
  if (n1 == 1) {
    return 1 - a;
  }
  let c = (4 * StatCom(sth * sth, n2 + 1, n1 + n2 - 4, n2 - 2) * sth * cth ** n2) / Math.PI;
  if (n2 == 1) {
    return 1 - a + c / 2;
  }
  let k = 2;
  while (k <= (n2 - 1) / 2) {
    c = (c * k) / (k - 0.5);
    k += 1;
  }
  return 1 - a + c;
}

function AFishF(p, n1, n2) {
  let v = 0.5;
  let dv = 0.5;
  let f = 0;
  while (dv > 1e-10) {
    f = 1 / v - 1;
    dv /= 2;
    if (FishF(f, n1, n2) > p) {
      v -= dv;
    } else {
      v += dv;
    }
  }
  return f;
}

function StudT(t, n) {
  const w = Math.abs(t) / Math.sqrt(n);
  const th = Math.atan(w);
  if (n == 1) {
    return 1 - th / (Math.PI / 2);
  }
  const sth = Math.sin(th);
  const cth = Math.cos(th);
  if (n % 2 == 1) {
    return 1 - (th + sth * cth * StatCom(cth * cth, 2, n - 3, -1)) / (Math.PI / 2);
  }
  return 1 - sth * StatCom(cth * cth, 1, n - 3, -1);
}

function AStudT(p, n) {
  let v = 0.5;
  let dv = 0.5;
  let t = 0;
  while (dv > 1e-6) {
    t = 1 / v - 1;
    dv /= 2;
    if (StudT(t, n) > p) {
      v -= dv;
    } else {
      v += dv;
    }
  }
  return t;
}

function simplifyEq(an, xn) {
  const axn = [];
  for (let j = 0; j < an.length; j++) {
    if (an[j] > 0) {
      var sign = '+';
    } else {
      var sign = '';
    }
    if (an[j] == -1) {
      axn[j] = `-${xn[j]}`;
      axn[an.length - 1] = '-1';
    }
    if (an[j] == 0) {
      axn[j] = '';
    }
    if (an[j] == 1) {
      axn[j] = `+${xn[j]}`;
      axn[an.length - 1] = '+1';
    }
    if (an[j] != 0 && an[j] != 1 && an[j] != -1) {
      axn[j] = sign + an[j] + xn[j];
    }
  }
  var newEq = axn.join('');
  if (/\+/.test(newEq.charAt(0))) {
    var newEq = newEq.replace(/\+/, '');
  }
  return newEq;
}

function parseNumber(obj) {
  return `${obj}`.match(/[+-]?\d+(\.\d+)?(E[+-]?\d+)?/g) || [];
}

Array.prototype.sum = function () {
  for (var i = 0, sum = 0; i < this.length; sum += this[i++]);
  return sum;
};

export function LinReg(strX, strY, eps = 4, alpha = 0.05) {
  var numX = parseNumber(strX),
    numY = parseNumber(strY),
    numXY = [],
    numX2 = [],
    numY2 = [],
    nn = numX.length,
    i;

  if (nn != numY.length) {
    alert('Число X-ов должно быть равно числу Y-ов.');
    return false;
  }
  if (nn < 3) {
    alert('Минимум пар X-Y должно быть 3.');
    return false;
  }
  // if (nn > 100) {
  //   alert('Неболее 100 пар X-Y должно быть.');
  //   return false;
  // }

  for (i = 0; i < nn; i++) {
    numX[i] = 1 * numX[i];
    numY[i] = 1 * numY[i];
    numXY[i] = numX[i] * numY[i];
    numX2[i] = numX[i] * numX[i];
    numY2[i] = numY[i] * numY[i];
  }

  var sumX = numX.sum(),
    SumX = Math.roundTo(sumX, eps),
    sumY = numY.sum(),
    SumY = Math.roundTo(sumY, eps),
    sumXY = numXY.sum(),
    SumXY = Math.roundTo(sumXY, eps),
    sumX2 = numX2.sum(),
    SumX2 = Math.roundTo(sumX2, eps),
    sumY2 = numY2.sum(),
    SumY2 = Math.roundTo(sumY2, eps),
    A1 = (sumX * sumY - nn * sumXY) / (sumX * sumX - nn * sumX2),
    B1 = (sumX * sumXY - sumX2 * sumY) / (sumX * sumX - nn * sumX2),
    Rxy = (nn * sumXY - sumX * sumY) / Math.sqrt((nn * sumX2 - sumX * sumX) * (nn * sumY2 - sumY * sumY)),
    a1 = Math.roundTo(A1, eps),
    b1 = Math.roundTo(B1, eps),
    rxy = Math.roundTo(Rxy, eps),
    R2 = Math.roundTo(Rxy * Rxy, eps);

  if (SumX < 0) {
    var nSumX = '(' + SumX + ')';
  } else {
    var nSumX = SumX;
  }
  if (SumY < 0) {
    var nSumY = '(' + SumY + ')';
  } else {
    var nSumY = SumY;
  }
  if (SumXY < 0) {
    var nSumXY = '(' + SumXY + ')';
  } else {
    var nSumXY = SumXY;
  }
  if (rxy < 0) {
    var nrxy = '(' + rxy + ')';
  } else {
    var nrxy = rxy;
  }

  var correl =
      '\\begin{aligned}' +
      'r_{xy}&=\\frac{n\\sum x_iy_i-\\sum x_i\\sum y_i}' +
      '{\\sqrt{\\left(n\\sum x_i^2-\\left(\\sum x_i\\right)^2\\right)\\!\\!' +
      '\\left(n\\sum y_i^2-\\left(\\sum y_i\\right)^2 \\right)}}= ' +
      '\\frac{' +
      nn +
      '\\cdot' +
      nSumXY +
      '-' +
      nSumX +
      '\\cdot' +
      nSumY +
      '}' +
      '{\\sqrt{\\bigl(' +
      nn +
      '\\cdot' +
      SumX2 +
      '-' +
      nSumX +
      '^2\\bigr)\\!' +
      '\\bigl(' +
      nn +
      '\\cdot' +
      SumY2 +
      '-' +
      nSumY +
      '^2\\bigr)}}\\approx' +
      rxy +
      '\\,;' +
      '\\end{aligned}',
    Rdeter = 'R^2=r_{xy}^2=' + nrxy + '^2\\approx' + R2 + '\\,.';

  var numY1 = [],
    numXx = [],
    numXx2 = [],
    numYY1 = [],
    numYY12 = [],
    numA = [],
    numEE = [],
    numEE2 = [],
    NumEE2 = [],
    srX = sumX / nn;

  for (i = 0; i < nn; i++) {
    numY1[i] = A1 * numX[i] + B1;
    numXx[i] = numX[i] - srX;
    numXx2[i] = numXx[i] * numXx[i];
    numYY1[i] = numY[i] - numY1[i];
    numYY12[i] = numYY1[i] * numYY1[i];
    numA[i] = Math.abs(numYY1[i] / numY[i]);
  }
  for (let j = 1; j < nn; j++) {
    numEE[j] = numYY1[j] - numYY1[j - 1];
    numEE2[j] = numEE[j] * numEE[j];
    NumEE2[j] = numEE[j] * numEE[j];
  }
  numEE2.shift();

  var sumXx2 = numXx2.sum(),
    sumYY12 = numYY12.sum(),
    SumYY12 = Math.roundTo(sumYY12, eps),
    sumA = numA.sum(),
    SumA = Math.roundTo(sumA, eps),
    sumEE2 = numEE2.sum(),
    SumEE2 = Math.roundTo(numEE2.sum(), eps);
  let Ae = Math.roundTo((sumA / nn) * 100, eps),
    Ff = Math.roundTo(((nn - 2) * Rxy * Rxy) / (1 - Rxy * Rxy), eps),
    Ft = Math.roundTo(AFishF(alpha, 1, nn - 2), eps),
    ma = Math.roundTo(Math.sqrt((1 / sumXx2) * (sumYY12 / (nn - 2))), eps),
    mb = Math.roundTo(Math.sqrt((sumYY12 / (nn - 2)) * (sumX2 / (nn * sumXx2))), eps),
    mrxy = Math.roundTo(Math.sqrt((1 - Rxy * Rxy) / (nn - 2)), eps),
    ta = Math.roundTo(A1 / Math.sqrt((1 / sumXx2) * (sumYY12 / (nn - 2))), eps),
    tb = Math.roundTo(B1 / Math.sqrt((sumYY12 / (nn - 2)) * (sumX2 / (nn * sumXx2))), eps),
    trxy = Math.roundTo(Rxy / Math.sqrt((1 - Rxy * Rxy) / (nn - 2)), eps),
    Tt = Math.roundTo(AStudT(alpha, nn - 2), eps),
    dF = Math.roundTo(sumEE2 / sumYY12, eps);

  var Aerror = '\\textstyle{\\overline{A}=\\dfrac{1}{n}\\sum\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\cdot100\\%=' + '\\dfrac{' + SumA + '}{' + nn + '}\\cdot100\\%\\approx' + Ae + '\\%\\,;}',
    Ffakt = 'F_{\\text{fakt}}= \\frac{r_{xy}^2}{1-r_{xy}^2}(n-2)= ' + '\\frac{' + R2 + '}{1-' + R2 + '}\\cdot(' + nn + '-2)\\approx' + Ff + '\\,;',
    Ftabl = 'F_{\\text{tabl}}\\approx' + Ft + '\\,,',
    Alpha = '\\alpha=' + alpha,
    Ttabl = 't_{\\text{tabl}}\\approx' + Tt + '\\,,',
    df = 'df=n-2=' + nn + '-2=' + (nn - 2),
    Tabrxy =
      't_a=\\frac{a}{m_a}=\\frac{' +
      a1 +
      '}{' +
      ma +
      '}\\approx' +
      ta +
      '\\,;\\quad ' +
      't_b=\\frac{b}{m_b}=\\frac{' +
      b1 +
      '}{' +
      mb +
      '}\\approx' +
      tb +
      '\\,;\\quad ' +
      't_{r_{xy}}=\\frac{r_{xy}}{m_{r_{xy}}}=\\frac{' +
      rxy +
      '}{' +
      mrxy +
      '}\\approx' +
      trxy +
      '\\,.',
    dFakt = 'd=\\frac{\\sum(\\varepsilon_i-\\varepsilon_{i-1})^2}{\\sum\\varepsilon_i^2}=' + '\\frac{' + SumEE2 + '}{' + SumYY12 + '}\\approx' + dF + '\\,.';

  if (b1 < 0) {
    var nb1 = b1;
  } else {
    var nb1 = '+' + b1;
  }

  const graphData = numX.map((x, i) => {
    return {
      name: numY[i],
      points: x,
      function: a1 * x + b1
    };
  });
  return (
    <RegressionResult
      func={`\\widehat{y}=${a1}x${nb1}`}
      Rdeter={Rdeter}
      Aerror={Aerror}
      correl={correl}
      Ffakt={Ffakt}
      Ftabl={Ftabl}
      Alpha={Alpha}
      dFakt={dFakt}
      Ttabl={Ttabl}
      df={df}
      Tabrxy={Tabrxy}
      graphData={graphData}
    />
  );
}

export function GiperReg(strX, strY, eps = 4, alpha = 0.05) {
  const numX = parseNumber(strX);
  const numY = parseNumber(strY);
  const numXi = [];
  const numX2i = [];
  const numYXi = [];
  const nn = numX.length;
  let i;
  let j;

  if (nn != numY.length) {
    alert('Число X-ов должно быть равно числу Y-ов.');
    return false;
  }
  if (nn < 3) {
    alert('Минимум пар X-Y должно быть 3.');
    return false;
  }
  for (i = 0; i < nn; i++) {
    numX[i] = 1 * numX[i];
    if (numX[i] == 0) {
      alert('Уравнение гиперболической регрессии не может быть построено\n' + 'для выборки, в которой есть X-сы, равные 0.\n\n');
      return false;
    }
  }

  for (i = 0; i < nn; i++) {
    numX[i] = 1 * numX[i];
    numY[i] = 1 * numY[i];
    numXi[i] = 1 / numX[i];
    numX2i[i] = 1 / (numX[i] * numX[i]);
    numYXi[i] = numY[i] / numX[i];
  }

  const sumY = numY.sum();
  const sumXi = numXi.sum();
  const sumX2i = numX2i.sum();
  const sumYXi = numYXi.sum();
  const B1 = (nn * sumYXi - sumXi * sumY) / (nn * sumX2i - sumXi * sumXi);
  const A1 = (sumY - B1 * sumXi) / nn;
  const a1 = Math.roundTo(A1, eps);
  const b1 = Math.roundTo(B1, eps);

  const numY1 = [];
  const numYy = [];
  const numYY1 = [];
  const numYy2 = [];
  const numYY12 = [];
  const numA = [];
  const numEE = [];
  const numEE2 = [];
  const NumEE2 = [];
  const srY = sumY / nn;

  for (i = 0; i < nn; i++) {
    numY1[i] = A1 + B1 / numX[i];
    numYy[i] = numY[i] - srY;
    numYY1[i] = numY[i] - numY1[i];
    numYy2[i] = numYy[i] * numYy[i];
    numYY12[i] = numYY1[i] * numYY1[i];
    numA[i] = Math.abs(numYY1[i] / numY[i]);
  }
  for (j = 1; j < nn; j++) {
    numEE[j] = numYY1[j] - numYY1[j - 1];
    numEE2[j] = numEE[j] * numEE[j];
    NumEE2[j] = numEE[j] * numEE[j];
  }
  numEE2.shift();

  const sumYy2 = numYy2.sum();
  const SumYy2 = Math.roundTo(numYy2.sum(), eps);
  const sumYY12 = numYY12.sum();
  const SumYY12 = Math.roundTo(numYY12.sum(), eps);
  const sumA = numA.sum();
  const SumA = Math.roundTo(numA.sum(), eps);
  const sumEE2 = numEE2.sum();
  const SumEE2 = Math.roundTo(numEE2.sum(), eps);
  const R = Math.roundTo(Math.sqrt(1 - sumYY12 / sumYy2), eps);
  const R2 = Math.roundTo(1 - sumYY12 / sumYy2, eps);
  const Ae = Math.roundTo((sumA / nn) * 100, eps);
  const Ft = Math.roundTo(AFishF(alpha, 1, nn - 2), eps);
  const Ff = Math.roundTo(((1 - sumYY12 / sumYy2) / (sumYY12 / sumYy2)) * (nn - 2), eps);
  const dF = Math.roundTo(sumEE2 / sumYY12, eps);

  const Rcorrel = `R= \\sqrt{1-\\frac{\\sum(y_i-\\widehat{y}_i)^2}{\\sum(y_i-\\overline{y})^2}}=` + `\\sqrt{1-\\frac{${SumYY12}}{${SumYy2}}}\\approx${R}\\,;`;
  const Rdeter = `R^2=${R}^2\\approx${R2}\\,;`;
  const Aerror = `\\textstyle{\\overline{A}=\\dfrac{1}{n}\\sum` + `\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\cdot100\\%=` + `\\dfrac{${SumA}}{${nn}}\\cdot100\\%\\approx${Ae}\\%\\,.}`;
  const Ffakt = `F_{\\text{fakt}}= \\frac{R^2}{1-R^2}\\cdot\\frac{k_2}{k_1}= ` + `\\frac{${R2}}{1-${R2}}\\cdot\\frac{${nn - 2}}{1}\\approx${Ff}\\,;`;
  const Ftabl = `F_{\\text{tabl}}=F(\\alpha,k_1,k_2)=F(${alpha},1,${nn - 2})\\approx${Ft}\\,;`;
  const k1k2 = `k_1=m=1,\\,k_2=n-m-1=${nn}-1-1=${nn - 2}`;
  const Alpha = `\\alpha=${alpha}\\,,`;
  const dFakt = `d=\\frac{\\sum(\\varepsilon_i-\\varepsilon_{i-1})^2}{\\sum\\varepsilon_i^2}=` + `\\frac{${SumEE2}}{${SumYY12}}\\approx${dF}\\,.`;

  if (b1 < 0) {
    var sign = '-';
  } else {
    var sign = '+';
  }

  const graphData = numX.map((x, i) => {
    return {
      name: numY[i],
      points: x,
      function: a1 + b1 / x
    };
  });
  return (
    <RegressionResult
      func={`$\\widehat{y}=${a1}${sign}\\frac{${Math.abs(b1)}}{x}$`}
      Rdeter={Rdeter}
      Aerror={Aerror}
      correl={Rcorrel}
      Ffakt={Ffakt}
      Ftabl={Ftabl}
      Alpha={Alpha}
      dFakt={dFakt}
      df={k1k2}
      graphData={graphData}
    />
  );
}

export function PokazReg(strX, strY, eps = 4, alpha = 0.05) {
  const numX = parseNumber(strX);
  const numY = parseNumber(strY);
  const numX2 = [];
  const numLnY = [];
  const numXLnY = [];
  const nn = numX.length;
  let i;
  let j;

  if (nn != numY.length) {
    alert('Число X-ов должно быть равно числу Y-ов.');
    return false;
  }
  if (nn < 3) {
    alert('Минимум пар X-Y должно быть 3.');
    return false;
  }
  for (i = 0; i < nn; i++) {
    numY[i] = 1 * numY[i];
    if (numY[i] < 0) {
      alert('Уравнение показательной регрессии не может быть построено\n' + 'для выборки, в которой Y-ки меньше 0.\n\n');
      return false;
    }
  }

  for (i = 0; i < nn; i++) {
    numX[i] = 1 * numX[i];
    numY[i] = 1 * numY[i];
    numX2[i] = numX[i] * numX[i];
    numLnY[i] = Math.log(numY[i]);
    numXLnY[i] = numX[i] * numLnY[i];
  }

  const sumX = numX.sum();
  const sumY = numY.sum();
  const sumX2 = numX2.sum();
  const sumLnY = numLnY.sum();
  const sumXLnY = numXLnY.sum();
  const B1 = Math.exp((nn * sumXLnY - sumX * sumLnY) / (nn * sumX2 - sumX * sumX));
  const A1 = Math.exp((sumLnY - Math.log(B1) * sumX) / nn);
  const a1 = Math.roundTo(A1, eps);
  const b1 = Math.roundTo(B1, eps);

  const numY1 = [];
  const numYy = [];
  const numYY1 = [];
  const numYy2 = [];
  const numYY12 = [];
  const numA = [];
  const numEE = [];
  const numEE2 = [];
  const NumEE2 = [];
  const srY = sumY / nn;

  for (i = 0; i < nn; i++) {
    numY1[i] = A1 * B1 ** numX[i];
    numYy[i] = numY[i] - srY;
    numYY1[i] = numY[i] - numY1[i];
    numYy2[i] = numYy[i] * numYy[i];
    numYY12[i] = numYY1[i] * numYY1[i];
    numA[i] = Math.abs(numYY1[i] / numY[i]);
  }
  for (j = 1; j < nn; j++) {
    numEE[j] = numYY1[j] - numYY1[j - 1];
    numEE2[j] = numEE[j] * numEE[j];
    NumEE2[j] = numEE[j] * numEE[j];
  }
  numEE2.shift();

  const sumYy2 = numYy2.sum();
  const SumYy2 = Math.roundTo(numYy2.sum(), eps);
  const sumYY12 = numYY12.sum();
  const SumYY12 = Math.roundTo(numYY12.sum(), eps);
  const sumA = numA.sum();
  const SumA = Math.roundTo(numA.sum(), eps);
  const sumEE2 = numEE2.sum();
  const SumEE2 = Math.roundTo(numEE2.sum(), eps);
  const R = Math.roundTo(Math.sqrt(1 - sumYY12 / sumYy2), eps);
  const R2 = Math.roundTo(1 - sumYY12 / sumYy2, eps);
  const Ae = Math.roundTo((sumA / nn) * 100, eps);
  const Ft = Math.roundTo(AFishF(alpha, 1, nn - 2), eps);
  const Ff = Math.roundTo(((1 - sumYY12 / sumYy2) / (sumYY12 / sumYy2)) * (nn - 2), eps);
  const dF = Math.roundTo(sumEE2 / sumYY12, eps);

  const Rcorrel = `R= \\sqrt{1-\\frac{\\sum(y_i-\\widehat{y}_i)^2}{\\sum(y_i-\\overline{y})^2}}=` + `\\sqrt{1-\\frac{${SumYY12}}{${SumYy2}}}\\approx${R}\\,;`;
  const Rdeter = `R^2=${R}^2\\approx${R2}\\,;`;
  const Aerror = `\\textstyle{\\overline{A}=\\dfrac{1}{n}\\sum` + `\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\cdot100\\%=` + `\\dfrac{${SumA}}{${nn}}\\cdot100\\%\\approx${Ae}\\%\\,.}`;
  const Ffakt = `F_{\\text{fakt}}= \\frac{R^2}{1-R^2}\\cdot\\frac{k_2}{k_1}= ` + `\\frac{${R2}}{1-${R2}}\\cdot\\frac{${nn - 2}}{1}\\approx${Ff}\\,;`;
  const Ftabl = `F_{\\text{tabl}}=F(\\alpha,k_1,k_2)=F(${alpha},1,${nn - 2})\\approx${Ft}\\,;`;
  const k1k2 = `k_1=m=1,\\,k_2=n-m-1=${nn}-1-1=${nn - 2}`;
  const Alpha = `\\alpha=${alpha}\\,,`;
  const dFakt = `d=\\frac{\\sum(\\varepsilon_i-\\varepsilon_{i-1})^2}{\\sum\\varepsilon_i^2}=` + `\\frac{${SumEE2}}{${SumYY12}}\\approx${dF}\\,.`;

  const graphData = numX.map((x, i) => {
    return {
      name: numY[i],
      points: x,
      function: a1 * b1 ** x
    };
  });
  return (
    <RegressionResult
      func={`$\\widehat{y}=${a1}\\cdot${b1}^{x}$`}
      Rdeter={Rdeter}
      Aerror={Aerror}
      correl={Rcorrel}
      Ffakt={Ffakt}
      Ftabl={Ftabl}
      Alpha={Alpha}
      dFakt={dFakt}
      df={k1k2}
      graphData={graphData}
    />
  );
}

export function ExpReg(strX, strY, eps = 4, alpha = 0.05) {
  const numX = parseNumber(strX);
  const numY = parseNumber(strY);
  const numX2 = [];
  const numLnY = [];
  const numXLnY = [];
  const nn = numX.length;
  let i;
  let j;

  if (nn != numY.length) {
    alert('Число X-ов должно быть равно числу Y-ов.');
    return false;
  }
  if (nn < 3) {
    alert('Минимум пар X-Y должно быть 3.');
    return false;
  }
  for (i = 0; i < nn; i++) {
    numY[i] = 1 * numY[i];
    if (numY[i] < 0) {
      alert('Уравнение экспоненциальная регрессии не может быть построено\n' + 'для выборки, в которой есть Y-ки меньше 0.\n\n');
      return false;
    }
  }

  for (i = 0; i < nn; i++) {
    numX[i] = 1 * numX[i];
    numY[i] = 1 * numY[i];
    numX2[i] = numX[i] * numX[i];
    numLnY[i] = Math.log(numY[i]);
    numXLnY[i] = numX[i] * numLnY[i];
  }

  const sumX = numX.sum();
  const sumY = numY.sum();
  const sumX2 = numX2.sum();
  const sumLnY = numLnY.sum();
  const sumXLnY = numXLnY.sum();
  const B1 = (nn * sumXLnY - sumX * sumLnY) / (nn * sumX2 - sumX * sumX);
  const A1 = (sumLnY - B1 * sumX) / nn;
  const a1 = Math.roundTo(A1, eps);
  const b1 = Math.roundTo(B1, eps);

  const numY1 = [];
  const numYy = [];
  const numYY1 = [];
  const numYy2 = [];
  const numYY12 = [];
  const numA = [];
  const numEE = [];
  const numEE2 = [];
  const NumEE2 = [];
  const srY = sumY / nn;

  for (i = 0; i < nn; i++) {
    numY1[i] = Math.exp(A1 + B1 * numX[i]);
    numYy[i] = numY[i] - srY;
    numYY1[i] = numY[i] - numY1[i];
    numYy2[i] = numYy[i] * numYy[i];
    numYY12[i] = numYY1[i] * numYY1[i];
    numA[i] = Math.abs(numYY1[i] / numY[i]);
  }
  for (j = 1; j < nn; j++) {
    numEE[j] = numYY1[j] - numYY1[j - 1];
    numEE2[j] = numEE[j] * numEE[j];
    NumEE2[j] = numEE[j] * numEE[j];
  }
  numEE2.shift();

  const sumYy2 = numYy2.sum();
  const SumYy2 = Math.roundTo(numYy2.sum(), eps);
  const sumYY12 = numYY12.sum();
  const SumYY12 = Math.roundTo(numYY12.sum(), eps);
  const sumA = numA.sum();
  const SumA = Math.roundTo(numA.sum(), eps);
  const sumEE2 = numEE2.sum();
  const SumEE2 = Math.roundTo(numEE2.sum(), eps);
  const Ysr = Math.roundTo(sumY / nn, eps);
  const R = Math.roundTo(Math.sqrt(1 - sumYY12 / sumYy2), eps);
  const R2 = Math.roundTo(1 - sumYY12 / sumYy2, eps);
  const Ae = Math.roundTo((sumA / nn) * 100, eps);
  const Ft = Math.roundTo(AFishF(alpha, 1, nn - 2), eps);
  const Ff = Math.roundTo(((1 - sumYY12 / sumYy2) / (sumYY12 / sumYy2)) * (nn - 2), eps);
  const dF = Math.roundTo(sumEE2 / sumYY12, eps);

  const Rcorrel = `R= \\sqrt{1-\\frac{\\sum(y_i-\\widehat{y}_i)^2}{\\sum(y_i-\\overline{y})^2}}=` + `\\sqrt{1-\\frac{${SumYY12}}{${SumYy2}}}\\approx${R}\\,;`;
  const Rdeter = `R^2=${R}^2\\approx${R2}\\,;`;
  const Aerror = `\\textstyle{\\overline{A}=\\dfrac{1}{n}\\sum` + `\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\cdot100\\%=` + `\\dfrac{${SumA}}{${nn}}\\cdot100\\%\\approx${Ae}\\%\\,.}`;
  const Ffakt = `F_{\\text{fakt}}= \\frac{R^2}{1-R^2}\\cdot\\frac{k_2}{k_1}= ` + `\\frac{${R2}}{1-${R2}}\\cdot\\frac{${nn - 2}}{1}\\approx${Ff}\\,;`;
  const Ftabl = `F_{\\text{tabl}}=F(\\alpha,k_1,k_2)=F(${alpha},1,${nn - 2})\\approx${Ft}\\,;`;
  const k1k2 = `k_1=m=1,\\,k_2=n-m-1=${nn}-1-1=${nn - 2}`;
  const Alpha = `\\alpha=${alpha}\\,,`;
  const dFakt = `d=\\frac{\\sum(\\varepsilon_i-\\varepsilon_{i-1})^2}{\\sum\\varepsilon_i^2}=` + `\\frac{${SumEE2}}{${SumYY12}}\\approx${dF}\\,.`;

  if (b1 < 0) {
    var sign = '';
  } else {
    var sign = '+';
  }

  const graphData = numX.map((x, i) => {
    return {
      name: numY[i],
      points: x,
      function: Math.E ** (a1 + b1 * x)
    };
  });
  return (
    <RegressionResult
      func={`$\\widehat{y}=e^{${a1}${sign}${b1}x}$`}
      Rdeter={Rdeter}
      Aerror={Aerror}
      correl={Rcorrel}
      Ffakt={Ffakt}
      Ftabl={Ftabl}
      Alpha={Alpha}
      dFakt={dFakt}
      df={k1k2}
      graphData={graphData}
    />
  );
}

export function KvadReg(strX, strY, eps = 4, alpha = 0.05) {
  var numX = parseNumber(strX),
    numY = parseNumber(strY),
    numX2 = [],
    numX3 = [],
    numX4 = [],
    numXY = [],
    numX2Y = [],
    nn = numX.length,
    i,
    j;

  if (nn != numY.length) {
    alert('Число X-ов должно быть равно числу Y-ов.');
    return false;
  }
  if (nn < 3) {
    alert('Минимум пар X-Y должно быть 3.');
    return false;
  }

  for (i = 0; i < nn; i++) {
    numX[i] = 1 * numX[i];
    numY[i] = 1 * numY[i];
    numX2[i] = numX[i] * numX[i];
    numX3[i] = numX[i] * numX[i] * numX[i];
    numX4[i] = numX[i] * numX[i] * numX[i] * numX[i];
    numXY[i] = numX[i] * numY[i];
    numX2Y[i] = numX[i] * numX[i] * numY[i];
  }

  var sumX = numX.sum(),
    sumY = numY.sum(),
    sumX2 = numX2.sum(),
    sumX3 = numX3.sum(),
    sumX4 = numX4.sum(),
    sumXY = numXY.sum(),
    sumX2Y = numX2Y.sum(),
    delta = Determinant([
      [sumX2, sumX, nn],
      [sumX3, sumX2, sumX],
      [sumX4, sumX3, sumX2]
    ]),
    deltaA = Determinant([
      [sumY, sumX, nn],
      [sumXY, sumX2, sumX],
      [sumX2Y, sumX3, sumX2]
    ]),
    deltaB = Determinant([
      [sumX2, sumY, nn],
      [sumX3, sumXY, sumX],
      [sumX4, sumX2Y, sumX2]
    ]),
    deltaC = Determinant([
      [sumX2, sumX, sumY],
      [sumX3, sumX2, sumXY],
      [sumX4, sumX3, sumX2Y]
    ]),
    a1 = deltaA / delta,
    A = Math.roundTo(a1, eps),
    b1 = deltaB / delta,
    B = Math.roundTo(b1, eps),
    c1 = deltaC / delta,
    C = Math.roundTo(c1, eps);

  var numY1 = [],
    numYy = [],
    numYY1 = [],
    numYy2 = [],
    numYY12 = [],
    numA = [],
    numEE = [],
    numEE2 = [],
    NumEE2 = [],
    srY = numY.sum() / nn;

  for (i = 0; i < nn; i++) {
    numY1[i] = (deltaA / delta) * numX[i] * numX[i] + (deltaB / delta) * numX[i] + deltaC / delta;
    numYy[i] = numY[i] - srY;
    numYY1[i] = numY[i] - numY1[i];
    numYy2[i] = numYy[i] * numYy[i];
    numYY12[i] = numYY1[i] * numYY1[i];
    numA[i] = Math.abs(numYY1[i] / numY[i]);
  }
  for (j = 1; j < nn; j++) {
    numEE[j] = numYY1[j] - numYY1[j - 1];
    numEE2[j] = numEE[j] * numEE[j];
    NumEE2[j] = numEE[j] * numEE[j];
  }
  numEE2.shift();

  var sumYy2 = numYy2.sum(),
    SumYy2 = Math.roundTo(sumYy2, eps),
    sumYY12 = numYY12.sum(),
    SumYY12 = Math.roundTo(sumYY12, eps),
    sumA = numA.sum(),
    SumA = Math.roundTo(sumA, eps),
    sumEE2 = numEE2.sum(),
    SumEE2 = Math.roundTo(sumEE2, eps),
    R = Math.roundTo(Math.sqrt(1 - sumYY12 / sumYy2), eps),
    R2 = Math.roundTo(1 - sumYY12 / sumYy2, eps),
    Ae = Math.roundTo((sumA / nn) * 100, eps),
    Ff = Math.roundTo(((1 - sumYY12 / sumYy2) / (sumYY12 / sumYy2)) * ((nn - 3) / 2), eps),
    Ft = Math.roundTo(AFishF(alpha, 2, nn - 3), eps),
    dF = Math.roundTo(sumEE2 / sumYY12, eps);

  var Rcorrel = 'R= \\sqrt{1-\\frac{\\sum(y_i-\\widehat{y}_i)^2}{\\sum(y_i-\\overline{y})^2}}=' + '\\sqrt{1-\\frac{' + SumYY12 + '}{' + SumYy2 + '}}\\approx' + R + '\\,;',
    Rdeter = 'R^2=' + R + '^2\\approx' + R2 + '\\,;',
    Aerror = '\\textstyle{\\overline{A}=\\dfrac{1}{n}\\sum\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\cdot100\\%=' + '\\dfrac{' + SumA + '}{' + nn + '}\\cdot100\\%\\approx' + Ae + '\\%\\,.}',
    Ffakt = 'F_{\\text{fakt}}= \\frac{R^2}{1-R^2}\\cdot\\frac{k_2}{k_1}= ' + '\\frac{' + R2 + '}{1-' + R2 + '}\\cdot\\frac{' + (nn - 3) + '}{2}\\approx' + Ff + '\\,;',
    Ftabl = 'F_{\\text{tabl}}=F(\\alpha,k_1,k_2)=F(' + alpha + ',2,' + (nn - 3) + ')\\approx' + Ft + '\\,;',
    k1k2 = 'k_1=m=2,\\,k_2=n-m-1=' + nn + '-2-1=' + (nn - 3),
    Alpha = '\\alpha=' + alpha + '\\,,',
    dFakt = 'd=\\frac{\\sum(\\varepsilon_i-\\varepsilon_{i-1})^2}{\\sum\\varepsilon_i^2}=' + '\\frac{' + SumEE2 + '}{' + SumYY12 + '}\\approx' + dF + '\\,.';

  const graphData = numX.map((x, i) => {
    return {
      name: numY[i],
      points: x,
      function: A * x ** 2 + B * x + C
    };
  });
  return (
    <RegressionResult
      func={`\\widehat{y}=${simplifyEq([A, B, C], ['x^2', 'x', ''])}`}
      Rdeter={Rdeter}
      Aerror={Aerror}
      correl={Rcorrel}
      Ffakt={Ffakt}
      Ftabl={Ftabl}
      Alpha={Alpha}
      dFakt={dFakt}
      df={k1k2}
      graphData={graphData}
    />
  );
}

export function StepenReg(strX, strY, eps = 4, alpha = 0.05) {
  var numX = parseNumber(strX),
    numY = parseNumber(strY),
    numLnX = [],
    numLnY = [],
    numLnXY = [],
    numLnX2 = [],
    nn = numX.length,
    i,
    j;

  if (nn != numY.length) {
    alert('Число X-ов должно быть равно числу Y-ов.');
    return false;
  }
  if (nn < 3) {
    alert('Минимум пар X-Y должно быть 3.');
    return false;
  }
  for (i = 0; i < nn; i++) {
    numX[i] = 1 * numX[i];
    numY[i] = 1 * numY[i];
    if (numX[i] < 0 || numY[i] < 0) {
      alert('Уравнение степенной регрессии не может быть построено\n' + 'для выборки, в которой есть X-сы или Y-ки меньше 0.\n\n');
      return false;
    }
  }

  for (i = 0; i < nn; i++) {
    numX[i] = 1 * numX[i];
    numY[i] = 1 * numY[i];
    numLnX[i] = Math.log(numX[i]);
    numLnY[i] = Math.log(numY[i]);
    numLnXY[i] = numLnX[i] * numLnY[i];
    numLnX2[i] = numLnX[i] * numLnX[i];
  }

  var sumY = numY.sum(),
    sumLnX = numLnX.sum(),
    sumLnY = numLnY.sum(),
    sumLnXY = numLnXY.sum(),
    sumLnX2 = numLnX2.sum(),
    B1 = (nn * sumLnXY - sumLnX * sumLnY) / (nn * sumLnX2 - sumLnX * sumLnX),
    A1 = Math.exp((sumLnY - B1 * sumLnX) / nn),
    a1 = Math.roundTo(A1, eps),
    b1 = Math.roundTo(B1, eps);

  var numY1 = [],
    numYy = [],
    numYY1 = [],
    numYy2 = [],
    numYY12 = [],
    numA = [],
    numEE = [],
    numEE2 = [],
    NumEE2 = [],
    srY = sumY / nn;

  for (i = 0; i < nn; i++) {
    numY1[i] = A1 * Math.pow(numX[i], B1);
    numYy[i] = numY[i] - srY;
    numYY1[i] = numY[i] - numY1[i];
    numYy2[i] = numYy[i] * numYy[i];
    numYY12[i] = numYY1[i] * numYY1[i];
    numA[i] = Math.abs(numYY1[i] / numY[i]);
  }
  for (j = 1; j < nn; j++) {
    numEE[j] = numYY1[j] - numYY1[j - 1];
    numEE2[j] = numEE[j] * numEE[j];
    NumEE2[j] = numEE[j] * numEE[j];
  }
  numEE2.shift();

  var sumYy2 = numYy2.sum(),
    SumYy2 = Math.roundTo(numYy2.sum(), eps),
    sumYY12 = numYY12.sum(),
    SumYY12 = Math.roundTo(numYY12.sum(), eps),
    sumA = numA.sum(),
    SumA = Math.roundTo(numA.sum(), eps),
    sumEE2 = numEE2.sum(),
    SumEE2 = Math.roundTo(numEE2.sum(), eps),
    R = Math.roundTo(Math.sqrt(1 - sumYY12 / sumYy2), eps),
    R2 = Math.roundTo(1 - sumYY12 / sumYy2, eps),
    Ae = Math.roundTo((sumA / nn) * 100, eps),
    Ft = Math.roundTo(AFishF(alpha, 1, nn - 2), eps),
    Ff = Math.roundTo(((1 - sumYY12 / sumYy2) / (sumYY12 / sumYy2)) * (nn - 2), eps),
    dF = Math.roundTo(sumEE2 / sumYY12, eps);

  var Rcorrel = 'R= \\sqrt{1-\\frac{\\sum(y_i-\\widehat{y}_i)^2}{\\sum(y_i-\\overline{y})^2}}=' + '\\sqrt{1-\\frac{' + SumYY12 + '}{' + SumYy2 + '}}\\approx' + R + '\\,;',
    Rdeter = 'R^2=' + R + '^2\\approx' + R2 + '\\,;',
    Aerror =
      '\\textstyle{\\overline{A}=\\dfrac{1}{n}\\sum' + '\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\cdot100\\%=' + '\\dfrac{' + SumA + '}{' + nn + '}\\cdot100\\%\\approx' + Ae + '\\%\\,.}',
    Ffakt = 'F_{\\text{fakt}}= \\frac{R^2}{1-R^2}\\cdot\\frac{k_2}{k_1}= ' + '\\frac{' + R2 + '}{1-' + R2 + '}\\cdot\\frac{' + (nn - 2) + '}{1}\\approx' + Ff + '\\,;',
    Ftabl = 'F_{\\text{tabl}}=F(\\alpha,k_1,k_2)=F(' + alpha + ',1,' + (nn - 2) + ')\\approx' + Ft + '\\,;',
    k1k2 = 'k_1=m=1,\\,k_2=n-m-1=' + nn + '-1-1=' + (nn - 2),
    Alpha = '\\alpha=' + alpha + '\\,,',
    dFakt = 'd=\\frac{\\sum(\\varepsilon_i-\\varepsilon_{i-1})^2}{\\sum\\varepsilon_i^2}=' + '\\frac{' + SumEE2 + '}{' + SumYY12 + '}\\approx' + dF + '\\,.';

  if (b1 < 0) {
    var sign = '-';
  } else {
    var sign = '+';
  }

  const graphData = numX.map((x, i) => {
    return {
      name: numY[i],
      points: x,
      function: a1 * x ** b1
    };
  });
  return (
    <RegressionResult
      func={`\\widehat\{y\}=${a1}\\cdot x^\{${b1}\}`}
      Rdeter={Rdeter}
      Aerror={Aerror}
      correl={Rcorrel}
      Ffakt={Ffakt}
      Ftabl={Ftabl}
      Alpha={Alpha}
      dFakt={dFakt}
      df={k1k2}
      graphData={graphData}
    />
  );
}
