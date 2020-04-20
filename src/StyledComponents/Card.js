import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ children }) => {
  return (
    <div className="m-10 bg-gray-100 max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.any
}

export default Card
