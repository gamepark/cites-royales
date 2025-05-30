/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FailuresDialog, FullscreenDialog, LiveLogContainer, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { Headers } from './headers/Headers'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      { !!game && <GameDisplay players={game.players.length} /> }
      <LoadingScreen display={loading} author="William Liévin" artist="Marina Coudray" publisher="Origames" developer={['Origames', 'Valentin Dhilly']}/>
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)} />
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
      {!loading && <LiveLogContainer css={css`position: absolute; bottom: 5em; width: 50em;`} /> }
    </>
  )
}
