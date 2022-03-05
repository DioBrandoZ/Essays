import React, { memo } from 'react'

const MemoCom = memo(({name}) => {
  console.log('rerender: ==>', name)
  return <div>{name}</div>
})

export default MemoCom