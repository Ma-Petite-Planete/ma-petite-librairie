import "./app.css";
import React from "react";
import { MppButton, ButtonType } from "./components/MppButton";
import MppTextStyle from "./section/MppTextStyleSection/MppTextStyleSection";
import MppPodium from "./components/MppPodium/MppPodium";
import InputDemo from "./section/InputSection";
import yellowLogo from "./ressources/logo/yellow_logo_blue_text.svg";
import whiteLogo from "./ressources/logo/white_logo_white_text.svg";
import logoOnly from "./ressources/logo/logo_only_yellow.svg";

function App() {
  return (
    <div className="main_background">
      <h1>Logo</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img src={yellowLogo} alt="" style={{ width: "460px" }} />
        <img src={whiteLogo} alt="" style={{ width: "460px" }} />
        <img src={logoOnly} alt="" style={{ width: "150px" }} />
      </div>
      <h1>Type de Texte</h1>
      <MppTextStyle />
      <h1>Type de Bouton</h1>
      <div className="button_background">
        <MppButton
          title="Bouton d'action"
          onPress={() => {
            console.log("Bouton cliqué!");
          }}
          buttonType={ButtonType.primaryLarge}
        />
        <div>
          <MppButton
            title="Bouton d'action"
            onPress={() => {
              console.log("Bouton cliqué!");
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
            console.log("Bouton cliqué!");
          }}
          buttonType={ButtonType.secondaryLarge}
        />
        <div>
          <MppButton
            title="Bouton d'action"
            onPress={() => {
              console.log("Bouton cliqué!");
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
      <h3>Trophés</h3>
      <MppPodium
        isMppScolaire={true}
        rankedElements={[
          {
            name: "4èmeD",
            points: 3,
            ranking: 1,
          },
          {
            name: "4èmeB",
            points: 3,
            ranking: 2,
          },
          {
            name: "4èmeA",
            points: 3,
            ranking: 3,
          },
        ]}
      />
    </div>
  );
}

export default App;
