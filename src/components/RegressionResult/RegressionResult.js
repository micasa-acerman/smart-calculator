import React from 'react';
import Latex from 'react-latex';
import Graph from '../Graph';
import './regressionResult.css';

const escapeLatex = (str) =>
  (str || '').replaceAll('Infinity', '\\infty').replaceAll('NaN', '\\infty');
function RegressionResult({
  func,
  Rdeter,
  Aerror,
  correl,
  Ffakt,
  Ftabl,
  df,
  Alpha,
  Ttabl,
  Tabrxy,
  dFakt,
  graphData
}) {
  return (
    <ol className="list">
      <li>
        Искомая функция:&nbsp;
        <Latex>{`$${func}$`}</Latex>
      </li>
      <li>
        Индекс детерминации:&nbsp;
        <Latex>{`$${Rdeter}$`}</Latex>
      </li>
      <li>
        <div>Средняя ошибка аппроксимации:&nbsp;</div>
        <Latex>{`$${Aerror}$`}</Latex>
      </li>
      <li>
        <div>Коэффициент линейной парной корреляции:</div>
        <div>
          <Latex>{`$${correl}$`}</Latex>
        </div>
      </li>
      <li>
        <div>Коэффициент детерминации:</div>
        <div>
          <Latex>{`$${escapeLatex(Rdeter)}$`}</Latex>
        </div>
      </li>
      <li>
        F-критерии Фишера
        <ul>
          <li>
            фактический: <Latex>{`$${escapeLatex(Ffakt)}$`}</Latex>
          </li>
          <li>
            критический (табличный): <Latex>{`$${escapeLatex(Ftabl)}$`}</Latex>
          </li>
        </ul>
        Так как <Latex>{`$${escapeLatex(df)}$`}</Latex> и{' '}
        <Latex>{`$${escapeLatex(`${Alpha}\\,;`)}$`}</Latex>
      </li>
      {Ttabl && Tabrxy && (
        <li>
          t-статистики Стьюдента:
          <ul>
            <li>
              Табличная: <Latex>{`$${escapeLatex(Ttabl)}$`}</Latex> так как{' '}
              <Latex>{`$${escapeLatex(df)}$`}</Latex>
            </li>
            <li>
              Фактические: <Latex>{`$${escapeLatex(Tabrxy)}$`}</Latex>
            </li>
          </ul>
        </li>
      )}

      <li>
        Критерии Дарбина-Уотсона:
        <ul>
          <li>
            Фактические: <Latex>{`$${escapeLatex(dFakt)}$`}</Latex>
          </li>
        </ul>
      </li>
      <li>
        График функции:
        <Graph data={graphData} variables={['points', 'function']} />
      </li>
    </ol>
  );
}

export default RegressionResult;
