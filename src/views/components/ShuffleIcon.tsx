import { ReactNode, useEffect, useState } from 'react'

import { BsMoon } from 'react-icons/bs'
import { BsSun } from 'react-icons/bs'
import { BsCloud } from 'react-icons/bs'
import { BsCloudRain } from 'react-icons/bs'
import { BsLightning } from 'react-icons/bs'
import { BsCloudFog2 } from 'react-icons/bs'
import { BsSnow } from 'react-icons/bs'
import { BsTornado } from 'react-icons/bs'

import ShuffleService from '../../utils/ShuffleService'

interface Props {
  children: ReactNode
  endDelay?: number
  className?: string
}

function ShuffleIcon(props: Props) {
  const endDelay = props.endDelay ?? 0
  const icons = [
    <BsMoon />,
    <BsSun />,
    <BsCloud />,
    <BsCloudRain />,
    <BsLightning />,
    <BsCloudFog2 />,
    <BsSnow />,
    <BsTornado />,
  ]

  const [index, setIndex] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)

  useEffect(() => {
    ;(async () => {
      for (let i = 0; i < 20 + endDelay; i++) {
        const rand = Math.floor(Math.random() * icons.length)

        setIndex(rand)
        await ShuffleService.sleep()
      }

      setIsShuffled(true)
    })()
    // eslint-disable-next-line
  }, [])

  return (
    <div className={props.className}>
      {!isShuffled && <>{icons[index]}</>}

      {isShuffled && <>{props.children}</>}
    </div>
  )
}

export default ShuffleIcon
