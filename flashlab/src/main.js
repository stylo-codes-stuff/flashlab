import { Game } from "phaser";
import { Boot } from "./Boot";
import { MainMenu } from "./MainMenu";
import { Preloader } from "./Preloader";
import { matrixCube } from "./scenes/graphics experiments/matrix cube/cube";
import { sliders } from "./scenes/graphics experiments/sliders/sliders";
import { radio } from "./scenes/toys/radio/radio";
import { particles } from "./scenes/graphics experiments/particles/particles";
import { celltalk } from "./scenes/toys/celltalk/celltalk";
import { solarSystem } from "./scenes/physics experiments/interactive solar system/solarsystem";


//  Find out more information about the Game Config at: https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 }
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        matrixCube,
        sliders,
        radio,
        particles,
        celltalk,
        solarSystem,
        
    ]
};

export default new Game(config);
