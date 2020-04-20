import { useEffect, useRef, useState } from 'react'

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

//create your forceUpdate hook
export function useForceUpdate() {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0) // integer state
  return () => setValue(value => ++value) // update the state to force render
}
