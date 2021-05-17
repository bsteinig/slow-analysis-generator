import React from 'react'

function Field({id, key, optionslist, setShownComp, setTitleComp, setCompInfo, shownComp, compTitle, compInfo}) {

    let num = id
    let keyS = String(num)
    let selectList = optionslist.map((item, i) => {
        return (
          <option key={i} value={item.val}>{item.option}</option>
        )
    });

    return (
        <li key={id} className="form-item">
            <label className="form-label">Shown Graph Component</label>
            <select className="form-input" name="components" id="comp" onChange={(e) => setShownComp({...shownComp, [keyS]: e.target.value})} required>
                <option value="" disabled selected>Select option</option>
                {selectList}
            </select>
            <label className="form-label">Section Title:</label>
            <input className="form-input" type="text" onChange={(e) => setTitleComp({...compTitle, [keyS]: e.target.value})} required></input>
            <label className="form-label">Section Content:</label>
            <input className="form-input" type="text" onChange={(e) => setCompInfo({...compInfo, [keyS]: e.target.value})} required/>
        </li>
  );
}

export default Field;
    

