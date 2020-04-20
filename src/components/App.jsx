import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import '../assets/tailwind.scss'
import {
  EuiPage,
  EuiPageBody,
  EuiButton,
  EuiSuperSelect,
  EuiRange,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui'
import Canvas from './Canvas'
import { Util } from 'konva'
import ShuffleEntries from './ShuffleEntries'

const SORTING_METHODS = {
  BUBBLE_SORT: 'Bubble sort',
  INSERTION_SORT: 'Insertion sort'
}

const App = () => {
  const [isSortingStarted, setIsStortingStarted] = useState(false)
  const [entries, setEntries] = useState([])
  const [sortingMethod, setSortingMethod] =
    useState(Object.values(SORTING_METHODS)[0])
  const [pointerPosition, setPointerPosition] = useState({})

  useEffect(() => {
    const length = 20
    setEntries(
      Array.from({ length }, () => ({
        value: Math.floor(Math.random() * 200),
        color: Util.getRandomColor()
      }))
    )
  }, [])

  const startSorting = async () => {
    setIsStortingStarted(true)
  }

  // eslint-disable-next-line no-unused-vars
  const stopSorting = async () => {
    setIsStortingStarted(false)
  }

  useEffect(() => {
    if (isSortingStarted) {
      if (sortingMethod === SORTING_METHODS.BUBBLE_SORT) {
        bubbleSort(entries)
      }
    }
  }, [isSortingStarted])

  const bubbleSort = async (entries, i = 0, j = 0) => {
    if (i < entries.length - 1 && isSortingStarted) {
      if (j < entries.length - i - 1 && isSortingStarted) {
        if (entries[j].value > entries[j + 1].value) {
          const temp = entries[j]
          entries[j] = entries[j + 1]
          entries[j + 1] = temp

          entries[j].prevPosition = j + 1
          entries[j + 1].prevPosition = j
          setEntries(entries)
        }
        j++
      } else {
        i++
        j = 0
      }

      await wait()
      setPointerPosition({
        p1: j,
        p2: j + 1
      })

      await wait()
      bubbleSort(entries, i, j)
    } else {
      setIsStortingStarted(false)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const wait = (seconds = 0.3) => {
    return new Promise(
      resolve => setTimeout(resolve, seconds * 1000)
    )
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>Sorting demo</title>
      </Helmet>
      <EuiPage className="h-full w-full bg-gray-500">
        <EuiPageBody>
          <EuiFlexGroup alignItems="center" justifyContent="center" direction="column">
            <EuiFlexItem grow={false}>
              <h1 data-test="greeting" className="text-white text-4xl text-center">
                Welcome to the Sorting Demo!
              </h1>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFlexGroup justifyContent="center" className="euiCard">
                <EuiFlexItem grow={false}>
                  <ShuffleEntries
                    disabled={isSortingStarted}
                    entries={entries}
                    setEntries={setEntries}
                  />
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{ width: '200px' }}>
                  <EuiSuperSelect
                    disabled={isSortingStarted}
                    valueOfSelected={sortingMethod}
                    options={
                      Object.values(SORTING_METHODS)
                        .map(value => ({ value, inputDisplay: value }))
                    }
                    onChange={(method) => setSortingMethod(method)}
                  />
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{ width: '200px' }}>
                  <EuiRange
                    id="range"
                    min={1}
                    max={20}
                    step={1}
                    value={0}
                    onChange={() => {}}
                    showLabels
                    aria-label="An example of EuiRange with showLabels prop"
                  />
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton
                    isLoading={isSortingStarted}
                    onClick={startSorting}
                    fill
                  >
                    Start sorting
                  </EuiButton>
                  {
                    // isSortingStarted ?
                    //   <EuiButton
                    //     color="danger"
                    //     onClick={stopSorting}
                    //   >
                    //     Stop sorting
                    //   </EuiButton>
                    //   :
                    //   <EuiButton
                    //     onClick={startSorting}
                    //     fill
                    //   >
                    //     Start sorting
                    //   </EuiButton>
                  }
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem style={{ marginTop: '140px' }}>
              <Canvas
                entries={entries}
                pointerPosition={pointerPosition}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPageBody>
      </EuiPage>
    </HelmetProvider>
  )
}

export default App
