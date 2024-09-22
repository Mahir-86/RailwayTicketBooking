import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { increase,decrease } from './Slice';
const App=()=>{
  const [count,setCount]=useState(1)
  const [color,setColor]=useState("red")
  const track=useSelector((s)=>s.counter)
  const dispatch=useDispatch()
  return (
  <>
    <h1>{count}here{track}</h1>
    <button onClick={()=>{setCount(count+1)}}>click here to increase counter</button><br />
    <input type="text" onChange={(e)=>{setColor(e.target.value)}}  />
    <p style={{backgroundColor:color,height:100,width:100}}></p>
    <h2>counter redux toolkit {track}</h2>
    <button onClick={()=>{dispatch(increase())}}>increase redux toolkit</button>
    <button onClick={()=>{dispatch(decrease())}}>decrease redux toolkit</button>
    esdk new chsk waoj<br/>
    mord cjds eiw ajsk
  </>
  )
}
export default App;
