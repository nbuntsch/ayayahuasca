<template>
  <div class="container">
    <div class="dev">
      <div v-if="game.overdose">
        overdose: {{ game.overdose }}<br />
        mood: {{ game.mood }}<br />
        excitement: {{ game.excitement }}
      </div>
      <button @click="createGame">Create game</button>
      <button @click="startGame">Start game</button>
    </div>
    <welcome-form v-if="!gameId" @login="login"></welcome-form>
    <template v-if="player">
      <waiting-tile v-if="game.status === 'idle'"></waiting-tile>
      <idle-tile
        v-if="
          game.status === 'playing' &&
          ['idle', 'hasplayed'].includes(player.status)
        "
      ></idle-tile>
      <eliminated-tile
        v-if="game.status !== 'idle' && player.status === 'eliminated'"
      >
      </eliminated-tile>
      <win-tile v-if="game.status !== 'idle' && player.status === 'winner'">
      </win-tile>
      <card-selector
        v-if="game.status === 'playing' && player.status === 'playing'"
        :game="game"
        @play="play"
      ></card-selector>
    </template>
  </div>
</template>

<script>
import {
  doc,
  collection,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/firebase/init.js';
import { v4 as uuidv4 } from 'uuid';

import WelcomeForm from '@/components/WelcomeForm.vue';
import WaitingTile from '@/components/WaitingTile.vue';
import IdleTile from '@/components/IdleTile.vue';
import CardSelector from '@/components/CardSelector.vue';
import EliminatedTile from '@/components/EliminatedTile.vue';
import WinTile from '@/components/WinTile.vue';

export default {
  components: {
    WelcomeForm,
    WaitingTile,
    IdleTile,
    CardSelector,
    EliminatedTile,
    WinTile,
  },
  data: () => ({
    game: {},
    gameId: null,
    playerIndex: null,
  }),
  computed: {
    player() {
      if (!this.game.players) return null;
      return this.game.players[this.playerIndex];
    },
  },
  methods: {
    login(gameId) {
      this.gameId = gameId;
      this.createPlayer();
      this.getGame();
    },
    createPlayer() {
      const gameRef = doc(db, 'games', this.gameId);
      getDoc(gameRef).then((game) => {
        const data = game.data();
        data.players.push({ id: uuidv4(), status: 'idle' });
        updateDoc(gameRef, data);
        this.playerIndex = data.players.length - 1;
      });
    },
    getGame() {
      onSnapshot(doc(db, 'games', this.gameId), (snapshot) => {
        this.game = snapshot.data();
      });
    },
    updateGame() {
      const game = doc(db, 'games', this.gameId);
      updateDoc(game, this.game);
    },
    chooseFirstPlayer() {
      const randomIndex = Math.floor(Math.random() * this.game.players.length);
      this.game.players[randomIndex].status = 'playing';
      this.updateGame();
    },
    play(card) {
      this.updateCharacterValues(card);

      if (this.game.overdose >= 100) {
        this.game.players[this.playerIndex].status = 'eliminated';
        this.game.overdose = 0;
        this.game.mood = 0;
        this.game.excitement = 0;

        const remainingPlayers = this.game.players.filter(
          (player) => player.status !== 'eliminated'
        );

        if (remainingPlayers.length === 1) {
          const remainingPlayerIndex = this.game.players.findIndex(
            (player) => player.status !== 'eliminated'
          );

          this.game.players[remainingPlayerIndex].status = 'winner';
          this.game.status = 'over';

          this.updateGame();
        }
      } else {
        this.game.players[this.playerIndex].status = 'hasplayed';
      }

      const idlePlayers = this.game.players.filter(
        (player) => player.status === 'idle'
      );

      const hasPlayedPlayers = this.game.players.filter(
        (player) => player.status === 'hasplayed'
      );

      if (idlePlayers.length > 0 || hasPlayedPlayers.length > 0) {
        let nextPlayerId;

        if (idlePlayers.length > 0) {
          const randomIndex = Math.floor(Math.random() * idlePlayers.length);
          nextPlayerId = idlePlayers[randomIndex].id;
        } else {
          const randomIndex = Math.floor(
            Math.random() * hasPlayedPlayers.length
          );
          nextPlayerId = hasPlayedPlayers[randomIndex].id;

          this.game.players.forEach((player) => {
            if (player.status === 'hasplayed') {
              player.status = 'idle';
            }
          });
        }

        // if (this.game.excitement === 100) {
        //   nextPlayerIndex = this.playerIndex;
        // }

        const nextPlayerIndex = this.game.players.findIndex(
          (player) => player.id === nextPlayerId
        );

        setTimeout(() => {
          this.game.players[nextPlayerIndex].status = 'playing';
          this.updateGame();
        }, 200);
      }
    },
    updateCharacterValues(card) {
      if (this.game.overdose_delay > 0) {
        this.game.overdose += this.game.overdose_delay;
        this.game.overdose_delay = 0;
      }
      if (card.overdose_delay > 0) {
        this.game.overdose_delay = card.overdose_delay;
      }

      switch (this.game.mood) {
        case 100:
          this.game.overdose += card.overdose * 2;
          break;
        case 50:
          this.game.overdose += card.overdose * 1.2;
          break;
        case 0:
          this.game.overdose += card.overdose;
          break;
        case -50:
          this.game.overdose += card.overdose * 0.8;
          break;
        case -100:
          this.game.overdose += card.overdose * 0;
          break;
      }

      if (this.game.mood >= 100 || this.game.mood <= -100) {
        this.game.mood = 0;
      } else {
        this.game.mood += card.mood;
      }

      if (this.game.excitement >= 50) {
        this.game.overdose += 3;
      }

      if (this.game.excitement >= 100 || this.game.excitement <= -100) {
        this.game.excitement = 0;
      } else {
        this.game.excitement += card.excitement;
      }

      // if (this.game.overdose >= 100) {
      //   this.game.status = 'over';
      // }
    },
    // tmp
    createGame() {
      const gameId = Math.floor(100000 + Math.random() * 900000);
      const game = {
        status: 'idle',
        players: [],
        overdose: 0,
        mood: 0,
        excitement: 0,
      };

      var gamesRef = collection(db, 'games');
      setDoc(doc(gamesRef, 'i' + gameId), game);

      alert('game id : i' + gameId);
    },
    startGame() {
      this.game.status = 'playing';
      this.updateGame();
      this.chooseFirstPlayer();
    },
  },
};
</script>

<style lang="scss">
@import 'node_modules/pixel-borders/src/styles/pixel-borders/pixel-borders-mixins';

:root {
  --blue: #33e;
  --darkblue: #008;
  --white: #eee;
  --black: #333;
  --gray: #bbb;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 20px;
  font-family: 'VT323', monospace;
}

body {
  background: var(--gray);
}

.container {
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
}

.tile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;

  h1 {
    margin-bottom: 20px;

    img {
      width: 320px;
    }
  }

  h2 {
    margin-bottom: 15px;
  }

  input {
    display: block;
    width: 200px;
    height: 50px;
    margin-bottom: 20px;
    text-align: center;
    color: var(--black);
    background: var(--white);

    @include pixel-borders(
      $corner-size: 1,
      $border-size: 5px,
      $border-color: var(--black),
      $border-inset-color: true
    );

    &:focus {
      outline: none;
    }
  }

  button {
    display: block;
    width: 200px;
    height: 50px;
    color: var(--white);
    background: var(--blue);

    @include pixel-borders(
      $corner-size: 2,
      $border-size: 5px,
      $border-color: var(--darkblue),
      $border-inset-color: false
    );
  }
}

.portrait {
  width: 200px;
  margin-bottom: 40px;
  @include pixel-borders(
    $corner-size: 1,
    $border-size: 5px,
    $border-color: var(--black),
    $border-inset-color: true
  );
}

.dev {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
