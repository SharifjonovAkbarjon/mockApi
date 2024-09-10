import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inc,dec ,reset } from '../redux/slices/counter-slice'

const Hero = () => {
   const dispatch = useDispatch()
   const counter = useSelector(state=> state.counter.value)
   console.log(counter);
   
  return (
    <div>
        <h2>Hero</h2>
        <button onClick={()=> dispatch(inc(1))}>Increment 1</button>
        <button onClick={()=> dispatch(inc(10))}>Increment 10</button>
        <button disabled={counter <= 0} onClick={()=> dispatch(dec())}>Decrement</button>
        <button onClick={()=> dispatch(reset())}>Reset</button>
    </div>
  )
}

export default Hero