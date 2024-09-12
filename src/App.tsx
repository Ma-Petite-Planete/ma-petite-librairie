import "./app.css"
import { MppButton, ButtonType } from "./components/MppButton";
import MppTextStyle from "./section/MppTextStyleSection/MppTextStyleSection";
import InputDemo from "./section/InputSection";
import React from "react";
import yellowLogo from './ressources/logo/scolaire/yellow_logo_blue_text.svg';
import whiteLogo from './ressources/logo/scolaire/white_logo_white_text.svg';
import logoOnly from './ressources/logo/scolaire/logo_only.svg';
import MppToaster from "./components/MppToaster/MppToaster";

function App() {

  return (
    <div className="main_background">
      <h1>Logo</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img src={yellowLogo} alt="" style={{ width: '460px' }} />
        <img src={whiteLogo} alt="" style={{ width: '460px' }} />
        <img src={logoOnly} alt="" style={{ width: '150px' }} />
      </div>
      <h1>Type de Texte</h1>
      <MppTextStyle />
      <h1>Type de Bouton</h1>
      <div className="button_background">
        <MppButton
          title="Bouton d'action"
          onPress={() => {
            console.log('Bouton cliqué!');
          }}
          buttonType={ButtonType.primaryLarge}
        />
        <div>
          <MppButton
            title="Bouton d'action"
            onPress={() => {
              console.log('Bouton cliqué!');
            }}
            buttonType={ButtonType.primaryMedium}
          />
        </div>
        <MppButton
          title="Bouton d'action"
          onPress={null}
          buttonType={ButtonType.primaryLarge}
        />
      </div>
      <div className="button_background">
        <MppButton
          title="Bouton d'action"
          onPress={() => {
            console.log('Bouton cliqué!');
          }}
          buttonType={ButtonType.secondaryLarge}
        />
        <div>
          <MppButton
            title="Bouton d'action"
            onPress={() => {
              console.log('Bouton cliqué!');
            }}
            buttonType={ButtonType.secondaryMedium}
          />
        </div>
        <MppButton
          title="Bouton d'action"
          onPress={null}
          buttonType={ButtonType.secondaryLarge}
        />
      </div>
      <h1>Input</h1>
      <InputDemo />
      <h1>Toaster</h1>

      <MppToaster/>
    </div>

  )
}

export default App
