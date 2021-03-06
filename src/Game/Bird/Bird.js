import React from "react";
import ReactHowler from "react-howler";
import { Howl } from "howler";
import { withAssets } from "Engine/AssetLoader";

import { AnimationContainer, Idle, Sing, Sacrifice } from "./Elements";

// TODO: Create prefetcher object
import songA from "./assets/audio/volca-bird-01.mp3";
import songS from "./assets/audio/volca-bird-02.mp3";
import songD from "./assets/audio/volca-bird-03.mp3";
import sacrificeSound from "./assets/audio/volca-sacrifice.mp3";

const sounds = [
  { key: "q", blob: songA },
  { key: "w", blob: songS },
  { key: "e", blob: songD }
];

class Bird extends React.PureComponent {
  static IDLE = 0;
  static SING = 1;
  static SACRIFICE = 2;

  state = {
    birdState: Bird.IDLE
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()
    ) {
      // Sacrifice state
      if (this.props.pressedKeys.includes(" ") === true) {
        this.setState(
          {
            birdState: Bird.SACRIFICE
          },
          () => {
            this.playSacrificeSound();
          }
        );

        return;
      }

      // Sing state
      if (this.props.pressedKeys.length > 0) {
        this.setState({
          birdState: Bird.SING
        });
        return;
      }

      // Idle state
      this.setState({
        birdState: Bird.IDLE
      });
    }
  }

  playSacrificeSound = () => {
    const sound = new Howl({
      src: [sacrificeSound]
    });

    sound.play();
  };

  render() {
    return (
      <AnimationContainer state={this.state.birdState}>
        {sounds.map(sound => {
          return (
            <ReactHowler
              key={sound.key}
              ref={ref => (this[`soundSource_${sound.key}`] = ref)}
              src={sound.blob}
              playing={this.props.pressedKeys.includes(sound.key)}
              onPause={() => this[`soundSource_${sound.key}`].stop()}
            />
          );
        })}

        {this.state.birdState === Bird.IDLE && <Idle duration={6.3} />}

        {this.state.birdState === Bird.SING && <Sing />}

        {this.state.birdState === Bird.SACRIFICE && <Sacrifice />}
      </AnimationContainer>
    );
  }
}

export default Bird;
