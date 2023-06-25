<template>
  <div class="welcome">
    <h1>
      <img src="@/assets/img/logo.gif" alt="Ayayahuasca!" />
    </h1>
    <img
      src="@/assets/img/tourist.png"
      alt="A tourisst looking for some trips"
      class="portrait"
    />
    <h2>Enter the code displayed on the main screen!</h2>
    <div class="welcome-error" :class="{ 'is-visible': error }">
      Invalid activation code.
    </div>
    <form @submit.prevent="login">
      <input type="number" v-model="activationCode" />
      <button>Join Game</button>
    </form>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/init.js";

export default {
  emits: ["login"],
  data: () => ({
    activationCode: "",
    error: false,
  }),
  methods: {
    login() {
      getDoc(doc(db, "games", "i" + this.activationCode)).then((docSnap) => {
        if (docSnap.exists()) {
          this.$emit("login", docSnap.id);
        } else {
          this.error = true;
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "node_modules/pixel-borders/src/styles/pixel-borders/pixel-borders-mixins";

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

.welcome {
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

.welcome-error {
  margin-bottom: 10px;
  color: red;
  font-size: 20px;
  text-align: center;
  visibility: hidden;

  &.is-visible {
    visibility: visible;
  }
}
</style>
