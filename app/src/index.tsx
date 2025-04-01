/** @jsxImportSource @emotion/react */
import { CitesRoyalesOptionsSpec } from '@gamepark/cites-royales/CitesRoyalesOptions'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { CitesRoyalesSetup } from '@gamepark/cites-royales/CitesRoyalesSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { CitesRoyalesLogs } from './history/CitesRoyalesLogs'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'
import { CitesRoyalesTutorial } from './tutorial/CitesRoyalesTutorial'
import { TutorialAI } from './tutorial/TutorialAI'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="cites-royales"
      Rules={CitesRoyalesRules}
      tutorial={new CitesRoyalesTutorial()}
      ai={TutorialAI}
      optionsSpec={CitesRoyalesOptionsSpec}
      GameSetup={CitesRoyalesSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      logs={new CitesRoyalesLogs()}
    >
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)

