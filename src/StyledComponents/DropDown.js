import React, { useState } from 'react'
import PropTypes from 'prop-types'

const DropDown = ({ selectedItem, items, onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
      >
        {selectedItem || 'Select one'}
      </button>
      {
        isDropdownOpen &&
        <div className="mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
          {
            items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(item, index)
                  setIsDropdownOpen(false)
                }}
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                {item}
              </button>
            ))
          }
        </div>
      }
    </div>
  )
}

DropDown.propTypes = {
  selectedItem: PropTypes.string,
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default DropDown
