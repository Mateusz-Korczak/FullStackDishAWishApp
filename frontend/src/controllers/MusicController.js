import { Howl } from 'howler';
import song from '../media/song.mp3';


const sound = new Howl({
    src: [song],
});


sound.pannerAttr({
    distanceModel: "linear",
    maxDistance: 17,
    panningModel: "equalpower",
    refDistance: 1,
    rolloffFactor: 1,
    coneInnerAngle: 360,
    coneOuterAngle: 360,
    coneOuterGain: 0,
});


sound.pannerAttr(sound.pannerAttr());


const MusicController = {
    play: () => {
        if (!sound.playing()) {
            sound.play();
        }
    },
};


export default MusicController;
