import React, { useState, useEffect} from 'react'
import  Slider from 'react-input-slider'
import Field from './Field'
import '../App.css'

function Basic() {
  const [link, setLink] = useState("");
  const [linkSubmit, setLinkSubmit] = useState(false);
  const [title,setTitle] = useState("")
  const [gridNums, setGridNums] = useState({
    a: 7,
    b: 78,
    c: 8,
    d: 7,
    e: 7,
    f: 93,
  });
  const [slideLock, setSlideLock] = useState({
    a: false,
    b: false,
    c: false,
    d: false
  });
  const [lockedHeight, setLockedHeight] = useState(0)
  const [elmNum, setElmNum] = useState([1,2,3,4,5,6]);
  const [numSubmit, setNumSubmit] = useState(false);
  const [shownComp, setShownComp] = useState({})
  const [compTitle, setTitleComp] = useState({})
  const [compInfo, setCompInfo] = useState({})
  var optionsList = [
    {val: 'grid', option: 'Full Graph'},
    {val: 'title', option: 'Title'},
    {val: 'source', option: 'Source'},
    {val: 'xAxis', option: 'X-Axis'},
    {val: 'yAxis', option: 'Y-Axis'},
    {val: 'graph', option: 'Graph'},
]

  useEffect(() => {
    setLockedHeight(0)
    var x = 0, count = 0;
    for (var key in slideLock){
      if(slideLock.hasOwnProperty(key)){
        if(slideLock[key]){
          console.log(gridNums[key])
          x = x + gridNums[key]
          count++;
        }
      }
    } 
    setLockedHeight(x)
  }, [slideLock,lockedHeight]);

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleImageSubmit = () => {
    console.log("here");
    setLinkSubmit(true);
  };

  const handleNumberSubmit = () => {
    setNumSubmit(true);
  };

  const exportHTML = () => {
    var shownTxt = "[ ", titleTxt = "[ ", infoTxt = "[ "
    for (var key in shownComp){
      if(shownComp.hasOwnProperty(key)){
        shownTxt = shownTxt + "'"  + String(shownComp[key]) + "', "
      }
    }
    shownTxt = shownTxt + "]"
    for( var key in compTitle){
      if(compTitle.hasOwnProperty(key)){
        titleTxt = titleTxt + "'" + String(compTitle[key]) + "', "
      }
    }
    titleTxt = titleTxt + "]"
    for (var key in compInfo){
      if(compInfo.hasOwnProperty(key)){
        infoTxt = infoTxt + "'" + String(compInfo[key]) + "', "
      }
    }
    infoTxt = infoTxt + "]"
    console.log(shownTxt, titleTxt, infoTxt)
    var htmlDoc = `<!DOCTYPE html><html> <head> <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <title></title> <meta name="description" content="> <meta name="viewport" content="width=device-width, initial-scale=1"> <style> @import url('https://fonts.googleapis.com/css2?family=Bitter:wght@400;500;700&display=swap'); *{ box-sizing: border-box; margin: 0; padding: 0; font-family: "Bitter", 'Times New Roman', Times, serif ; } .container{ display: flex; flex-direction: row; } /* Image Component */ .img-comp{ flex: 2; position: relative; display: block; } .responsive{ width: 100%; height: auto; display: block; } .grid{ position: absolute; top: 0; left: 0; height: 100%; width: 100%; /* grid stying */ visibility: hidden; display: grid; grid-template: ${gridNums.a}% ${gridNums.b}% ${gridNums.c}% ${gridNums.d}% / ${gridNums.e}% ${gridNums.f}%; grid-template-areas: 'title title' 'yAxis graph' 'xAxis xAxis' 'source source'; } .title{ grid-area: title; background-color: black; opacity: .75; visibility: inherit; } .yAxis{ grid-area: yAxis; background-color: black; opacity: .75; visibility: inherit; } .graph{ grid-area: graph; background-color: black; opacity: .75; visibility: inherit; } .important-points{ grid-area: points; background-color: black; opacity: .75; visibility: inherit; } .xAxis{ grid-area: xAxis; background-color: black; opacity: .75; visibility: inherit; } .source{ grid-area: source; background-color: black; opacity: .75; visibility: inherit; } /* Info Component */ .info-comp{ flex: 1; padding-left: .5rem; display: flex; flex-direction: column; align-items: center; } .headline { font-weight: 700; font-size: 1.75vw; color: rgb(19, 133, 185); } .comp-title{ margin-top: 1.25vw; font-weight: 500; font-size: 1.75vw; margin-bottom: 1.25vw; } .comp-info{ font-weight: 400; font-size: 1.5vw; letter-spacing: 1px; line-height: 1; margin-left: 1.5vw; margin-right: 1vw; margin-bottom: 3.5vw; } /* Javascript Stuff */ .btn-group { display: flex; flex-direction: row; justify-content: space-around; align-items: center; } .btn { display: flex; color: #fff; font-size: 1.75vw; letter-spacing: 1px; line-height: 1; outline: 0; border: none; padding: 1.2vw; background-color: black; margin: 1.5vw; } .btn:hover{ background-color: rgb(19, 133, 185); cursor: pointer; } </style> </head> <body> <div class="container"> <div class="img-comp"> <a href="https://ourworldindata.org/world-population-growth#how-has-world-population-growth-changed-over-time" target="_blank" rel="noopener noreferrer"> <img src="${link}" alt="graph" width="700px" height="435px" class="responsive"/> </a> <a href="https://ourworldindata.org/world-population-growth#how-has-world-population-growth-changed-over-time" target="_blank" rel="noopener noreferrer"> <div class="grid" id="grid"> <div class="title" id="title"></div> <div class="yAxis" id="yAxis"></div> <div class="graph" id="graph"></div> <div class="xAxis" id="xAxis"></div> <div class="source" id="source"></div> </div> </a> </div> <div class="info-comp"> <h1 class="headline">${title}</h1> <h3 class="comp-title" id="comp-title">Click Next to begin</h3> <h5 class="comp-info" id="comp-info"></h5> <div class="btn-group"> <button class="btn" onclick="backClick()">Back</button> <button class="btn" onclick="nextClick()">Next</button> </div> </div> </div> <script> let comp_title = ${titleTxt}; let comp_content = ${infoTxt}; let id_table = ${shownTxt}; let index = 0; function nextClick(){ ++index; if(index > comp_title.length-1){ for(var i = 1; i < comp_title.length; ++i){ document.getElementById(id_table[i]).style.visibility = "inherit"; } document.getElementById(id_table[0]).style.visibility = "hidden"; index = 0 }else{ document.getElementById(id_table[index-1]).style.visibility = "visible"; } console.log(index); document.getElementById(id_table[index]).style.visibility = "hidden"; document.getElementById("comp-title").innerHTML = comp_title[index]; document.getElementById("comp-info").innerHTML = comp_content[index]; } function backClick(){ --index; if(index < 0){ index = comp_title.length-1; document.getElementById(id_table[0]).style.visibility = "visible"; }else{ document.getElementById(id_table[index+1]).style.visibility = "visible"; } if(index === 0){ for(var i = 1; i < comp_title.length; ++i){ document.getElementById(id_table[i]).style.visibility = "inherit"; } document.getElementById(id_table[0]).style.visibility = "hidden"; } console.log(index); document.getElementById(id_table[index]).style.visibility = "hidden"; document.getElementById("comp-title").innerHTML = comp_title[index]; document.getElementById("comp-info").innerHTML = comp_content[index]; } </script> </body></html>`
    document.getElementById('export-box').innerHTML = htmlDoc
  }

  const changeTitle = (x) => {
    if (x !== gridNums.a) {
      let diff = x - gridNums.a;
      let compSum = (slideLock.b ? 0 : gridNums.b) + ( slideLock.c ? 0 : gridNums.c )  + (slideLock.d ? 0 : gridNums.d);
      //console.log(diff)
      let gdiff = (slideLock.b ? gridNums.b : gridNums.b - (gridNums.b / compSum) * diff);
      let xdiff = (slideLock.c ? gridNums.c : gridNums.c - (gridNums.c / compSum) * diff);
      let sdiff = (slideLock.d ? gridNums.d : gridNums.d - (gridNums.d / compSum) * diff);
      //console.log(x,gdiff,xdiff,sdiff,(x+gdiff+xdiff+sdiff))
      setGridNums({ ...gridNums, a: x, b: gdiff, c: xdiff, d: sdiff });
    }
  };

  const changeGraph = (x) => {
    if (x !== gridNums.b) {
      let diff = x - gridNums.b;
      let compSum = ( slideLock.a ? 0 : gridNums.a ) + ( slideLock.c ? 0 : gridNums.c )  + (slideLock.d ? 0 : gridNums.d);
      //console.log(diff)
      let tdiff = (slideLock.a ? gridNums.a : gridNums.a - (gridNums.a / compSum) * diff);
      let xdiff = (slideLock.c ? gridNums.c : gridNums.c - (gridNums.c / compSum) * diff);
      let sdiff = (slideLock.d ? gridNums.d : gridNums.d - (gridNums.d / compSum) * diff);
      //console.log(x,gdiff,xdiff,sdiff,(x+gdiff+xdiff+sdiff))
      setGridNums({ ...gridNums, a: tdiff, b: x, c: xdiff, d: sdiff });
    }
  };

  const changeXaxis = (x) => {
    if (x !== gridNums.c) {
      let diff = x - gridNums.c;
      let compSum = (slideLock.b ? 0 : gridNums.b) + (slideLock.a ? 0 : gridNums.a) + (slideLock.d ? 0 : gridNums.d);
      //console.log(diff)
      let gdiff = (slideLock.b ? gridNums.b : gridNums.b - (gridNums.b / compSum) * diff);
      let tdiff = (slideLock.a ? gridNums.a : gridNums.a - (gridNums.a / compSum) * diff);
      let sdiff = (slideLock.d ? gridNums.d : gridNums.d - (gridNums.d / compSum) * diff);
      //console.log(x,gdiff,xdiff,sdiff,(x+gdiff+xdiff+sdiff))
      setGridNums({ ...gridNums, a: tdiff, b: gdiff, c: x, d: sdiff });
    }
  };

  const changeSource = (x) => {
    if (x !== gridNums.d) {
      let diff = x - gridNums.d;
      let compSum = (slideLock.b ? 0 : gridNums.b) + ( slideLock.c ? 0 : gridNums.c ) + (slideLock.a ? 0 : gridNums.a);
      //console.log(diff)
      let gdiff = (slideLock.b ? gridNums.b : gridNums.b - (gridNums.b / compSum) * diff);
      let xdiff = (slideLock.c ? gridNums.c : gridNums.c - (gridNums.c / compSum) * diff);
      let tdiff = (slideLock.a ? gridNums.a : gridNums.a - (gridNums.a / compSum) * diff);
      //console.log(x,gdiff,xdiff,sdiff,(x+gdiff+xdiff+sdiff))
      setGridNums({ ...gridNums, a: tdiff, b: gdiff, c: xdiff, d: x });
    }
  };

  const changeYaxis = (x) => {
    let diff = x - gridNums.e;
    setGridNums({ ...gridNums, e: x, f: gridNums.f - diff });
  };

  return (
    <div className="app">
      <div className="header">
        <label htmlFor="Graph Image Link" className="input-label">
          Basic Graph Image Link:
        </label>
        <input
          type="text"
          className="input-text"
          onChange={handleLinkChange}
        />
        <button className="submit-btn" onClick={handleImageSubmit}>
          Show Graph
        </button>
      </div>
      {linkSubmit ? (
        <div className="container">
          <div className="img-comp">
            <img
              src={`${link}`}
              alt="graph"
              height="435px"
              className="responsive"
            />
            <div
              className="grid"
              id="grid"
              style={{
                gridTemplateRows: `${gridNums.a}% ${gridNums.b}% ${gridNums.c}% ${gridNums.d}%`,
                gridTemplateColumns: `${gridNums.e}% ${gridNums.f}%`,
              }}
            >
              <div className="title" id="title">
                Title
              </div>
              <div className="yAxis" id="yAxis">
                Y-Axis
              </div>
              <div className="graph" id="graph">
                Graph
              </div>
              <div className="xAxis" id="xAxis">
                X-Axis
              </div>
              <div className="source" id="source">
                Source
              </div>
            </div>
          </div>
          <div className="slider-comp">
            <div className="slide-obj">
              <div className="slider-box">
                <p className="slider-tag">
                  Title Height: {`${parseInt(gridNums.a)}%`}
                </p>
                <Slider
                  className="slider"
                  axis="x"
                  xstep={1}
                  xmin={1}
                  xmax={100-lockedHeight}
                  disabled={slideLock.a}
                  x={gridNums.a}
                  onChange={({ x }) => changeTitle(x)}
                  styles={{track: {backgroundColor: '#379683'}, active: { backgroundColor: '#8ee4af'}}}
                />
              </div>
              <div className="lock-box">
                <label className="lock-label">Locked&nbsp;</label>
                <input
                  type="checkbox"
                  defaultChecked={slideLock.a}
                  onChange={() => setSlideLock({ ...slideLock, a: !slideLock.a })}
                />
              </div>
            </div>
            <div className="slide-obj">
              <div className="slider-box">
                <p className="slider-tag">
                  Graph Height: {`${parseInt(gridNums.b)}%`}
                </p>
                <Slider
                  className="slider"
                  axis="x"
                  xstep={1}
                  xmin={1}
                  xmax={100-lockedHeight}
                  disabled={slideLock.b}
                  x={gridNums.b}
                  onChange={({ x }) => changeGraph(x)}
                  styles={{track: {backgroundColor: '#379683'}, active: { backgroundColor: '#8ee4af'}}}
                />
              </div>
              <div className="lock-box">
                <label className="lock-label">Locked&nbsp;</label>
              <input
                type="checkbox"
                defaultChecked={slideLock.b}
                onChange={() => setSlideLock({ ...slideLock, b: !slideLock.b })}
              />
              </div>
            </div>
            <div className="slide-obj">
              <div className="slider-box">
                <p className="slider-tag">
                  X-axis Height: {`${parseInt(gridNums.c)}%`}
                </p>
                <Slider
                  className="slider"
                  axis="x"
                  xstep={1}
                  xmin={1}
                  xmax={100-lockedHeight}
                  disabled={slideLock.c}
                  x={gridNums.c}
                  onChange={({ x }) => changeXaxis(x)}
                  styles={{track: {backgroundColor: '#379683'}, active: { backgroundColor: '#8ee4af'}}}
                />
              </div>
              <div className="lock-box">
                <label className="lock-label">Locked&nbsp;</label>
                <input
                  type="checkbox"
                  defaultChecked={slideLock.c}
                  onChange={() => setSlideLock({ ...slideLock, c: !slideLock.c })}
                />
              </div>
            </div>
            <div className="slide-obj">
              <div className="slider-box">
              <p className="slider-tag">
                Source Height: {`${parseInt(gridNums.d)}%`}
              </p>
              <Slider
                className="slider"
                axis="x"
                xstep={1}
                xmin={1}
                xmax={100-lockedHeight}
                disabled={slideLock.d}
                x={gridNums.d}
                onChange={({ x }) => changeSource(x)}
                styles={{track: {backgroundColor: '#379683'}, active: { backgroundColor: '#8ee4af'}}}
              />
              </div>
              <div className="lock-box">
                <label className="lock-label">Locked&nbsp;</label>
                <input
                  type="checkbox"
                  defaultChecked={slideLock.d}
                  onChange={() => setSlideLock({ ...slideLock, d: !slideLock.d })}
                />
              </div>
            </div>
            <div className="spacer"></div>
            <div className="slide-obj">
              <div className="slider-box">
                <p className="slider-tag">
                  Y-axis Width: {`${parseInt(gridNums.e)}%`}
                </p>
                <Slider
                  className="slider"
                  axis="x"
                  xstep={1}
                  xmin={1}
                  xmax={100}
                  x={gridNums.e}
                  onChange={({ x }) => changeYaxis(x)}
                  styles={{track: {backgroundColor: '#379683'}, active: { backgroundColor: '#8ee4af'}}}
                />
              </div>
            </div>
            <p className="slider-tag">
              Graph Width: {`${parseInt(gridNums.f)}%`}
            </p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="form-row">
        <button className="submit-btn" onClick={handleNumberSubmit}>
          Generate Form
        </button>
      </div>
      {numSubmit ? (
        <div>
        <div className="lister">
          <div className="list-div">
            <label className="form-label">Graph Title</label>
            <input className="form-input" type="text" onChange={(e)=>setTitle(e.target.value)}/>
          </div>
        </div>
          <ul className="form">
            {elmNum.map((index) => (
              <Field id={index} key={index} optionslist={optionsList} setShownComp={setShownComp} setTitleComp={setTitleComp} setCompInfo={setCompInfo}
                shownComp={shownComp} compTitle={compTitle} compInfo={compInfo}/>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
      { linkSubmit && numSubmit ? 
      
      <div className="form-row">
        <button className="submit-btn" onClick={exportHTML}>
          Export
        </button>
        <textarea id="export-box" className="export-box"></textarea>
      </div>
      :
      <div></div>
      }
    </div>
  );
}

export default Basic;
