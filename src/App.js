import React, { useState } from 'react'
import Basic from './components/Basic'
import ExtraRow from './components/ExtraRow'
import ExtraCol from './components/ExtraCol'
import basic from './img/basic.png'
import double from './img/double.png'

function App() {

  const [selected, setSelected] = useState("")

  const onValueChange = (e) => {
    setSelected((e.target.value))
    console.log(e.target.value)
  }

  return(
    <div className="home-page">
      <div className="menu-row" onChange={(e) => onValueChange(e)}>
          <div className="radio-col">
            <img src={basic} alt="basic" height="100" />
            Basic Graph
            <input type="radio" value="Basic" name="Basic Graph" checked={selected === 'Basic'} /> 
          </div>
          <div className="radio-col">
            <img src={double} alt="double" height="100" />
            Extra X-Axis
            <input type="radio" value="ExtraRow" name="Double X-Axis" checked={selected === 'ExtraRow'}/> 
          </div>
          <div className="radio-col">
            <img src={double} alt="double" height="100" />
              Extra Points Column
            <input type="radio" value="ExtraCol" name="Extra Points" checked={selected === 'ExtraCol'}/> 
          </div>
      </div>
      { selected === 'Basic' ?
        <Basic/>
      :
        <div>
        { selected === 'ExtraRow' ?
          <ExtraRow/>
        :
          <ExtraCol/>
        }
        </div>
      }
    </div>
  )
}

export default App;