/* eslint-disable react/prop-types */
import _ from 'lodash';
import React from 'react';

function FieldSetTable({ label, setTable, table }) {
  const handleChange = (v, row, column) => {
    const n = _.cloneDeep(table);
    n[row][column] = v;
    setTable(n);
  };
  const renderRow = (row, ri) => {
    const renderCell = (cell, ci) => (
      <td>
        <input
          style={{ width: 40, height: 40, fontSize: 18, textAlign: 'center' }}
          value={cell}
          onChange={(e) => handleChange(e.target.value, ri, ci)}
        />
      </td>
    );
    return <tr>{row.map(renderCell)}</tr>;
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div>{label}</div>
      <table>{table.map(renderRow)}</table>
    </div>
  );
}

export default FieldSetTable;
