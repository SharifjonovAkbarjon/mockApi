import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
   const counter = useSelector(state => state.counter.value)
   
  return (
    <div>
        <h2>Header {counter}</h2>
    </div>
  )
}

export default Header