import {renderWordInfo} from './wordle';
import words from '~/words.json';
import {Wordle} from './Wordle';
import readline from 'readline';
const game = new Wordle(words);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on('close', function() {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});

const question = (q: string) => new Promise<string>(
    (resolve) => rl.question(q, resolve),
);

const gameLoop = async () => {
  const startAns = await question('Start Wordle ? ');
  if (startAns.toLowerCase() !== 'yes') {
    rl.close();
    return;
  }
  game.startGame();
  console.log('Try to guess the Wordle', game.answer);
  while (game.isRunning()) {
    try {
      const guessAns = await question(`Guess ${game.attempt}: `);
      game.tryGuess(guessAns.toLowerCase());
      console.table(game.guessInfos);
      for (const info of game.guessInfos) {
        renderWordInfo(info);
      }
    } catch (err) {
      console.log('Invalid Word');
    }
  }
  console.log(`${
    game.isWin ? 'Correct' : 'Oh no'
  }, the Wordle is ${game.answer}`);
  gameLoop();
};

gameLoop();
