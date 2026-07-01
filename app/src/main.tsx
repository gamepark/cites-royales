import { CitesRoyalesOptionsSpec } from '@gamepark/cites-royales/CitesRoyalesOptions'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { CitesRoyalesSetup } from '@gamepark/cites-royales/CitesRoyalesSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { CitesRoyalesTheme } from './CitesRoyalesTheme'
import { CitesRoyalesLogs } from './history/CitesRoyalesLogs'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { CitesRoyalesTutorial } from './tutorial/CitesRoyalesTutorial'
import { TutorialAI } from './tutorial/TutorialAI'

createRoot(document.getElementById('root')!).render(
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
      theme={CitesRoyalesTheme}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
