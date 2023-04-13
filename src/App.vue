<script>
import Counters from './components/Counters.vue';
import EventLog from './components/EventLog.vue';
import Purchase from './components/Purchase.vue';
import Achievements from './components/Achievements.vue';

export default {
  components: {
    Counters,
    EventLog,
    Purchase,
    Achievements
  },
  async created() {
    if (localStorage.pirateStates) {
      this.$store.dispatch("updateIfStorage", localStorage.pirateStates);
    }
    this.$store.dispatch("incrementAsync");
  },
  methods: {
    resetStorage() {
      localStorage.removeItem("pirateStates");
      this.$store.dispatch("updateIfStorage", JSON.stringify({
        counterValues: {
          gold: 0,
          fear: 0,
          manpower: { deckhand: 1, muscle: 0 },
          ships: { dingy: 1, galley: 0, warship: 0 },
        },
        incRate: {
          gold: (1 / 3),
          fear: 0.1
        },
        messageLog: [
          "Congratulations matey you just got your first boat! Time to search for riches."
        ]
      }));
    }
  }

}
</script>

<template>
  <header>
    <h1> Ahoy! Prepare to set sail 🏴‍☠️</h1>
    <button @click="resetStorage" id="resetButton">New Voyage</button>
  </header>

  <div class="gameSpace">
    <Counters />
    <Achievements />
    <EventLog />
    <Purchase />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=IM+Fell+DW+Pica+SC&family=IM+Fell+English:ital@0;1&display=swap');
</style>
