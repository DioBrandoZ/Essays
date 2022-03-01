import React, { memo } from 'react'

const MemoCom = memo(({name}) => {
  console.log('rerender: ==>', name)
  return <div>{name.name}</div>
})

export default MemoCom