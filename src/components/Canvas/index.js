import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Layer, Stage, Rect, Text, Group, Line } from 'react-konva'
import { lightOrDark } from '../../Utils/ColorUtils'
import { fontFamily } from '../../Utils/FontUtils'
import { usePrevious } from '../../Utils/CustomHooks'

const canvasWidth = window.innerWidth - 30
const canvasHeight = 565
// eslint-disable-next-line no-unused-vars
const Canvas = ({ entries = [], pointerPosition }) => {
  let pointerRef = useRef()
  const prevPointerPosition = usePrevious(pointerPosition)
  const [graphParams, setGraphParams] = useState(null)
  const [pointer, setPointer] = useState([])
  useEffect(() => {
    if (entries.length) {
      const maxValue = entries.reduce((max, { value }) => {
        if (value > max) {
          return value
        }
        return max
      }, 0)
      setGraphParams({
        horizontalStep: (basePosition.width - (10 * entries.length)) / entries.length,
        verticalStep: canvasHeight / maxValue,
        fontSize: 400 / entries.length
      })
    }
  }, [entries])

  let prevPoint1 = 0, point1 = 0, point2 = 0
  useEffect(() => {
    if (pointerPosition.p1 && pointerPosition.p2) {
      point1 = basePosition.x + pointerPosition.p1 * (graphParams.horizontalStep + 10) + graphParams.horizontalStep / 2
      point2 = (pointerPosition.p2 - pointerPosition.p1) * (graphParams.horizontalStep + 10)

      if (prevPointerPosition.p1) {
        prevPoint1 = basePosition.x + prevPointerPosition.p1 * (graphParams.horizontalStep + 10) + graphParams.horizontalStep / 2
      } else {
        prevPoint1 = point1
      }

      setPointer([prevPoint1, point1, point2])
    }
  }, [pointerPosition])

  useEffect(() => {
    if (pointer.length) {
      pointerRef.to({
        x: pointer[1],
        duration: 0.1
      })
    }
  }, [pointer])

  return (
    <Stage width={canvasWidth} height={canvasHeight}>
      <Layer>
        {
          graphParams &&
          entries.map((entry, index) => (
            <MyRect
              key={index}
              position={index}
              prevPosition={
                Number.isInteger(entry.prevPosition)
                  ? entry.prevPosition
                  : index
              }
              value={entry.value}
              color={entry.color}
              horizontalStep={graphParams.horizontalStep}
              verticalStep={graphParams.verticalStep}
              fontSize={graphParams.fontSize}
            />
          ))
        }
        {
          pointer.length ?
            <Line
              ref={node => pointerRef = node}
              x={pointer[0]}
              y={canvasHeight - 55}
              points={[0, 0, 0, 40, pointer[2], 40, pointer[2], 0, pointer[2] - 10, 0, pointer[2] - 10, 30, 10, 30, 10, 0]}
              tension={0.05}
              closed
              stroke="black"
              strokeWidth={0.5}
              fillLinearGradientStartPoint={{ x: -50, y: -50 }}
              fillLinearGradientEndPoint={{ x: 50, y: 50 }}
              fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
            />
            : []
        }
      </Layer>
    </Stage>
  )
}

Canvas.propTypes = {
  entries: PropTypes.array,
  pointerPosition: PropTypes.object
}

const basePosition = {
  x: canvasWidth * 0.05,
  y: canvasHeight - 65,
  width: canvasWidth * 0.9
}

const MyRect = ({
  color,
  position,
  prevPosition,
  value,
  horizontalStep,
  verticalStep,
  fontSize
}) => {
  let groupRef = useRef()
  const horizontalStepWithPadding = horizontalStep + 10
  const isLightColor = lightOrDark(color) === 'light'
  const width = horizontalStep
  const height = value * verticalStep

  useEffect(() => {
    // console.log({prevPosition, position})
    if (prevPosition !== position) {
      groupRef.to({
        x: basePosition.x + (position * horizontalStepWithPadding),
        duration: 0.1
      })
    }
  }, [position, prevPosition])

  return (
    <Group
      ref={node => (groupRef = node)}
      x={basePosition.x + (prevPosition * horizontalStepWithPadding)}
      y={basePosition.y - height}
    >
      <Rect
        fill={color}
        shadowBlur={1}
        width={width}
        height={height}
      />
      <Text
        text={value}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fill={isLightColor ? 'black' : 'white'}
        width={width}
        height={height}
        align="center"
        verticalAlign="bottom"
      />
    </Group>
  )
}

MyRect.propTypes = {
  color: PropTypes.string,
  position: PropTypes.number,
  prevPosition: PropTypes.number,
  value: PropTypes.number,
  fontSize: PropTypes.number,
  horizontalStep: PropTypes.number,
  verticalStep: PropTypes.number
}

export default Canvas
