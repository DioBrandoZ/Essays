import React, { useState, useEffect } from 'react'
import req from './req'
import './index.css'

const SingleModeCom = () =>  {
  const [state, setState] = useState('_1')
  const getInfo = () => {
    req.req().then((res) => {
      setState(prev => {
        const arr = prev.split('_')
        return `${res}_${+arr[1]+1}`
      })
    })
  }

  useEffect(() => {
    getInfo()
  }, [])

  return <div className='test' onClick={getInfo}>{state}</div>
}

export default SingleModeCom
