import Shuffle from './Shuffle'
import ShuffleIcon from './ShuffleIcon'
import WeatherService from '../../utils/WeatherService'

import { BsSun } from 'react-icons/bs'
import { BsCloud } from 'react-icons/bs'
import { BsCloudFog2 } from 'react-icons/bs'
import { BsCloudRain } from 'react-icons/bs'
import { BsLightning } from 'react-icons/bs'
import { BsSnow } from 'react-icons/bs'
import AnimateProgress from './AnimateProgress'

interface Props {
  area: string

  weatherCode: number
  temp: number
  humi: number
  className?: string
}

function WeatherCard(props: Props) {
  // Weather Codeを天気名に変換
  // 例 0 -> "sunny", 51 -> "rainy"
  const weatherLabel = WeatherService.weatherLabelFromCode(props.weatherCode)

  return (
    <div className={props.className}>
      <div className="bg-primary/20   w-72 py-1">
        <Shuffle extraFrames={20} className="text-4xl text-center">
          {props.area}
        </Shuffle>
      </div>

      <div className="mt-6   flex justify-between items-center   text-3xl">
        <Shuffle extraFrames={28}>{weatherLabel}</Shuffle>

        <ShuffleIcon endDelay={28}>
          {weatherLabel === 'sunny' && <BsSun />}

          {weatherLabel === 'cloudy' && <BsCloud />}

          {weatherLabel === 'fog' && <BsCloudFog2 />}

          {weatherLabel === 'rainy' && <BsCloudRain />}

          {weatherLabel === 'snowy' && <BsSnow />}

          {weatherLabel === 'thunder' && <BsLightning />}
        </ShuffleIcon>
      </div>

      <div className="mt-6   flex justify-between gap-4">
        <div className="flex flex-col justify-around gap-4   w-full">
          <AnimateProgress
            value={props.temp}
            max={50}
            className="cyber-progress  w-full h-2"
          />
          <AnimateProgress
            value={props.humi}
            max={100}
            className="cyber-progress  w-full h-2"
          />
        </div>

        <div className="flex flex-col gap-4 items-end   text-2xl">
          <div className="whitespace-nowrap">
            <Shuffle
              extraFrames={36}
              className="inline"
            >{`${props.temp}`}</Shuffle>
            <span> °C</span>
          </div>

          <div className="whitespace-nowrap">
            <Shuffle
              extraFrames={40}
              className="inline"
            >{`${props.humi}`}</Shuffle>
            <span> %</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
