<script>
export default {
  methods: {
    hire(event) {
      console.log(event);
      this.$store.dispatch("hireCrew", event.srcElement.id)
    },
    getCrewCap(){
      return Math.floor(this.$store.state.counterValues.ships.dingy) * 5 + Math.floor(this.$store.state.counterValues.ships.galley) * 20 + Math.floor(this.$store.state.counterValues.ships.warship) * 50;
    },
    buyShip(event) {
      this.$store.dispatch("buyShip", event.srcElement.id)
    },
    attemptBefriend(event){
      this.$store.dispatch("befriendAttempt");
    }
  },
  computed: {
    cantHireDeckhand() {
      let cap = this.getCrewCap();
      let total = this.$store.state.counterValues.manpower.deckhand + this.$store.state.counterValues.manpower.muscle
      return (total >= cap) || (this.$store.state.counterValues.gold < 5)
    },
    cantHireMerc() {
      let cap = this.getCrewCap();
      let total = this.$store.state.counterValues.manpower.deckhand + this.$store.state.counterValues.manpower.muscle
      return (total >= cap) || (this.$store.state.counterValues.gold < 20)
    },
    cantBuyDingy() {
      return this.$store.state.counterValues.gold < 50
    },
    cantBuyGalley() {
      return this.$store.state.counterValues.gold < 600
    },
    cantBuyWarship() {
      return this.$store.state.counterValues.gold < 5000
    },
    cantBefriend(){
      return this.$store.state.counterValues.fear < 100 || this.$store.state.coolDown < 20
    }
  },
}
</script>

<template>
  <div class="purchaseWrapper">
    <button @click="hire" :disabled="cantHireDeckhand" id="deckhand">Hire deckhand</button>
    <button @click="hire" :disabled="cantHireMerc" id="mercenary">Hire mercenary</button>
    <button @click="buyShip" :disabled="cantBuyDingy" id="dingy">Buy a dingy</button>
    <button @click="buyShip" :disabled="cantBuyGalley" id="galley">Buy a galley</button>
    <button @click="buyShip" :disabled="cantBuyWarship" id="warship">Buy a warship</button>
    <button @click="attemptBefriend" :disabled="cantBefriend">Befriend a . . . ?</button>
  </div>
</template>
