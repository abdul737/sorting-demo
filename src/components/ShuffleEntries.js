import React from 'react'
import {
  EuiButton
} from '@elastic/eui'
import PropTypes from 'prop-types'

const ShuffleEntries = ({disabled, entries, setEntries}) => {
  const shuffle = () => {
    const shuffledEntries = entries.reduce((shuffled, entry, index) => {
      if (shuffled.length) {
        const randomIndex = Math.floor(Math.random() * shuffled.length)
        const tempObject = shuffled[randomIndex]
        shuffled[randomIndex] = entry
        entry = tempObject

        shuffled[randomIndex].prevPosition = index
        entry.prevPosition = randomIndex
      }
      return shuffled.concat(entry)
    }, [])
    setEntries(shuffledEntries)
  }

  return (
    <EuiButton
      disabled={disabled}
      onClick={shuffle}
    >
      Shuffle
    </EuiButton>
  )
}

ShuffleEntries.propTypes = {
  disabled: PropTypes.bool,
  entries: PropTypes.array.isRequired,
  setEntries: PropTypes.func.isRequired
}

export default ShuffleEntries
