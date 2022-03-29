/* eslint-disable react/prop-types */
import _ from 'lodash';
import React from 'react';

function FieldSetVector({ label, setValue, value }) {
  const handleChange = (v, index) => {
    const n = _.cloneDeep(value);
    n[index] = v;
    setValue(n);
  };
  const renderRow = (c, index) => (
    <td>
      <input
        style={{ width: 40, height: 40, fontSize: 18, textAlign: 'center' }}
        onChange={(e) => handleChange(e.target.value, index)}
        value={c}
      />
    </td>
  );

  return (
    <div style={{ marginTop: 20 }}>
      <div>{label}</div>
      <table>
        <tr>{value.map(renderRow)}</tr>
      </table>
    </div>
  );
}
export default FieldSetVector;
