import { content } from './HowToPlay.module.css';
import WordRow from './WordRow';

const HowToPlay = () => {
  return (
    <div className={content}>
      <h1>HOW TO PLAY</h1>
      <p>Guess the WORDLE in six tries.</p>
      <p>
        Each guess must be a valid five-letter word. Hit the enter button to
        submit.
      </p>
      <p>
        After each guess, the color of the tiles will change to show how close
        your guess was to the word.
      </p>
      <hr></hr>
      <h3>Examples</h3>
      <WordRow
        info={[
          { char: 'W', state: 1 },
          { char: 'E', state: null },
          { char: 'A', state: null },
          { char: 'R', state: null },
          { char: 'Y', state: null },
        ]}
      />
      <p>The letter W is in the word and in the correct spot.</p>
      <WordRow
        info={[
          { char: 'P', state: null },
          { char: 'I', state: 2 },
          { char: 'L', state: null },
          { char: 'L', state: null },
          { char: 'S', state: null },
        ]}
      />
      <p>The letter I is in the word but in the wrong spot.</p>
      <WordRow
        info={[
          { char: 'V', state: null },
          { char: 'A', state: null },
          { char: 'G', state: null },
          { char: 'U', state: 0 },
          { char: 'E', state: null },
        ]}
      />
      <p>The letter U is not in the word in any spot.</p>
      <hr></hr>
      <p>
        <b>A new WORDLE will be available each day!</b>
      </p>
    </div>
  );
};
export default HowToPlay;
