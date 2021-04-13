import React from 'react'

function Field({id, key, setShownComp, setTitleComp, setCompInfo, shownComp, compTitle, compInfo}) {

    let num = id
    let keyS = String(num)

    return (
        <li key={id} className="form-item">
            <label className="form-label">Shown Graph Component</label>
            <select className="form-input" name="components" id="comp" onChange={(e) => setShownComp({...shownComp, [keyS]: e.target.value})}>
                <option value="" disabled selected>Select option</option>
                <option value="grid">Full Graph</option>
                <option value="title">Title</option>
                <option value="source">Source</option>
                <option value="graph">Graph</option>
                <option value="xAxis">X-Axis</option>
                <option value="yAxis">Y-Axis</option>
            </select>
            <label className="form-label">Section Title:</label>
            <input className="form-input" type="text" onChange={(e) => setTitleComp({...compTitle, [keyS]: e.target.value})}></input>
            <label className="form-label">Section Content:</label>
            <input className="form-input" type="text" onChange={(e) => setCompInfo({...compInfo, [keyS]: e.target.value})} />
        </li>
  );
}

export default Field;
    

