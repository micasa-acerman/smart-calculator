import Latex from 'react-latex';

function _Latex(TeX) {
  return `[math]${TeX}[/math]`;
}
function isNumMHP(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

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

function LatexMatrix(A, type) {
  if (type == null) {
    type = '';
  }
  const rows = A.length; // Число строк матрицы
  const cols = A[0].length; // Число колонок матрицы
  let res = `\\begin{${type}matrix}`;
  let i;
  let j;
  for (i = 0; i < rows - 1; i++) {
    for (j = 0; j < cols - 1; j++) {
      res += `${A[i][j]}&`;
    }
    res += `${A[i][cols - 1]}\\\\`;
  }
  for (j = 0; j < cols - 1; j++) {
    res += `${A[rows - 1][j]}&`;
  }
  return `${res + A[rows - 1][cols - 1]}\\end{${type}matrix}`;
}

function Determinant(A) {
  // Используется алгоритм Барейса, сложность O(n^3)
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

function drawChartMNK(nameXY, Xpoint, Ypoint, dlina, XYpoint, RegLine) {
  for (let i = 0; i < dlina; i++) {
    XYpoint.push([1 * Xpoint[i], 1 * Ypoint[i], null]);
  }

  const xy = nameXY.concat(XYpoint, RegLine);
  const data = google.visualization.arrayToDataTable(xy);

  const options = {
    hAxis: { minValue: -1, maxValue: 1, minorGridlines: { count: 1, color: '#CCC' } },
    vAxis: { minValue: -1, maxValue: 1, minorGridlines: { count: 1, color: '#CCC' } },
    legend: 'none',
    curveType: 'function',
    series: [
      { color: 'blue', pointSize: 3, lineWidth: 0, visibleInLegend: false },
      { color: 'darkred', pointSize: 0, lineWidth: 1.25, visibleInLegend: false }
    ],
    width: 500,
    height: 300,
    backgroundColor: 'transparent',
    chartArea: { width: '85%', height: '90%', top: '10', left: '50' },
    explorer: { zoomDelta: 1.1 }
  };

  const chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function FirstTable(nn, numX, numY) {
  return;
  let table;
  let i;
  tabl =
    `<table class="tableReg1"><col span="1" style="width: 35px; border-right: 4px double #798081" />` +
    `<thead style="font-size: 13px;">` +
    `<tr><td>${_Latex('i')}</td>`;
  for (i = 0; i < nn; i++) {
    tabl += `<td>${i + 1}</td>`;
  }
  tabl += `</tr></thead><tbody style="font-size: 14px;">` + `<tr><td>${_Latex('x_i')}</td>`;
  for (i = 0; i < nn; i++) {
    tabl += `<td>${numX[i]}</td>`.replace(/-/g, '−');
  }
  tabl += `</tr><tr><td>${_Latex('y_i')}</td>`;
  for (i = 0; i < nn; i++) {
    tabl += `<td>${numY[i]}</td>`.replace(/-/g, '−');
  }
  tabl += '</tbody></tr></table>';
  if (nn > 25) {
    tabl = '';
  }

  return tabl;
}

function LastTable(
  nn,
  numX,
  numY,
  numY1,
  numXx,
  numYy,
  t,
  numXx2,
  numYy2,
  numYY1,
  numYY12,
  numA,
  numEE,
  NumEE2,
  SumXx2,
  SumYy2,
  SumYY12,
  SumA,
  SumEE2
) {
  return;
  let Rtable;
  let xy = [];
  let xy2 = [];
  let Sum_xy;
  let m;
  const eps =
    document.getElementById('eps').options[document.getElementById('eps').selectedIndex].value * 1;

  if (t == 'x') {
    xy = numXx;
    xy2 = numXx2;
    Sum_xy = SumXx2;
  }
  if (t == 'y') {
    xy = numYy;
    xy2 = numYy2;
    Sum_xy = SumYy2;
  }

  Rtable =
    `<table class="tableReg1"><col span="1" style="width: 35px;" /><colgroup span="6" style="width: 40px;">` +
    `<col span="1" /><col span="1" style="border-right: 4px double #798081" />` +
    `<col span="1" /><col span="1" /><col span="1" /><col span="1" />` +
    `<col span="1" /><col span="1" /><col span="1" /><col span="1" /></colgroup>` +
    `<tr style="height: 31px;">` +
    `<td>${_Latex('i')}</td>` +
    `<td>${_Latex('x_i')}</td>` +
    `<td>${_Latex('y_i')}</td>` +
    `<td>${_Latex('\\widehat{y}_i')}</td>` +
    `<td>${_Latex(`${t}_i-\\overline{${t}}`)}</td>` +
    `<td>${_Latex(`(${t}_i-\\overline{${t}})^2`)}</td>` +
    `<td>${_Latex('\\varepsilon_i')}</td>` +
    `<td>${_Latex('\\varepsilon_i^2')}</td>` +
    `<td>${_Latex('A_i')}</td>` +
    `<td>${_Latex('\\Delta\\varepsilon_i')}</td>` +
    `<td>${_Latex('(\\Delta\\varepsilon_i)^2')}</td></tr>` +
    `<tr><td>1</td>${(
      `<td>${numX[0]}</td><td>${numY[0]}</td><td>${Math.roundTo(numY1[0], eps)}</td>` +
      `<td>${Math.roundTo(xy[0], eps)}</td><td>${Math.roundTo(xy2[0], eps)}</td>` +
      `<td>${Math.roundTo(numYY1[0], eps)}</td><td>${Math.roundTo(numYY12[0], eps)}</td>` +
      `<td>${Math.roundTo(numA[0], eps)}</td><td>—</td><td>—</td></tr>`
    ).replace(/-/g, '−')}`;
  for (m = 1; m < nn; m++) {
    Rtable += `<tr><td>${`${m + 1}</td><td>${numX[m]}</td><td>${numY[m]}</td><td>${Math.roundTo(
      numY1[m],
      eps
    )}</td><td>${Math.roundTo(xy[m], eps)}</td><td>${Math.roundTo(
      xy2[m],
      eps
    )}</td><td>${Math.roundTo(numYY1[m], eps)}</td><td>${Math.roundTo(
      numYY12[m],
      eps
    )}</td><td>${Math.roundTo(numA[m], eps)}</td><td>${Math.roundTo(
      numEE[m],
      eps
    )}</td><td>${Math.roundTo(NumEE2[m], eps)}</td></tr>`.replace(/-/g, '−')}`;
  }
  Rtable +=
    `<tr style="height: 31px; font-size: 16px;">` +
    `<td>${_Latex('\\textstyle{\\sum}')}</td>` +
    `<td>—</td><td>—</td><td>—</td><td>—</td><td>${Sum_xy}</td><td>—</td>` +
    `<td>${SumYY12}</td><td>${SumA}</td><td>—</td><td>${SumEE2}</td></tr></table>`;

  return Rtable;
}

export function LinReg(strX, strY, eps = 4, alpha = 0.05) {
  let str = '';
  var numX = parseNumber(strX),
        numY = parseNumber(strY),
        numXY=[], numX2=[], numY2=[],
        nn = numX.length, 
        tabl, Table, Rtable, i;
    
    if (nn!=numY.length) { alert('Число X-ов должно быть равно числу Y-ов.'); return false }
    if (nn<3)            { alert('Минимум пар X-Y должно быть 3.'); return false }
    if (nn>100)          { alert('Неболее 100 пар X-Y должно быть.'); return false }

    for (i=0; i<nn; i++)
        { numX[i] = 1*numX[i];
          numY[i] = 1*numY[i];
          numXY[i] = numX[i]*numY[i];
          numX2[i] = numX[i]*numX[i];
          numY2[i] = numY[i]*numY[i];
        }
        
    var sumX = numX.sum(),   SumX = Math.roundTo(sumX,eps),
        sumY = numY.sum(),   SumY = Math.roundTo(sumY,eps),
        sumXY = numXY.sum(), SumXY = Math.roundTo(sumXY,eps),
        sumX2 = numX2.sum(), SumX2 = Math.roundTo(sumX2,eps),
        sumY2 = numY2.sum(), SumY2 = Math.roundTo(sumY2,eps),
        A1 = (sumX*sumY-nn*sumXY)/(sumX*sumX-nn*sumX2),
        B1 = (sumX*sumXY-sumX2*sumY)/(sumX*sumX-nn*sumX2),
        Rxy = (nn*sumXY-sumX*sumY)/Math.sqrt((nn*sumX2-sumX*sumX)*(nn*sumY2-sumY*sumY)),
        a1 = Math.roundTo(A1,eps),
        b1 = Math.roundTo(B1,eps),
        rxy = Math.roundTo( Rxy,eps ),
        R2  = Math.roundTo( Rxy*Rxy,eps );

    Table = '<table class="tableReg1"><col span="1" style="width: 35px;" /><colgroup span="6" style="width: 40px;">'
            +'<col span="1" /><col span="1" style="border-right: 4px double #798081" />'
            +'<col span="1" style="width: 44px;" /><col span="1" /><col span="1" /></colgroup>'
            +'<tr style="height: 31px;">'
            +'<td>'+_Latex('i')+'</td>'
            +'<td>'+_Latex('x_i')+'</td>'
            +'<td>'+_Latex('y_i')+'</td>'
            +'<td>'+_Latex('x_iy_i')+'</td>'
            +'<td>'+_Latex('x_i^2')+'</td>'
            +'<td>'+_Latex('y_i^2')+'</td>'
            +'</tr>';
    for (i=0; i<nn; i++)
    {  Table += '<tr><td>'+((i+1)+'</td><td>'+numX[i]+'</td><td>'+numY[i]+'</td><td>'
                +Math.roundTo(numXY[i],eps)+'</td><td>'
                +Math.roundTo(numX2[i],eps)+'</td><td>'
                +Math.roundTo(numY2[i],eps)+'</td></tr>').replace(/-/g,'−')
    }
    Table += '<tr style="height: 31px; font-size: 16px;">'
             +'<td>'+_Latex('\\textstyle\{\\sum\}')+'</td>'
             +('<td>'+SumX+'</td><td>'+SumY+'</td><td>'+SumXY+'</td><td>'+SumX2+'</td><td>'+SumY2).replace(/-/g,'−')
             +'</td></tr></table>';
 
    if (SumX<0)  {var nSumX = '('+SumX+')'}   else {var nSumX = SumX}
    if (SumY<0)  {var nSumY = '('+SumY+')'}   else {var nSumY = SumY}
    if (SumXY<0) {var nSumXY = '('+SumXY+')'} else {var nSumXY = SumXY}
    if (rxy<0)   {var nrxy = '('+rxy+')'}     else {var nrxy = rxy}
    
    var ABcoeff = '\\begin\{aligned\}'
                  +'a&=\\frac\{\\sum\ x_i \\sum\ y_i- n\\sum\ x_iy_i\}'
                  +'\{\\left(\\sum\ x_i\\right)^2-n\\sum\ x_i^2\}= '
                  +'\\frac\{'+nSumX+'\\cdot'+nSumY+'-'+nn+'\\cdot'+nSumXY+'\}\{'+nSumX+'^2-'
                  +nn+'\\cdot'+SumX2+'\}\\approx'+a1+'\\,;\\\\[4pt]'
                  +'b&=\\frac\{\\sum\ x_i \\sum\ x_iy_i-'
                  +'\\sum\ x_i^2\\sum\ y_i\}'
                  +'\{\\left(\\sum\ x_i\\right)^2-n\\sum\ x_i^2\}= '
                  +'\\frac\{'+nSumX+'\\cdot'+nSumXY+'-'+SumX2+'\\cdot'+nSumY+'\}\{'+nSumX+'^2-'
                  +nn+'\\cdot'+SumX2+'\}\\approx'+b1+'\\,.'
                  +'\\end\{aligned\}',
        correl = '\\begin\{aligned\}'
                 +'r_\{xy\}&=\\frac\{n\\sum\ x_iy_i-\\sum\ x_i\\sum\ y_i\}'
                 +'\{\\sqrt\{\\left(n\\sum\ x_i^2-\\left(\\sum\ x_i\\right)^2\\right)\\!\\!'
                 +'\\left(n\\sum\ y_i^2-\\left(\\sum\ y_i\\right)^2 \\right)\}\}= '
                 +'\\frac\{'+nn+'\\cdot'+nSumXY+'-'+nSumX+'\\cdot'+nSumY+'\}'
                 +'\{\\sqrt\{\\bigl('+nn+'\\cdot'+SumX2+'-'+nSumX+'^2\\bigr)\\!'
                 +'\\bigl('+nn+'\\cdot'+SumY2+'-'+nSumY+'^2\\bigr)\}\}\\approx'+rxy+'\\,;'
                 +'\\end\{aligned\}',
        Rdeter = 'R^2=r_\{xy\}^2='+nrxy+'^2\\approx'+R2+'\\,.';
        
    var numY1=[], numXx=[], numXx2=[], numYY1=[], numYY12=[], numA=[], numEE=[], numEE2=[], NumEE2=[],
        srX = (sumX/nn);

    for (i=0; i<nn; i++)
        { numY1[i] = (A1*numX[i]+B1);
          numXx[i] = (numX[i]-srX);
          numXx2[i] = (numXx[i]*numXx[i]);
          numYY1[i] = (numY[i]-numY1[i]);
          numYY12[i] = (numYY1[i]*numYY1[i]);
          numA[i] = Math.abs( numYY1[i]/numY[i] );
        }
    for (let j=1; j<nn; j++)
       { numEE[j] = (numYY1[j]-numYY1[j-1]);
         numEE2[j] = (numEE[j]*numEE[j]);
         NumEE2[j] = (numEE[j]*numEE[j]);
       }
    numEE2.shift();

    var sumXx2 = numXx2.sum(),   SumXx2 = Math.roundTo(sumXx2,eps),
        sumYY12 = numYY12.sum(), SumYY12 = Math.roundTo(sumYY12,eps),
        sumA = numA.sum(),       SumA = Math.roundTo(sumA,eps),
        sumEE2 = numEE2.sum(),   SumEE2 = Math.roundTo( numEE2.sum(),eps );
    let Xsr = Math.roundTo( srX,eps ),
        Ae = Math.roundTo( (sumA/nn)*100,eps ),
        Ff = Math.roundTo( ((nn-2)*Rxy*Rxy)/(1-(Rxy*Rxy)),eps ),
        Ft = Math.roundTo( AFishF(alpha,1,(nn-2)),eps ),
        ma = Math.roundTo( Math.sqrt( (1/sumXx2)*(sumYY12/(nn-2)) ),eps ),
        mb = Math.roundTo( Math.sqrt( (sumYY12/(nn-2))*(sumX2/(nn*sumXx2)) ),eps ),
      mrxy = Math.roundTo( Math.sqrt( (1-Rxy*Rxy)/(nn-2) ),eps ),
        ta = Math.roundTo( A1/Math.sqrt((1/sumXx2)*(sumYY12/(nn-2))),eps ),
        tb = Math.roundTo( B1/Math.sqrt((sumYY12/(nn-2))*(sumX2/(nn*sumXx2))),eps ),
      trxy = Math.roundTo( Rxy/Math.sqrt((1-Rxy*Rxy)/(nn-2)),eps ),
        Tt = Math.roundTo( AStudT(alpha,(nn-2)),eps ),
        dF = Math.roundTo( sumEE2/sumYY12,eps );

    var AverX = '\\textstyle\{\\overline\{x\}= \\dfrac\{1\}\{n\}\\sum x_i= '
                +'\\dfrac\{'+SumX+'\}\{'+nn+'\}='+Xsr+'\\,;\}',
        Aerror = '\\textstyle\{\\overline\{A\}=\\dfrac\{1\}\{n\}\\sum\\left|\\dfrac\{y_i-\\widehat\{y\}_i\}\{y_i\}\\right|\\cdot100\\%='
                 +'\\dfrac\{'+SumA+'\}\{'+nn+'\}\\cdot100\\%\\approx'+Ae+'\\%\\,;\}',
        Ffakt = 'F_\{\\text\{fakt\}\}= \\frac\{r_\{xy\}^2\}\{1-r_\{xy\}^2\}(n-2)= '
                +'\\frac\{'+R2+'\}\{1-'+R2+'\}\\cdot('+nn+'-2)\\approx'+Ff+'\\,;',
        Ftabl = 'F_\{\\text\{tabl\}\}\\approx'+Ft+'\\,,',
        k1k2 = 'k_1=1,\\,k_2=n-2='+nn+'-2='+(nn-2),
        Alpha = '\\alpha='+alpha,        
        Mabrxy = '\\begin\{aligned\}'
                 +'m_a&=\\sqrt\{\\frac\{1\}\{\\sum(x_i-\\overline\{x\}_i)^2\}\\cdot'
                   +'\\frac\{\\sum(y_i-\\widehat\{y\}_i)^2\}\{n-2\}\}= '
                   +'\\sqrt\{\\frac\{1\}\{'+SumXx2+'\}\\cdot \\frac\{'+SumYY12+'\}\{'+nn+'-2\}\}\\approx '+ma+'\\,;\\\\[4pt] '
                 +'m_b&=\\sqrt\{\\frac\{\\sum(y_i-\\widehat\{y\}_i)^2\}\{n-2\}\\cdot'
                   +'\\frac\{\\sum x_i^2\}\{n\\sum(x_i-\\overline\{x\}_i)^2\}\}= '
                   +'\\sqrt\{\\frac\{'+SumYY12+'\}\{'+nn+'-2\}\\cdot\\frac\{'+SumX2+'\}\{'+nn+'\\cdot'
                   +SumXx2+'\}\}\\approx '+mb+'\\,;\\\\[4pt] '
                 +'m_\{r_\{xy\}\}&=\\sqrt\{\\frac\{1-r_\{xy\}^2\}\{n-2\}\}= '
                   +'\\sqrt\{\\frac\{1-'+nrxy+'^2\}\{'+nn+'-2\}\}\\approx'+mrxy+'\\,.'
                 +'\\end\{aligned\}',
        Ttabl = 't_\{\\text\{tabl\}\}\\approx'+Tt+'\\,,',
           df = 'df=n-2='+nn+'-2='+(nn-2),
        Tabrxy = 't_a=\\frac\{a\}\{m_a\}=\\frac\{'+a1+'\}\{'+ma+'\}\\approx'+ta+'\\,;\\quad '
                 +'t_b=\\frac\{b\}\{m_b\}=\\frac\{'+b1+'\}\{'+mb+'\}\\approx'+tb+'\\,;\\quad '
                 +'t_\{r_\{xy\}\}=\\frac\{r_\{xy\}\}\{m_\{r_\{xy\}\}\}=\\frac\{'+rxy+'\}\{'+mrxy+'\}\\approx'+trxy+'\\,.',
        dTable = 'd_L=,~\\,d_U=',
        dFakt = 'd=\\frac\{\\sum(\\varepsilon_i-\\varepsilon_\{i-1\})^2\}\{\\sum\\varepsilon_i^2\}='
                  +'\\frac\{'+SumEE2+'\}\{'+SumYY12+'\}\\approx'+dF+'\\,.';
                  
    var perTable = '\\varepsilon_i=y_i-\\widehat\{y\}_i,~\\,'
                   +'\\Delta\\varepsilon_i=\\varepsilon_i-\\varepsilon_\{i-1\},~\\,'
                   +'A_i=\\left|\\dfrac\{y_i-\\widehat\{y\}_i\}\{y_i\}\\right|\\colon';
                 
    if (b1<0) {var nb1 = b1} else {var nb1 = '+'+b1}

    str = '<p><b>Нахождение и анализ уравнения линейной регрессии '
                    +_Latex('\\widehat\{y\}=ax+b')+' для данных:</b></p>'+FirstTable(nn,numX,numY)
                    +'<p><b>1.</b> Составим таблицу вспомогательных величин:</p>'+Table
                    +'<p>Вычислим коэффициенты '+_Latex('a')+' и '+_Latex('b')+' '
                    +'уравнения линейной регрессии '+_Latex('\\widehat\{y\}=ax+b')+' по известным формулам:</p>'
                    +'<p class="formulaDisplay">'+_Latex(ABcoeff)+'</p>'
                    +'<p>Итак, искомое уравнение линейной регрессии имеет вид:</p>'
                    +'<p class="formulaDisplay">'+_Latex('\\widehat\{y\}='+a1+'x'+nb1)+'.</p>'
              +'<p><b>2.</b> Сделаем общий чертёж диаграммы рассеяния и графика уравнения регрессии</p>'
              +'<div id="chart_div"></div>'
                    +'<p style="margin-top: 15px;"><b>3.</b> Вычислим коэффициенты линейной парной корреляции '+_Latex('(r_\{xy\})')
                    +' и детерминации '+_Latex('(R^2)')+':</p>'
                    +'<p class="formulaDisplay">'+_Latex(correl)+'</p>'
                    +'<p>следовательно, '+_Latex(Rdeter)+'</p>'
                    +'<p style="margin: 15px 0;">Для оценки значимости параметров регрессии и корреляции сначала:</p>'
                    +'<p style="margin: 0 0 0 25px;">– найдём '+_Latex('x')+' средний: '+_Latex(AverX)+'</p>'
                    +'<p style="margin: 0 0 0 25px;">– составим таблицу вспомогательных величин, где '+_Latex(perTable)+'</p>'
                    +LastTable(nn,numX,numY,numY1,numXx,'','x',numXx2,'',numYY1,numYY12,numA,numEE,NumEE2,SumXx2,'',SumYY12,SumA,SumEE2)
                    +'<p><b>4.</b> Средняя ошибка аппроксимации:</p>'
                    +'<p class="formulaDisplay">'+_Latex(Aerror)+'</p>'
                    +'<p><b>5.</b> F-критерии Фишера:</p>'
                       +'<p style="margin-left: 25px;">– фактический '+_Latex(Ffakt)+'</p>'
                       +'<p style="margin: 10px 0 15px 25px;">– критический (табличный) '+_Latex(Ftabl)+' '
                       +'так как '+_Latex(k1k2)+' и '+_Latex(Alpha+'\\,.')+'</p>'
                    +'<p><b>6.</b> Случайные ошибки параметров '+_Latex('a,\\,b')+' и коэффициента корреляции '+_Latex('r_\{xy\}')+':</p>'
                       +'<p class="formulaDisplay">'+_Latex(Mabrxy)+'</p>'
                   +'<p><b>7.</b> t-статистики Стьюдента:</p>'
                       +'<p style="margin: 10px 0 0 25px;">– табличная '+_Latex(Ttabl)+' так как '+_Latex(df)+' и '+_Latex(Alpha+'\\,;')+'</p>'
                       +'<p style="margin: 10px 0 15px 25px;">– фактические</p>'
                       +'<p class="formulaDisplay">'+_Latex(Tabrxy)+'</p>'
                    +'<p style="margin-top: 15px;"><b>8.</b> Критерии Дарбина-Уотсона:</p>'
                       +'<p style="margin: 10px 0 15px 25px;">– критические (табличные) '+_Latex(dTable)+'</p>'
                       +'<p style="margin: 10px 0 15px 25px;">– фактический '+_Latex(dFakt)+'</p>';

  return (
    <ol>
      <li>
        Искомая функция:&nbsp;
        <Latex>{`$\\widehat{y}=${a1}x${nb1}$`}</Latex>
      </li>
      <li>
        Индекс детерминации:&nbsp;
        <Latex>{`$${Rdeter}$`}</Latex>
      </li>
      <li>
        Средняя ошибка аппроксимации:&nbsp;
        <Latex>{`$${Aerror}$`}</Latex>
      </li>
    </ol>
  );
}

export function GiperReg(strX, strY, eps = 4, alpha = 0.05) {
  let str = '';
  const numX = parseNumber(strX);
  const numY = parseNumber(strY);
  const numXi = [];
  const numX2i = [];
  const numYXi = [];
  const nn = numX.length;
  let tabl;
  let Table;
  let Rtable;
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
  if (nn > 100) {
    alert('Не более 100 пар X-Y должно быть.');
    return false;
  }
  for (i = 0; i < nn; i++) {
    numX[i] = 1 * numX[i];
    if (numX[i] == 0) {
      alert(
        'Уравнение гиперболической регрессии не может быть построено\n' +
          'для выборки, в которой есть X-сы, равные 0.\n\n'
      );
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

  const sumX = numX.sum();
  const SumX = Math.roundTo(numX.sum(), eps);
  const sumY = numY.sum();
  const SumY = Math.roundTo(numY.sum(), eps);
  const sumXi = numXi.sum();
  const SumXi = Math.roundTo(numXi.sum(), 8);
  const sumX2i = numX2i.sum();
  const SumX2i = Math.roundTo(numX2i.sum(), 8);
  const sumYXi = numYXi.sum();
  const SumYXi = Math.roundTo(numYXi.sum(), 8);
  const B1 = (nn * sumYXi - sumXi * sumY) / (nn * sumX2i - sumXi * sumXi);
  const A1 = (sumY - B1 * sumXi) / nn;
  const a1 = Math.roundTo(A1, eps);
  const b1 = Math.roundTo(B1, eps);

  Table =
    `<table class="tableReg1"><col span="1" style="width: 35px;" /><colgroup span="6" style="width: 40px;">` +
    `<col span="1" /><col span="1" style="border-right: 4px double #798081" />` +
    `<col span="1" style="width: 44px;" /><col span="1" /><col span="1" /></colgroup>` +
    `<tr style="height: 31px;">` +
    `<td>${_Latex('i')}</td>` +
    `<td>${_Latex('x_i')}</td>` +
    `<td>${_Latex('y_i')}</td>` +
    `<td>${_Latex('1/x_i')}</td>` +
    `<td>${_Latex('1/x_i^2')}</td>` +
    `<td>${_Latex('y_i/x_i')}</td>` +
    `</tr>`;
  for (i = 0; i < nn; i++) {
    Table += `<tr><td>${`${i + 1}</td><td>${numX[i]}</td><td>${numY[i]}</td><td>${Math.roundTo(
      numXi[i],
      8
    )}</td><td>${Math.roundTo(numX2i[i], 8)}</td><td>${Math.roundTo(
      numYXi[i],
      8
    )}</td></tr>`.replace(/-/g, '−')}`;
  }
  Table +=
    `<tr style="height: 31px; font-size: 16px;">` +
    `<td>${_Latex(
      '\\textstyle{\\sum}'
    )}</td>${`<td>${SumX}</td><td>${SumY}</td><td>${SumXi}</td><td>${SumX2i}</td><td>${SumYXi}`.replace(
      /-/g,
      '−'
    )}</td></tr></table>`;

  if (sumY < 0) {
    var nSumY = `(${SumY})`;
  } else {
    var nSumY = SumY;
  }
  if (sumXi < 0) {
    var nSumXi = `(${SumXi})`;
  } else {
    var nSumXi = SumXi;
  }
  if (sumYXi < 0) {
    var nSumYXi = `(${SumYXi})`;
  } else {
    var nSumYXi = SumYXi;
  }

  const Bcoeff =
    `b=\\dfrac{n\\sum\\dfrac{y_i}{x_i}-\\sum\\dfrac{1}{x_i}\\sum y_i }{` +
    `n\\sum\\dfrac{1}{x_i^2}-\\left(\\sum\\dfrac{1}{x_i}\\right)^2 }=` +
    `\\dfrac{${nn}\\cdot${nSumYXi}-${nSumXi}\\cdot${nSumY}}{${nn}\\cdot${SumX2i}-${nSumXi}^2}\\approx${b1}\\,;`;
  const Acoeff =
    `\\textstyle{a=\\dfrac{1}{n}\\sum y_i` +
    `-\\dfrac{b}{n}\\sum\\dfrac{1}{x_i}=` +
    `\\dfrac{1}{${nn}}\\cdot${nSumY}-\\dfrac{${b1}}{${nn}}\\cdot${nSumXi}\\approx${a1}\\,.}`;

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
  const Ysr = Math.roundTo(sumY / nn, eps);
  const R = Math.roundTo(Math.sqrt(1 - sumYY12 / sumYy2), eps);
  const R2 = Math.roundTo(1 - sumYY12 / sumYy2, eps);
  const Ae = Math.roundTo((sumA / nn) * 100, eps);
  const Ft = Math.roundTo(AFishF(alpha, 1, nn - 2), eps);
  const Ff = Math.roundTo(((1 - sumYY12 / sumYy2) / (sumYY12 / sumYy2)) * (nn - 2), eps);
  const dF = Math.roundTo(sumEE2 / sumYY12, eps);

  const AverY =
    `\\textstyle{\\overline{y}= \\dfrac{1}{n}\\sum y_i= ` + `\\dfrac{${SumY}}{${nn}}=${Ysr}\\,;}`;
  const Rcorrel =
    `R= \\sqrt{1-\\frac{\\sum(y_i-\\widehat{y}_i)^2}{\\sum(y_i-\\overline{y})^2}}=` +
    `\\sqrt{1-\\frac{${SumYY12}}{${SumYy2}}}\\approx${R}\\,;`;
  const Rdeter = `R^2=${R}^2\\approx${R2}\\,;`;
  const Aerror =
    `\\textstyle{\\overline{A}=\\dfrac{1}{n}\\sum` +
    `\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\cdot100\\%=` +
    `\\dfrac{${SumA}}{${nn}}\\cdot100\\%\\approx${Ae}\\%\\,.}`;
  const Ffakt =
    `F_{\\text{fakt}}= \\frac{R^2}{1-R^2}\\cdot\\frac{k_2}{k_1}= ` +
    `\\frac{${R2}}{1-${R2}}\\cdot\\frac{${nn - 2}}{1}\\approx${Ff}\\,;`;
  const Ftabl = `F_{\\text{tabl}}=F(\\alpha,k_1,k_2)=F(${alpha},1,${nn - 2})\\approx${Ft}\\,;`;
  const k1k2 = `k_1=m=1,\\,k_2=n-m-1=${nn}-1-1=${nn - 2}`;
  const Alpha = `\\alpha=${alpha}\\,,`;
  const dTable = 'd_L=,~\\,d_U=';
  const dFakt =
    `d=\\frac{\\sum(\\varepsilon_i-\\varepsilon_{i-1})^2}{\\sum\\varepsilon_i^2}=` +
    `\\frac{${SumEE2}}{${SumYY12}}\\approx${dF}\\,.`;

  const perTable =
    '\\varepsilon_i=y_i-\\widehat{y}_i,~\\,' +
    '\\Delta\\varepsilon_i=\\varepsilon_i-\\varepsilon_{i-1},~\\,' +
    'A_i=\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\colon';

  if (b1 < 0) {
    var sign = '-';
  } else {
    var sign = '+';
  }

  str =
    `<p><b>1.</b> Составим таблицу вспомогательных величин:</p>${Table}<p>Вычислим коэффициенты ${_Latex(
      'a'
    )} и ${_Latex('b')} уравнения гиперболической ` +
    `регрессии ${_Latex('\\widehat{y}=a+\\frac{b}{x}')} по известным формулам:</p>` +
    `<p class="formulaDisplay">${_Latex(Bcoeff)}</p>` +
    `<p class="formulaDisplay">${_Latex(Acoeff)}</p>` +
    `<p>Итак, искомое уравнение регрессии имеет вид:</p>` +
    `<p class="formulaDisplay">${_Latex(
      `\\widehat{y}=${a1}${sign}\\frac{${Math.abs(b1)}}{x}`
    )}.</p>` +
    `<p><b>2.</b> Сделаем общий чертёж диаграммы рассеяния и графика уравнения регрессии</p>` +
    `<div id="chart_div"></div>` +
    `<p style="margin: 15px 0;">Для оценки значимости параметров регрессии и корреляции сначала:</p>` +
    `<p style="margin-left: 25px;">– найдём ${_Latex('y')} средний: ${_Latex(
      AverY
    )}</p><p><b>3.</b> Индекс корреляции:</p>` +
    `<p class="formulaDisplay">${_Latex(Rcorrel)}</p>` +
    `<p><b>4.</b> Индекс детерминации: ${_Latex(Rdeter)}</p>` +
    `<p style="margin-top: 15px;"><b>5.</b> Средняя ошибка аппроксимации:</p>` +
    `<p class="formulaDisplay">${_Latex(Aerror)}</p>` +
    `<p><b>6.</b> F-критерии Фишера:</p>` +
    `<p style="margin: 10px 0 15px 25px;">– критический (табличный) ${_Latex(Ftabl)}</p>` +
    `<p style="margin: 10px 0 15px 25px;">– фактический ${_Latex(Ffakt)}</p>` +
    `<p>Так как ${_Latex(k1k2)} и ${_Latex(Alpha)}<br />` +
    `где ${_Latex('m')} – это число параметров при переменных уравнения регрессии.</p>` +
    `<p style="margin-top: 15px;"><b>7.</b> Критерии Дарбина-Уотсона:</p>` +
    `<p style="margin: 10px 0 15px 25px;">– критические (табличные) ${_Latex(dTable)}</p>` +
    `<p style="margin: 10px 0 15px 25px;">– фактический ${_Latex(dFakt)}</p>`;

  return (
    <>
      <ol>
        <li>
          Искомая функция:&nbsp;
          <Latex>{`$\\widehat{y}=${a1}${sign}\\frac{${Math.abs(b1)}}{x}$`}</Latex>
        </li>
        <li>
          Индекс корреляции:&nbsp;
          <Latex>{`$${Rcorrel}$`}</Latex>
        </li>
        <li>
          Индекс детерминации:&nbsp;
          <Latex>{`$${Rdeter}$`}</Latex>
        </li>
        <li>
          Средняя ошибка аппроксимации:&nbsp;
          <Latex>{`$${Aerror}$`}</Latex>
        </li>
      </ol>
    </>
  );
}

export function PokazReg(strX, strY, eps = 4, alpha = 0.05) {
  let str = '';
  const numX = parseNumber(strX);
  const numY = parseNumber(strY);
  const numX2 = [];
  const numLnY = [];
  const numXLnY = [];
  const nn = numX.length;
  let tabl;
  let Table;
  let Rtable;
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
  if (nn > 100) {
    alert('Не более 100 пар X-Y должно быть.');
    return false;
  }
  for (i = 0; i < nn; i++) {
    numY[i] = 1 * numY[i];
    if (numY[i] < 0) {
      alert(
        'Уравнение показательной регрессии не может быть построено\n' +
          'для выборки, в которой Y-ки меньше 0.\n\n'
      );
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
  const SumX = Math.roundTo(numX.sum(), eps);
  const sumY = numY.sum();
  const SumY = Math.roundTo(numY.sum(), eps);
  const sumX2 = numX2.sum();
  const SumX2 = Math.roundTo(numX2.sum(), eps);
  const sumLnY = numLnY.sum();
  const SumLnY = Math.roundTo(numLnY.sum(), eps);
  const sumXLnY = numXLnY.sum();
  const SumXLnY = Math.roundTo(numXLnY.sum(), eps);
  const B1 = Math.exp((nn * sumXLnY - sumX * sumLnY) / (nn * sumX2 - sumX * sumX));
  const A1 = Math.exp((sumLnY - Math.log(B1) * sumX) / nn);
  const a1 = Math.roundTo(A1, eps);
  const b1 = Math.roundTo(B1, eps);

  Table =
    `<table class="tableReg1"><col span="1" style="width: 35px;" /><colgroup span="6" style="width: 40px;">` +
    `<col span="1" /><col span="1" style="border-right: 4px double #798081" />` +
    `<col span="1" style="width: 44px;" /><col span="1" /><col span="1" /></colgroup>` +
    `<tr style="height: 31px;">` +
    `<td>${_Latex('i')}</td>` +
    `<td>${_Latex('x_i')}</td>` +
    `<td>${_Latex('y_i')}</td>` +
    `<td>${_Latex('x_i^2')}</td>` +
    `<td>${_Latex('\\ln y_i')}</td>` +
    `<td>${_Latex('x_i\\ln y_i')}</td>` +
    `</tr>`;
  for (i = 0; i < nn; i++) {
    Table += `<tr><td>${`${i + 1}</td><td>${numX[i]}</td><td>${numY[i]}</td><td>${Math.roundTo(
      numX2[i],
      eps
    )}</td><td>${Math.roundTo(numLnY[i], eps)}</td><td>${Math.roundTo(
      numXLnY[i],
      eps
    )}</td></tr>`.replace(/-/g, '−')}`;
  }
  Table +=
    `<tr style="height: 31px; font-size: 16px;">` +
    `<td>${_Latex(
      '\\textstyle{\\sum}'
    )}</td>${`<td>${SumX}</td><td>${SumY}</td><td>${SumX2}</td><td>${SumLnY}</td><td>${SumXLnY}`.replace(
      /-/g,
      '−'
    )}</td></tr></table>`;

  if (SumX < 0) {
    var nSumX = `(${SumX})`;
  } else {
    var nSumX = SumX;
  }
  if (SumLnY < 0) {
    var nSumLnY = `(${SumLnY})`;
  } else {
    var nSumLnY = SumLnY;
  }
  if (SumXLnY < 0) {
    var nSumXLnY = `(${SumXLnY})`;
  } else {
    var nSumXLnY = SumXLnY;
  }

  const Bcoeff =
    `b=\\exp\\dfrac{n\\sum x_i\\ln y_i-\\sum x_i\\cdot\\sum\\ln y_i }` +
    `{n\\sum x_i^2-\\left(\\sum x_i\\right)^2 }=` +
    `\\exp\\dfrac{${nn}\\cdot${nSumXLnY}-${nSumX}\\cdot${nSumLnY}}{${nn}\\cdot${SumX2}-${nSumX}^2}\\approx${b1}\\,;`;
  const Acoeff =
    `\\textstyle{a=\\exp\\!\\left(\\dfrac{1}{n}\\sum\\ln y_i-\\dfrac{\\ln b}{n}\\sum x_i\\right)=` +
    `\\exp\\!\\left(\\dfrac{1}{${nn}}\\cdot${nSumLnY}-\\dfrac{\\ln ${b1}}{${nn}}\\cdot${nSumX}\\right)\\approx${a1}\\,.}`;

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
  const Ysr = Math.roundTo(sumY / nn, eps);
  const R = Math.roundTo(Math.sqrt(1 - sumYY12 / sumYy2), eps);
  const R2 = Math.roundTo(1 - sumYY12 / sumYy2, eps);
  const Ae = Math.roundTo((sumA / nn) * 100, eps);
  const Ft = Math.roundTo(AFishF(alpha, 1, nn - 2), eps);
  const Ff = Math.roundTo(((1 - sumYY12 / sumYy2) / (sumYY12 / sumYy2)) * (nn - 2), eps);
  const dF = Math.roundTo(sumEE2 / sumYY12, eps);

  const AverY =
    `\\textstyle{\\overline{y}= \\dfrac{1}{n}\\sum y_i= ` + `\\dfrac{${SumY}}{${nn}}=${Ysr}\\,;}`;
  const Rcorrel =
    `R= \\sqrt{1-\\frac{\\sum(y_i-\\widehat{y}_i)^2}{\\sum(y_i-\\overline{y})^2}}=` +
    `\\sqrt{1-\\frac{${SumYY12}}{${SumYy2}}}\\approx${R}\\,;`;
  const Rdeter = `R^2=${R}^2\\approx${R2}\\,;`;
  const Aerror =
    `\\textstyle{\\overline{A}=\\dfrac{1}{n}\\sum` +
    `\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\cdot100\\%=` +
    `\\dfrac{${SumA}}{${nn}}\\cdot100\\%\\approx${Ae}\\%\\,.}`;
  const Ffakt =
    `F_{\\text{fakt}}= \\frac{R^2}{1-R^2}\\cdot\\frac{k_2}{k_1}= ` +
    `\\frac{${R2}}{1-${R2}}\\cdot\\frac{${nn - 2}}{1}\\approx${Ff}\\,;`;
  const Ftabl = `F_{\\text{tabl}}=F(\\alpha,k_1,k_2)=F(${alpha},1,${nn - 2})\\approx${Ft}\\,;`;
  const k1k2 = `k_1=m=1,\\,k_2=n-m-1=${nn}-1-1=${nn - 2}`;
  const Alpha = `\\alpha=${alpha}\\,,`;
  const dTable = 'd_L=,~\\,d_U=';
  const dFakt =
    `d=\\frac{\\sum(\\varepsilon_i-\\varepsilon_{i-1})^2}{\\sum\\varepsilon_i^2}=` +
    `\\frac{${SumEE2}}{${SumYY12}}\\approx${dF}\\,.`;

  const perTable =
    '\\varepsilon_i=y_i-\\widehat{y}_i,~\\,' +
    '\\Delta\\varepsilon_i=\\varepsilon_i-\\varepsilon_{i-1},~\\,' +
    'A_i=\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\colon';

  if (b1 < 0) {
    var sign = '-';
  } else {
    var sign = '+';
  }

  str =
    `<p><b>Нахождение и анализ уравнения показательной регрессии ${_Latex(
      '\\widehat{y}=a\\cdot b^x'
    )} для данных:</b></p>${FirstTable(
      nn,
      numX,
      numY
    )}<p><b>1.</b> Составим таблицу вспомогательных величин:</p>${Table}<p>Вычислим коэффициенты ${_Latex(
      'a'
    )} и ${_Latex('b')} ` +
    `уравнения показательной регрессии ${_Latex(
      '\\widehat{y}=a\\cdot b^x'
    )} по известным формулам:</p>` +
    `<p class="formulaDisplay">${_Latex(Bcoeff)}</p>` +
    `<p class="formulaDisplay">${_Latex(Acoeff)}</p>` +
    `<p>Итак, искомое уравнение регрессии имеет вид:</p>` +
    `<p class="formulaDisplay">${_Latex(`\\widehat{y}=${a1}\\cdot${b1}^{x}`)}.</p>` +
    `<p><b>2.</b> Сделаем общий чертёж диаграммы рассеяния и графика уравнения регрессии</p>` +
    `<div id="chart_div"></div>` +
    `<p style="margin: 15px 0;">Для оценки значимости параметров регрессии и корреляции сначала:</p>` +
    `<p style="margin-left: 25px;">– найдём ${_Latex('y')} средний: ${_Latex(AverY)}</p>` +
    `<p style="margin-left: 25px;">– составим таблицу вспомогательных величин, где ${_Latex(
      perTable
    )}</p>${LastTable(
      nn,
      numX,
      numY,
      numY1,
      '',
      numYy,
      'y',
      '',
      numYy2,
      numYY1,
      numYY12,
      numA,
      numEE,
      NumEE2,
      '',
      SumYy2,
      SumYY12,
      SumA,
      SumEE2
    )}<p><b>3.</b> Индекс корреляции:</p>` +
    `<p class="formulaDisplay">${_Latex(Rcorrel)}</p>` +
    `<p><b>4.</b> Индекс детерминации: ${_Latex(Rdeter)}</p>` +
    `<p style="margin-top: 15px;"><b>5.</b> Средняя ошибка аппроксимации:</p>` +
    `<p class="formulaDisplay">${_Latex(Aerror)}</p>` +
    `<p><b>6.</b> F-критерии Фишера:</p>` +
    `<p style="margin: 10px 0 15px 25px;">– критический (табличный) ${_Latex(Ftabl)}</p>` +
    `<p style="margin: 10px 0 15px 25px;">– фактический ${_Latex(Ffakt)}</p>` +
    `<p>Так как ${_Latex(k1k2)} и ${_Latex(Alpha)}<br />` +
    `где ${_Latex('m')} – это число параметров при переменных уравнения регрессии.</p>` +
    `<p style="margin-top: 15px;"><b>7.</b> Критерии Дарбина-Уотсона:</p>` +
    `<p style="margin: 10px 0 15px 25px;">– критические (табличные) ${_Latex(dTable)}</p>` +
    `<p style="margin: 10px 0 15px 25px;">– фактический ${_Latex(dFakt)}</p>`;

  return (
    <>
      <ol>
        <li>
          Искомая функция:&nbsp;
          <Latex>{`$\\widehat{y}=${a1}\\cdot${b1}^{x}$`}</Latex>
        </li>
        <li>
          Индекс корреляции:&nbsp;
          <Latex>{`$${Rcorrel}$`}</Latex>
        </li>
        <li>
          Индекс детерминации:&nbsp;
          <Latex>{`$${Rdeter}$`}</Latex>
        </li>
        <li>
          Средняя ошибка аппроксимации:&nbsp;
          <Latex>{`$${Aerror}$`}</Latex>
        </li>
      </ol>
    </>
  );
}

export function ExpReg(strX, strY, eps = 4, alpha = 0.05) {
  let str;
  const numX = parseNumber(strX);
  const numY = parseNumber(strY);
  const numX2 = [];
  const numLnY = [];
  const numXLnY = [];
  const nn = numX.length;
  let tabl;
  let Table;
  let Rtable;
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
  if (nn > 100) {
    alert('Не более 100 пар X-Y должно быть.');
    return false;
  }
  for (i = 0; i < nn; i++) {
    numY[i] = 1 * numY[i];
    if (numY[i] < 0) {
      alert(
        'Уравнение экспоненциальная регрессии не может быть построено\n' +
          'для выборки, в которой есть Y-ки меньше 0.\n\n'
      );
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
  const SumX = Math.roundTo(numX.sum(), eps);
  const sumY = numY.sum();
  const SumY = Math.roundTo(numY.sum(), eps);
  const sumX2 = numX2.sum();
  const SumX2 = Math.roundTo(numX2.sum(), eps);
  const sumLnY = numLnY.sum();
  const SumLnY = Math.roundTo(numLnY.sum(), eps);
  const sumXLnY = numXLnY.sum();
  const SumXLnY = Math.roundTo(numXLnY.sum(), eps);
  const B1 = (nn * sumXLnY - sumX * sumLnY) / (nn * sumX2 - sumX * sumX);
  const A1 = (sumLnY - B1 * sumX) / nn;
  const a1 = Math.roundTo(A1, eps);
  const b1 = Math.roundTo(B1, eps);

  Table =
    `<table class="tableReg1"><col span="1" style="width: 35px;" /><colgroup span="6" style="width: 40px;">` +
    `<col span="1" /><col span="1" style="border-right: 4px double #798081" />` +
    `<col span="1" style="width: 44px;" /><col span="1" /><col span="1" /></colgroup>` +
    `<tr style="height: 31px;">` +
    `<td>${_Latex('i')}</td>` +
    `<td>${_Latex('x_i')}</td>` +
    `<td>${_Latex('y_i')}</td>` +
    `<td>${_Latex('x_i^2')}</td>` +
    `<td>${_Latex('\\ln y_i')}</td>` +
    `<td>${_Latex('x_i\\ln y_i')}</td>` +
    `</tr>`;
  for (i = 0; i < nn; i++) {
    Table += `<tr><td>${`${i + 1}</td><td>${numX[i]}</td><td>${numY[i]}</td><td>${Math.roundTo(
      numX2[i],
      eps
    )}</td><td>${Math.roundTo(numLnY[i], eps)}</td><td>${Math.roundTo(
      numXLnY[i],
      eps
    )}</td></tr>`.replace(/-/g, '−')}`;
  }
  Table +=
    `<tr style="height: 31px; font-size: 16px;">` +
    `<td>${_Latex(
      '\\textstyle{\\sum}'
    )}</td>${`<td>${SumX}</td><td>${SumY}</td><td>${SumX2}</td><td>${SumLnY}</td><td>${SumXLnY}`.replace(
      /-/g,
      '−'
    )}</td></tr></table>`;

  if (SumX < 0) {
    var nSumX = `(${SumX})`;
  } else {
    var nSumX = SumX;
  }
  if (SumLnY < 0) {
    var nSumLnY = `(${SumLnY})`;
  } else {
    var nSumLnY = SumLnY;
  }
  if (SumXLnY < 0) {
    var nSumXLnY = `(${SumXLnY})`;
  } else {
    var nSumXLnY = SumXLnY;
  }

  const Bcoeff =
    `b=\\dfrac{n\\sum x_i\\ln y_i-\\sum x_i\\cdot\\sum\\ln y_i }` +
    `{n\\sum x_i^2-\\left(\\sum x_i\\right)^2 }=` +
    `\\dfrac{${nn}\\cdot${nSumXLnY}-${nSumX}\\cdot${nSumLnY}}{${nn}\\cdot${SumX2}-${nSumX}^2}\\approx${b1}\\,;`;
  const Acoeff =
    `\\textstyle{a=\\dfrac{1}{n}\\sum\\ln y_i-\\dfrac{b}{n}\\sum x_i=` +
    `\\dfrac{1}{${nn}}\\cdot${nSumLnY}-\\dfrac{${b1}}{${nn}}\\cdot${nSumX}\\approx${a1}\\,.}`;

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

  const AverY =
    `\\textstyle{\\overline{y}= \\dfrac{1}{n}\\sum y_i= ` + `\\dfrac{${SumY}}{${nn}}=${Ysr}\\,;}`;
  const Rcorrel =
    `R= \\sqrt{1-\\frac{\\sum(y_i-\\widehat{y}_i)^2}{\\sum(y_i-\\overline{y})^2}}=` +
    `\\sqrt{1-\\frac{${SumYY12}}{${SumYy2}}}\\approx${R}\\,;`;
  const Rdeter = `R^2=${R}^2\\approx${R2}\\,;`;
  const Aerror =
    `\\textstyle{\\overline{A}=\\dfrac{1}{n}\\sum` +
    `\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\cdot100\\%=` +
    `\\dfrac{${SumA}}{${nn}}\\cdot100\\%\\approx${Ae}\\%\\,.}`;
  const Ffakt =
    `F_{\\text{fakt}}= \\frac{R^2}{1-R^2}\\cdot\\frac{k_2}{k_1}= ` +
    `\\frac{${R2}}{1-${R2}}\\cdot\\frac{${nn - 2}}{1}\\approx${Ff}\\,;`;
  const Ftabl = `F_{\\text{tabl}}=F(\\alpha,k_1,k_2)=F(${alpha},1,${nn - 2})\\approx${Ft}\\,;`;
  const k1k2 = `k_1=m=1,\\,k_2=n-m-1=${nn}-1-1=${nn - 2}`;
  const Alpha = `\\alpha=${alpha}\\,,`;
  const dTable = 'd_L=,~\\,d_U=';
  const dFakt =
    `d=\\frac{\\sum(\\varepsilon_i-\\varepsilon_{i-1})^2}{\\sum\\varepsilon_i^2}=` +
    `\\frac{${SumEE2}}{${SumYY12}}\\approx${dF}\\,.`;

  const perTable =
    '\\varepsilon_i=y_i-\\widehat{y}_i,~\\,' +
    '\\Delta\\varepsilon_i=\\varepsilon_i-\\varepsilon_{i-1},~\\,' +
    'A_i=\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\colon';

  if (b1 < 0) {
    var sign = '';
  } else {
    var sign = '+';
  }

  str =
    `<p><b>Нахождение и анализ уравнения экспоненциальной регрессии ${_Latex(
      '\\widehat{y}=e^{a+bx}'
    )} для данных:</b></p>${FirstTable(
      nn,
      numX,
      numY
    )}<p><b>1.</b> Составим таблицу вспомогательных величин:</p>${Table}<p>Вычислим коэффициенты ${_Latex(
      'a'
    )} и ${_Latex('b')} ` +
    `уравнения экспоненциальной регрессии ${_Latex('\\widehat{y}=e^{a+bx}')} ` +
    `по известным формулам:</p>` +
    `<p class="formulaDisplay">${_Latex(Bcoeff)}</p>` +
    `<p class="formulaDisplay">${_Latex(Acoeff)}</p>` +
    `<p>Итак, искомое уравнение регрессии имеет вид:</p>` +
    `<p class="formulaDisplay">${_Latex(`\\widehat{y}=e^{${a1}${sign}${b1}x}`)}.</p>` +
    `<p><b>2.</b> Сделаем общий чертёж диаграммы рассеяния и графика уравнения регрессии</p>` +
    `<div id="chart_div"></div>` +
    `<p style="margin: 15px 0;">Для оценки значимости параметров регрессии и корреляции сначала:</p>` +
    `<p style="margin-left: 25px;">– найдём ${_Latex('y')} средний: ${_Latex(AverY)}</p>` +
    `<p style="margin-left: 25px;">– составим таблицу вспомогательных величин, где ${_Latex(
      perTable
    )}</p>${LastTable(
      nn,
      numX,
      numY,
      numY1,
      '',
      numYy,
      'y',
      '',
      numYy2,
      numYY1,
      numYY12,
      numA,
      numEE,
      NumEE2,
      '',
      SumYy2,
      SumYY12,
      SumA,
      SumEE2
    )}<p><b>3.</b> Индекс корреляции:</p>` +
    `<p class="formulaDisplay">${_Latex(Rcorrel)}</p>` +
    `<p><b>4.</b> Индекс детерминации: ${_Latex(Rdeter)}</p>` +
    `<p style="margin-top: 15px;"><b>5.</b> Средняя ошибка аппроксимации:</p>` +
    `<p class="formulaDisplay">${_Latex(Aerror)}</p>` +
    `<p><b>6.</b> F-критерии Фишера:</p>` +
    `<p style="margin: 10px 0 15px 25px;">– критический (табличный) ${_Latex(Ftabl)}</p>` +
    `<p style="margin: 10px 0 15px 25px;">– фактический ${_Latex(Ffakt)}</p>` +
    `<p>Так как ${_Latex(k1k2)} и ${_Latex(Alpha)}<br />` +
    `где ${_Latex('m')} – это число параметров при переменных уравнения регрессии.</p>` +
    `<p style="margin-top: 15px;"><b>7.</b> Критерии Дарбина-Уотсона:</p>` +
    `<p style="margin: 10px 0 15px 25px;">– критические (табличные) ${_Latex(dTable)}</p>` +
    `<p style="margin: 10px 0 15px 25px;">– фактический ${_Latex(dFakt)}</p>`;

  return (
    <>
      <ol>
        <li>
          Искомая функция:&nbsp;
          <Latex>{`$\\widehat{y}=e^{${a1}${sign}${b1}x}$`}</Latex>
        </li>
        <li>
          Индекс корреляции:&nbsp;
          <Latex>{`$${Rcorrel}$`}</Latex>
        </li>
        <li>
          Индекс детерминации:&nbsp;
          <Latex>{`$${Rdeter}$`}</Latex>
        </li>
        <li>
          Средняя ошибка аппроксимации:&nbsp;
          <Latex>{`$${Aerror}$`}</Latex>
        </li>
      </ol>
    </>
  );
}

export function KvadReg(strX, strY, eps = 4, alpha = 0.05) {
  var str = '',
    numX = parseNumber(strX),
    numY = parseNumber(strY),
    numX2 = [],
    numX3 = [],
    numX4 = [],
    numXY = [],
    numX2Y = [],
    nn = numX.length,
    tabl,
    Table,
    Rtable,
    i,
    j,
    k,
    k1,
    m;

  if (nn != numY.length) {
    alert('Число X-ов должно быть равно числу Y-ов.');
    return false;
  }
  if (nn < 3) {
    alert('Минимум пар X-Y должно быть 3.');
    return false;
  }
  if (nn > 100) {
    alert('Не более 100 пар X-Y должно быть.');
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
    SumX = Math.roundTo(sumX, eps),
    sumY = numY.sum(),
    SumY = Math.roundTo(sumY, eps),
    sumX2 = numX2.sum(),
    SumX2 = Math.roundTo(sumX2, eps),
    sumX3 = numX3.sum(),
    SumX3 = Math.roundTo(sumX3, eps),
    sumX4 = numX4.sum(),
    SumX4 = Math.roundTo(sumX4, eps),
    sumXY = numXY.sum(),
    SumXY = Math.roundTo(sumXY, eps),
    sumX2Y = numX2Y.sum(),
    SumX2Y = Math.roundTo(sumX2Y, eps),
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
    Delta = Math.roundTo(delta, eps),
    DeltaA = Math.roundTo(deltaA, eps),
    DeltaB = Math.roundTo(deltaB, eps),
    DeltaC = Math.roundTo(deltaC, eps),
    a1 = deltaA / delta,
    A = Math.roundTo(a1, eps),
    b1 = deltaB / delta,
    B = Math.roundTo(b1, eps),
    c1 = deltaC / delta,
    C = Math.roundTo(c1, eps);

  Table =
    '<table class="tableReg1"><col span="1" style="width: 35px;" /><colgroup span="6" style="width: 40px;">' +
    '<col span="1" /><col span="1" style="border-right: 4px double #798081" />' +
    '<col span="1" /><col span="1" /><col span="1" /><col span="1" /><col span="1" /></colgroup>' +
    '<tr style="height: 31px;">' +
    '<td>' +
    _Latex('i') +
    '</td>' +
    '<td>' +
    _Latex('x_i') +
    '</td>' +
    '<td>' +
    _Latex('y_i') +
    '</td>' +
    '<td>' +
    _Latex('x_i^2') +
    '</td>' +
    '<td>' +
    _Latex('x_i^3') +
    '</td>' +
    '<td>' +
    _Latex('x_i^4') +
    '</td>' +
    '<td>' +
    _Latex('x_iy_i') +
    '</td>' +
    '<td>' +
    _Latex('x_i^2y_i') +
    '</td>' +
    '</tr>';
  for (i = 0; i < nn; i++) {
    Table +=
      '<tr><td>' +
      (
        i +
        1 +
        '</td><td>' +
        numX[i] +
        '</td><td>' +
        numY[i] +
        '</td><td>' +
        Math.roundTo(numX2[i], eps) +
        '</td><td>' +
        Math.roundTo(numX3[i], eps) +
        '</td><td>' +
        Math.roundTo(numX4[i], eps) +
        '</td><td>' +
        Math.roundTo(numXY[i], eps) +
        '</td><td>' +
        Math.roundTo(numX2Y[i], eps) +
        '</td></tr>'
      ).replace(/-/g, '−');
  }
  Table +=
    '<tr style="height: 31px; font-size: 16px;">' +
    '<td>' +
    _Latex('\\textstyle{\\sum}') +
    '</td>' +
    (
      '<td>' +
      SumX +
      '</td><td>' +
      SumY +
      '</td><td>' +
      SumX2 +
      '</td><td>' +
      SumX3 +
      '</td><td>' +
      SumX4 +
      '</td>' +
      '<td>' +
      SumXY +
      '</td><td>' +
      SumX2Y +
      '</td>'
    ).replace(/-/g, '−') +
    '</table>';

  if (SumX < 0) {
    var nSumX = SumX;
  } else {
    var nSumX = '+' + SumX;
  }
  if (SumX2 < 0) {
    var nSumX2 = SumX2;
  } else {
    var nSumX2 = '+' + SumX2;
  }
  if (SumX3 < 0) {
    var nSumX3 = SumX3;
  } else {
    var nSumX3 = '+' + SumX3;
  }

  var sistem =
    '\\begin{cases}' +
    'a\\sum x_i^2+b\\sum x_i+nc=\\sum y_i\\,,\\\\[2pt] ' +
    'a\\sum x_i^3+b\\sum x_i^2+c\\sum x_i=\\sum x_iy_i\\,,\\\\[2pt] ' +
    'a\\sum x_i^4+b\\sum x_i^3+c\\sum x_i^2=\\sum x_i^2y_i\\,;' +
    '\\end{cases}\\!\\!\\Leftrightarrow~' +
    '\\left\\{\\!\\begin{aligned}' +
    '&' +
    SumX2 +
    '\\,a' +
    nSumX +
    '\\,b+' +
    nn +
    '\\,c=' +
    SumY +
    '\\,,\\\\ ' +
    '&' +
    SumX3 +
    '\\,a' +
    nSumX2 +
    '\\,b' +
    nSumX +
    '\\,c=' +
    SumXY +
    '\\,,\\\\ ' +
    '&' +
    SumX4 +
    '\\,a' +
    nSumX3 +
    '\\,b' +
    nSumX2 +
    '\\,c=' +
    SumX2Y +
    '\\,.' +
    '\\end{aligned}\\right.';

  var solveS =
    '\\begin{aligned}' +
    '\\Delta&=' +
    LatexMatrix(
      [
        [SumX2, SumX, nn],
        [SumX3, SumX2, SumX],
        [SumX4, SumX3, SumX2]
      ],
      'v'
    ) +
    '=' +
    Delta +
    '\\,;\\\\[4pt] ' +
    '\\Delta a&=' +
    LatexMatrix(
      [
        [SumY, SumX, nn],
        [SumXY, SumX2, SumX],
        [SumX2Y, SumX3, SumX2]
      ],
      'v'
    ) +
    '=' +
    DeltaA +
    '~~\\Rightarrow~~a=\\frac{\\Delta a}{\\Delta}=' +
    '\\frac{' +
    DeltaA +
    '}{' +
    Delta +
    '}\\approx' +
    A +
    '\\,;\\\\[4pt] ' +
    '\\Delta b&=' +
    LatexMatrix(
      [
        [SumX2, SumY, nn],
        [SumX3, SumXY, SumX],
        [SumX4, SumX2Y, SumX2]
      ],
      'v'
    ) +
    '=' +
    DeltaB +
    '~~\\Rightarrow~~b=\\frac{\\Delta b}{\\Delta}=' +
    '\\frac{' +
    DeltaB +
    '}{' +
    Delta +
    '}\\approx' +
    B +
    '\\,;\\\\[4pt] ' +
    '\\Delta c&=' +
    LatexMatrix(
      [
        [SumX2, SumX, SumY],
        [SumX3, SumX2, SumXY],
        [SumX4, SumX3, SumX2Y]
      ],
      'v'
    ) +
    '=' +
    DeltaC +
    '~~\\Rightarrow~~c=\\frac{\\Delta c}{\\Delta}=' +
    '\\frac{' +
    DeltaC +
    '}{' +
    Delta +
    '}\\approx' +
    C +
    '\\,. ' +
    '\\end{aligned}';

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
    Ysr = Math.roundTo(sumY / nn, eps),
    R = Math.roundTo(Math.sqrt(1 - sumYY12 / sumYy2), eps),
    R2 = Math.roundTo(1 - sumYY12 / sumYy2, eps),
    Ae = Math.roundTo((sumA / nn) * 100, eps),
    Ff = Math.roundTo(((1 - sumYY12 / sumYy2) / (sumYY12 / sumYy2)) * ((nn - 3) / 2), eps),
    Ft = Math.roundTo(AFishF(alpha, 2, nn - 3), eps),
    dF = Math.roundTo(sumEE2 / sumYY12, eps);

  var AverY =
      '\\textstyle{\\overline{y}= \\dfrac{1}{n}\\sum y_i= ' +
      '\\dfrac{' +
      SumY +
      '}{' +
      nn +
      '}=' +
      Ysr +
      '\\,;}',
    Rcorrel =
      'R= \\sqrt{1-\\frac{\\sum(y_i-\\widehat{y}_i)^2}{\\sum(y_i-\\overline{y})^2}}=' +
      '\\sqrt{1-\\frac{' +
      SumYY12 +
      '}{' +
      SumYy2 +
      '}}\\approx' +
      R +
      '\\,;',
    Rdeter = 'R^2=' + R + '^2\\approx' + R2 + '\\,;',
    Aerror =
      '\\textstyle{\\overline{A}=\\dfrac{1}{n}\\sum\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\cdot100\\%=' +
      '\\dfrac{' +
      SumA +
      '}{' +
      nn +
      '}\\cdot100\\%\\approx' +
      Ae +
      '\\%\\,.}',
    Ffakt =
      'F_{\\text{fakt}}= \\frac{R^2}{1-R^2}\\cdot\\frac{k_2}{k_1}= ' +
      '\\frac{' +
      R2 +
      '}{1-' +
      R2 +
      '}\\cdot\\frac{' +
      (nn - 3) +
      '}{2}\\approx' +
      Ff +
      '\\,;',
    Ftabl =
      'F_{\\text{tabl}}=F(\\alpha,k_1,k_2)=F(' +
      alpha +
      ',2,' +
      (nn - 3) +
      ')\\approx' +
      Ft +
      '\\,;',
    k1k2 = 'k_1=m=2,\\,k_2=n-m-1=' + nn + '-2-1=' + (nn - 3),
    Alpha = '\\alpha=' + alpha + '\\,,',
    dTable = 'd_L=,~\\,d_U=',
    dFakt =
      'd=\\frac{\\sum(\\varepsilon_i-\\varepsilon_{i-1})^2}{\\sum\\varepsilon_i^2}=' +
      '\\frac{' +
      SumEE2 +
      '}{' +
      SumYY12 +
      '}\\approx' +
      dF +
      '\\,.';

  var perTable =
    '\\varepsilon_i=y_i-\\widehat{y}_i,~\\,' +
    '\\Delta\\varepsilon_i=\\varepsilon_i-\\varepsilon_{i-1},~\\,' +
    'A_i=\\left|\\dfrac{y_i-\\widehat{y}_i}{y_i}\\right|\\colon';

  str =
    '<p><b>Нахождение и анализ уравнения квадратичной регрессии ' +
    _Latex('\\widehat{y}=ax^2+bx+c') +
    ' для данных:</b></p>' +
    FirstTable(nn, numX, numY) +
    '<p><b>1.</b> Составим таблицу вспомогательных величин:</p>' +
    Table +
    '<p>Найдём коэффициенты ' +
    _Latex('a,\\,b') +
    ' и ' +
    _Latex('c') +
    ' ' +
    'уравнения квадратичной регрессии ' +
    _Latex('\\widehat{y}=ax^2+bx+c') +
    ' из системы уравнений:</p>' +
    '<p class="formulaDisplay">' +
    _Latex(sistem) +
    '</p>' +
    '<p>Решим эту систему линейных уравнений методом Крамера:</p>' +
    '<p class="formulaDisplay">' +
    _Latex(solveS) +
    '</p>' +
    '<p>Итак, искомое уравнение квадратичной регрессии имеет вид:</p>' +
    '<p class="formulaDisplay">' +
    _Latex('\\widehat{y}=' + simplifyEq([A, B, C], ['x^2', 'x', ''])) +
    '.</p>' +
    '<p><b>2.</b> Сделаем общий чертёж диаграммы рассеяния и графика уравнения регрессии</p>' +
    '<div id="chart_div"></div>' +
    '<p style="margin: 15px 0;">Для оценки значимости параметров регрессии и корреляции сначала:</p>' +
    '<p style="margin-left: 25px;">– найдём ' +
    _Latex('y') +
    ' средний: ' +
    _Latex(AverY) +
    '</p>' +
    '<p style="margin-left: 25px;">– составим таблицу вспомогательных величин, где ' +
    _Latex(perTable) +
    '</p>' +
    LastTable(
      nn,
      numX,
      numY,
      numY1,
      '',
      numYy,
      'y',
      '',
      numYy2,
      numYY1,
      numYY12,
      numA,
      numEE,
      NumEE2,
      '',
      SumYy2,
      SumYY12,
      SumA,
      SumEE2
    ) +
    '<p><b>3.</b> Индекс корреляции:</p>' +
    '<p class="formulaDisplay">' +
    _Latex(Rcorrel) +
    '</p>' +
    '<p><b>4.</b> Индекс детерминации: ' +
    _Latex(Rdeter) +
    '</p>' +
    '<p style="margin-top: 15px;"><b>5.</b> Средняя ошибка аппроксимации:</p>' +
    '<p class="formulaDisplay">' +
    _Latex(Aerror) +
    '</p>' +
    '<p><b>6.</b> F-критерии Фишера:</p>' +
    '<p style="margin: 10px 0 15px 25px;">– критический (табличный) ' +
    _Latex(Ftabl) +
    '</p>' +
    '<p style="margin: 10px 0 15px 25px;">– фактический ' +
    _Latex(Ffakt) +
    '</p>' +
    '<p>Так как ' +
    _Latex(k1k2) +
    ' и ' +
    _Latex(Alpha) +
    '<br />' +
    'где ' +
    _Latex('m') +
    ' – это число параметров при переменных уравнения регрессии.</p>' +
    '<p style="margin-top: 15px;"><b>7.</b> Критерии Дарбина-Уотсона:</p>' +
    '<p style="margin: 10px 0 15px 25px;">– критические (табличные) ' +
    _Latex(dTable) +
    '</p>' +
    '<p style="margin: 10px 0 15px 25px;">– фактический ' +
    _Latex(dFakt) +
    '</p>';

  return (
    <ol>
      <li>
        Искомая функция:&nbsp;
        <Latex>{`$\\widehat{y}=${simplifyEq([A, B, C], ['x^2', 'x', ''])}$`}</Latex>
      </li>
      <li>
        Индекс корреляции:&nbsp;
        <Latex>{`$${Rcorrel}$`}</Latex>
      </li>
      <li>
        Индекс детерминации:&nbsp;
        <Latex>{`$${Rdeter}$`}</Latex>
      </li>
      <li>
        Средняя ошибка аппроксимации:&nbsp;
        <Latex>{`$${Aerror}$`}</Latex>
      </li>
    </ol>
  );
}

export function StepenReg(strX, strY, eps = 4, alpha = 0.05) {
  var  str = '',
  numX = parseNumber(strX),
  numY = parseNumber(strY),
  numLnX=[], numLnY=[], numLnXY=[], numLnX2=[],
  nn = numX.length, 
  tabl, Table, Rtable, i, j;

if (nn!=numY.length) { alert('Число X-ов должно быть равно числу Y-ов.'); return false }
if (nn<3)            { alert('Минимум пар X-Y должно быть 3.'); return false }
if (nn>100)          { alert('Не более 100 пар X-Y должно быть.'); return false }
for (i=0; i<nn; i++)
  { numX[i] = 1*numX[i]; numY[i] = 1*numY[i];
    if (numX[i]<0 || numY[i]<0)
       { alert('Уравнение степенной регрессии не может быть построено\n'
               +'для выборки, в которой есть X-сы или Y-ки меньше 0.\n\n');
         return false }
  }

for (i=0; i<nn; i++)
  { numX[i] = 1*numX[i];
    numY[i] = 1*numY[i];
    numLnX[i] = Math.log(numX[i]);
    numLnY[i] = Math.log(numY[i]);
    numLnXY[i] = numLnX[i]*numLnY[i];
    numLnX2[i] = numLnX[i]*numLnX[i];
  }

var sumX = numX.sum(),       SumX = Math.roundTo(numX.sum(),eps),
  sumY = numY.sum(),       SumY = Math.roundTo(numY.sum(),eps),
  sumLnX = numLnX.sum(),   SumLnX = Math.roundTo(numLnX.sum(),eps),
  sumLnY = numLnY.sum(),   SumLnY = Math.roundTo(numLnY.sum(),eps),
  sumLnXY = numLnXY.sum(), SumLnXY = Math.roundTo(numLnXY.sum(),eps),
  sumLnX2 = numLnX2.sum(), SumLnX2 = Math.roundTo(numLnX2.sum(),eps),
  B1 = (nn*sumLnXY-sumLnX*sumLnY)/(nn*sumLnX2-sumLnX*sumLnX),
  A1 = Math.exp((sumLnY-B1*sumLnX)/nn),
  a1 = Math.roundTo(A1,eps),
  b1 = Math.roundTo(B1,eps);

Table = '<table class="tableReg1"><col span="1" style="width: 35px;" /><colgroup span="6" style="width: 40px;">'
      +'<col span="1" /><col span="1" style="border-right: 4px double #798081" />'
      +'<col span="1" style="width: 44px;" /><col span="1" /><col span="1" /><col span="1" /></colgroup>'
      +'<tr style="height: 31px;">'
      +'<td>'+_Latex('i')+'</td>'
      +'<td>'+_Latex('x_i')+'</td>'
      +'<td>'+_Latex('y_i')+'</td>'
      +'<td>'+_Latex('\\ln x_i')+'</td>'
      +'<td>'+_Latex('\\ln^2x_i')+'</td>'
      +'<td>'+_Latex('\\ln y_i')+'</td>'
      +'<td>'+_Latex('\\ln x_i\\cdot\\ln y_i')+'</td>'
      +'</tr>';
for (i=0; i<nn; i++) { Table +='<tr><td>'
                           +((i+1)+'</td><td>'
                            +numX[i]+'</td><td>'
                            +numY[i]+'</td><td>'
                            +Math.roundTo(numLnX[i],eps)+'</td><td>'
                            +Math.roundTo(numLnX2[i],eps)+'</td><td>'
                            +Math.roundTo(numLnY[i],eps)+'</td><td>'
                            +Math.roundTo(numLnXY[i],eps)+'</td></tr>').replace(/-/g,'−')
                   }
Table += '<tr style="height: 31px; font-size: 16px;">'
       +'<td>'+_Latex('\\textstyle\{\\sum\}')+'</td>'
       +('<td>'+SumX+'</td><td>'+SumY+'</td><td>'+SumLnX+'</td><td>'+SumLnX2+'</td><td>'+SumLnY+'</td>'
       +'<td>'+SumLnXY).replace(/-/g,'−')+'</td></tr></table>';

if (sumLnX<0)  {var nSumLnX = '('+SumLnX+')'}   else {var nSumLnX = SumLnX}
if (sumLnY<0)  {var nSumLnY = '('+SumLnY+')'}   else {var nSumLnY = SumLnY}
if (sumLnXY<0) {var nSumLnXY = '('+SumLnXY+')'} else {var nSumLnXY = SumLnXY}

var ABcoeff = '\\begin\{aligned\}'
            +'b&=\\dfrac\{n\\sum(\\ln x_i\\cdot\\ln y_i)-\\sum\\ln x_i\\cdot\\sum\\ln y_i \}'
            +'\{n\\sum\\ln^2x_i-\\left(\\sum\\ln x_i\\right)^2 \}='
            +'\\dfrac\{'+nn+'\\cdot'+nSumLnXY+'-'+nSumLnX+'\\cdot'+nSumLnY+'\}\{'
            +nn+'\\cdot'+SumLnX2+'-'+nSumLnX+'^2\}\\approx'+b1+'\\,;\\\\'
            +'a&=\\exp\\!\\left(\\dfrac\{1\}\{n\}\\sum\\ln y_i-\\dfrac\{b\}\{n\}\\sum\\ln x_i\\right)='
            +'\\exp\\!\\left(\\dfrac\{1\}\{'+nn+'\}\\cdot'+nSumLnY+'-\\dfrac\{'+b1+'\}\{'+nn
            +'\}\\cdot'+nSumLnX+'\\right)\\approx'+a1+'\\,.\\end\{aligned\}';

var numY1=[], numYy=[], numYY1=[], numYy2=[], numYY12=[], numA=[], numEE=[], numEE2=[], NumEE2=[],
  srY = sumY/nn;

for (i=0; i<nn; i++)
  { numY1[i] = A1*Math.pow(numX[i],B1);
    numYy[i] = (numY[i]-srY);
    numYY1[i] = (numY[i]-numY1[i]);
    numYy2[i] = (numYy[i]*numYy[i]);
    numYY12[i] = (numYY1[i]*numYY1[i]);
    numA[i] = Math.abs( numYY1[i]/numY[i] );
  }
for (j=1; j<nn; j++)
 { numEE[j] = (numYY1[j]-numYY1[j-1]);
   numEE2[j] = (numEE[j]*numEE[j]);
   NumEE2[j] = (numEE[j]*numEE[j]);
 }
numEE2.shift();

var sumYy2 = numYy2.sum(),   SumYy2 = Math.roundTo( numYy2.sum(),eps ),
  sumYY12 = numYY12.sum(), SumYY12 = Math.roundTo( numYY12.sum(),eps ),
  sumA = numA.sum(),       SumA = Math.roundTo( numA.sum(),eps ),
  sumEE2 = numEE2.sum(),   SumEE2 = Math.roundTo( numEE2.sum(),eps ),
  Ysr = Math.roundTo( sumY/nn,eps ),
  R = Math.roundTo( Math.sqrt(1-(sumYY12/sumYy2)),eps ),
  R2 = Math.roundTo( (1-(sumYY12/sumYy2)),eps ),
  Ae = Math.roundTo( (sumA/nn)*100,eps),
  Ft = Math.roundTo( AFishF(alpha,1,(nn-2)),eps ),
  Ff = Math.roundTo( ((1-sumYY12/sumYy2)/(sumYY12/sumYy2))*(nn-2),eps ),
  dF = Math.roundTo( sumEE2/sumYY12,eps );
  
var AverY = '\\textstyle\{\\overline\{y\}= \\dfrac\{1\}\{n\}\\sum y_i= '
           +'\\dfrac\{'+SumY+'\}\{'+nn+'\}='+Ysr+'\\,;\}',
Rcorrel = 'R= \\sqrt\{1-\\frac\{\\sum(y_i-\\widehat\{y\}_i)^2\}\{\\sum(y_i-\\overline\{y\})^2\}\}='
            +'\\sqrt\{1-\\frac\{'+SumYY12+'\}\{'+SumYy2+'\}\}\\approx'+R+'\\,;',
 Rdeter = 'R^2='+R+'^2\\approx'+R2+'\\,;',
 Aerror = '\\textstyle\{\\overline\{A\}=\\dfrac\{1\}\{n\}\\sum'
            +'\\left|\\dfrac\{y_i-\\widehat\{y\}_i\}\{y_i\}\\right|\\cdot100\\%='
            +'\\dfrac\{'+SumA+'\}\{'+nn+'\}\\cdot100\\%\\approx'+Ae+'\\%\\,.\}',
  Ffakt = 'F_\{\\text\{fakt\}\}= \\frac\{R^2\}\{1-R^2\}\\cdot\\frac\{k_2\}\{k_1\}= '
            +'\\frac\{'+R2+'\}\{1-'+R2+'\}\\cdot\\frac\{'+(nn-2)+'\}\{1\}\\approx'+Ff+'\\,;',
  Ftabl = 'F_\{\\text\{tabl\}\}=F(\\alpha,k_1,k_2)=F('+alpha+',1,'+(nn-2)+')\\approx'+Ft+'\\,;',
   k1k2 = 'k_1=m=1,\\,k_2=n-m-1='+nn+'-1-1='+(nn-2),
  Alpha = '\\alpha='+alpha+'\\,,',
 dTable = 'd_L=,~\\,d_U=',
  dFakt = 'd=\\frac\{\\sum(\\varepsilon_i-\\varepsilon_\{i-1\})^2\}\{\\sum\\varepsilon_i^2\}='
            +'\\frac\{'+SumEE2+'\}\{'+SumYY12+'\}\\approx'+dF+'\\,.';
   
var perTable = '\\varepsilon_i=y_i-\\widehat\{y\}_i,~\\,'
             +'\\Delta\\varepsilon_i=\\varepsilon_i-\\varepsilon_\{i-1\},~\\,'
             +'A_i=\\left|\\dfrac\{y_i-\\widehat\{y\}_i\}\{y_i\}\\right|\\colon';
             
if (b1<0) {var sign='-'} else {var sign='+'}

str = '<p><b>Нахождение и анализ уравнения степенной регрессии '+_Latex('\\widehat\{y\}=a\\cdot x^b')+' для данных:</b></p>'
              +FirstTable(nn,numX,numY)
              +'<p><b>1.</b> Составим таблицу вспомогательных величин:</p>'+Table
              +'<p>Вычислим коэффициенты '+_Latex('a')+' и '+_Latex('b')+' '
              +'уравнения степенной регрессии '+_Latex('\\widehat\{y\}=a\\cdot x^b')+' по известным формулам:</p>'
              +'<p class="formulaDisplay">'+_Latex(ABcoeff)+'</p>'
              +'<p>Итак, искомое уравнение регрессии имеет вид:</p>'
              +'<p class="formulaDisplay">'+_Latex('\\widehat\{y\}='+a1+'\\cdot x^\{'+b1+'\}')+'.</p>'
         +'<p><b>2.</b> Сделаем общий чертёж диаграммы рассеяния и графика уравнения регрессии</p>'
         +'<div id="chart_div"></div>'
              +'<p style="margin: 15px 0;">Для оценки значимости параметров регрессии и корреляции сначала:</p>'
              +'<p style="margin-left: 25px;">– найдём '+_Latex('y')+' средний: '+_Latex(AverY)+'</p>'
              +'<p style="margin-left: 25px;">– составим таблицу вспомогательных величин, где '+_Latex(perTable)+'</p>'
              +LastTable(nn,numX,numY,numY1,'',numYy,'y','',numYy2,numYY1,numYY12,numA,numEE,NumEE2,'',SumYy2,SumYY12,SumA,SumEE2)
              +'<p><b>3.</b> Индекс корреляции:</p>'
              +'<p class="formulaDisplay">'+_Latex(Rcorrel)+'</p>'
              +'<p><b>4.</b> Индекс детерминации: '+_Latex(Rdeter)+'</p>'
              +'<p style="margin-top: 15px;"><b>5.</b> Средняя ошибка аппроксимации:</p>'
              +'<p class="formulaDisplay">'+_Latex(Aerror)+'</p>'
              +'<p><b>6.</b> F-критерии Фишера:</p>'
                 +'<p style="margin: 10px 0 15px 25px;">– критический (табличный) '+_Latex(Ftabl)+'</p>'
                 +'<p style="margin: 10px 0 15px 25px;">– фактический '+_Latex(Ffakt)+'</p>'
                 +'<p>Так как '+_Latex(k1k2)+' и '+_Latex(Alpha)+'<br />'
                 +'где '+_Latex('m')+' – это число параметров при переменных уравнения регрессии.</p>'
              +'<p style="margin-top: 15px;"><b>7.</b> Критерии Дарбина-Уотсона:</p>'
                 +'<p style="margin: 10px 0 15px 25px;">– критические (табличные) '+_Latex(dTable)+'</p>'
                 +'<p style="margin: 10px 0 15px 25px;">– фактический '+_Latex(dFakt)+'</p>';

                 return (
                  <>
                    <ol>
                      <li>
                        Искомая функция:&nbsp;
                        <Latex>{`$\\widehat\{y\}=${a1}\\cdot x^\{${b1}\}$`}</Latex>
                      </li>
                      <li>
                        Индекс корреляции:&nbsp;
                        <Latex>{`$${Rcorrel}$`}</Latex>
                      </li>
                      <li>
                        Индекс детерминации:&nbsp;
                        <Latex>{`$${Rdeter}$`}</Latex>
                      </li>
                      <li>
                        Средняя ошибка аппроксимации:&nbsp;
                        <Latex>{`$${Aerror}$`}</Latex>
                      </li>
                    </ol>
                  </>
                );
}
