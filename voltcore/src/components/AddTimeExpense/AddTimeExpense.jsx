import React from 'react';
import './AddTimeExpense.css';
import { Check } from 'lucide-react';
import { X, Pencil,Trash2  } from 'lucide-react';
const AddTimeExpense = ({
  handleExpenseInput,
  rowId,
  expIndex,
  data,
  saveTimeExpense,
  deleteTimeExpense,
}) => {
  return (
    <div className="atexp-con">
      <div>{expIndex + 1}</div>
      <input
        type="number"
        name="hourSpent"
        onChange={(e) => {
          handleExpenseInput(e, rowId, expIndex);
        }}
        value={data?.hourSpent}
        placeholder="Please Add Hours Spent"
        disabled={data.status}
      />
      <textarea
        name="description"
        onChange={(e) => {
          handleExpenseInput(e, rowId, expIndex);
        }}
        placeholder="Please give task details"
        value={data.description}
        disabled={data.status}
        
      />
      {data.status && <Pencil  className="pntr"   onClick={() => {
            handleExpenseInput('', rowId, expIndex, 'edit');
            console.log('Edit Data');
            

          }} />}
      {!data.status && (
        <Check
          onClick={() => {
            // handleExpenseInput('', rowId, expIndex, 'remove');
            saveTimeExpense(rowId, expIndex);
            console.log('Save Input');
          }}
          className="pntr"
        />
      )}

      <Trash2 
        onClick={() => {
          // handleExpenseInput('', rowId, expIndex, 'remove');
          deleteTimeExpense(rowId, expIndex);
        }}
        className="pntr"
      />
    </div>
  );
};

export default AddTimeExpense;
