<script>
export default {
  data() {
    return {
      dhHover: false,
      mHover: false,
      diHover: false,
      gHover: false,
      wHover: false,
      bHover: false
    }
  },
  methods: {
    hire(event) {
      console.log(event);
      this.$store.dispatch("hireCrew", event.srcElement.id)
    },
    getCrewCap() {
      return Math.floor(this.$store.state.counterValues.ships.dingy) * 5 + Math.floor(this.$store.state.counterValues.ships.galley) * 20 + Math.floor(this.$store.state.counterValues.ships.warship) * 50;
    },
    buyShip(event) {
      this.$store.dispatch("buyShip", event.srcElement.id)
    },
    attemptBefriend(event) {
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
      return (total >= cap) || (this.$store.state.counterValues.gold < 20) || this.$store.state.counterValues.manpower.deckhand <= this.$store.state.counterValues.manpower.muscle
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
    cantBefriend() {
      return this.$store.state.counterValues.fear < 25000 || this.$store.state.coolDown < 20
    },
    hover() {
      return this.dhHover || this.mHover || this.diHover || this.gHover || this.wHover || this.bHover
    },
    infoId() {
      if (this.dhHover) { return "dhInfo" }
      if (this.mHover) { return "mInfo" }
      if (this.diHover) { return "diInfo" }
      if (this.gHover) { return "gInfo" }
      if (this.wHover) { return "wInfo" }
      if (this.bHover) { return "bInfo" }
    }
  },
}
</script>

<template>
  <div class="purchaseWrapper">
    <div @mouseenter="$event => dhHover = true" @mouseleave="$event => dhHover = false" class="indivPurchase">
      <button @click="hire" :disabled="cantHireDeckhand" id="deckhand">Hire deckhand</button>
    </div>
    <div @mouseenter="$event => mHover = true" @mouseleave="$event => mHover = false" class="indivPurchase">
      <button @click="hire" :disabled="cantHireMerc" id="mercenary">Hire mercenary</button>
    </div>
    <div @mouseenter="$event => diHover = true" @mouseleave="$event => diHover = false" class="indivPurchase">
      <button @click="buyShip" :disabled="cantBuyDingy" id="dingey">Buy a dingey</button>
    </div>
    <div @mouseenter="$event => gHover = true" @mouseleave="$event => gHover = false" class="indivPurchase">
      <button @click="buyShip" :disabled="cantBuyGalley" id="galley">Buy a galley</button>
    </div>
    <div @mouseenter="$event => wHover = true" @mouseleave="$event => wHover = false" class="indivPurchase">
      <button @click="buyShip" :disabled="cantBuyWarship" id="warship">Buy a warship</button>
    </div>
    <div @mouseenter="$event => bHover = true" @mouseleave="$event => bHover = false" class="indivPurchase">
      <button @click="attemptBefriend" :disabled="cantBefriend">Befriend a . . . ?</button>
    </div>
  </div>
  <div class="purchaseInfo" v-if="hover" :id="infoId">
    <div v-if="dhHover">
      <h3>Hire a deckhand to man one of your ships!</h3>
      <p class="specNote"><b>Special Notes:</b> You need as many deckhands as you have mercenaries.</p>
      <p><b>Effect on gold:</b> +0.05 / sec</p>
      <p><b>Effect on fear:</b> 0 / sec</p>
      <h3><b>Cost:</b> 5 gold </h3>
    </div>
    <div v-if="mHover">
      <h3>Hire a mercenary to man one of your ships!</h3>
      <p class="specNote"><b>Special Notes:</b> You need as many deckhands as you have mercenaries.</p>
      <p><b>Effect on gold:</b> +0.5 / sec</p>
      <p><b>Effect on fear:</b> +0.5 / sec</p>
      <h3><b>Cost:</b> 20 gold </h3>
    </div>
    <div v-if="diHover">
      <h3>Buy a dingey for your fleet!</h3>
      <p class="specNote"><b>Special Notes:</b> Can hold a crew of 5.</p>
      <p><b>Effect on gold:</b> 0 / sec</p>
      <p><b>Effect on fear:</b> 0 / sec</p>
      <h3><b>Cost:</b> 50 gold </h3>
    </div>
    <div v-if="gHover">
      <h3>Buy a galley for your fleet!</h3>
      <p class="specNote"><b>Special Notes:</b> Can hold a crew of 20.</p>
      <p><b>Effect on gold:</b> 0 / sec</p>
      <p><b>Effect on fear:</b> +3 / sec</p>
      <h3><b>Cost:</b> 600 gold </h3>
    </div>
    <div v-if="wHover">
      <h3>Buy a warship for your fleet!</h3>
      <p class="specNote"><b>Special Notes:</b> Can hold a crew of 50.</p>
      <p><b>Effect on gold:</b> 0 / sec</p>
      <p><b>Effect on fear:</b> +10 / sec</p>
      <h3><b>Cost:</b> 5k gold </h3>
    </div>
    <div v-if="bHover">
      <h3>Attempt to befriend an unknown creature?</h3>
      <p class="specNote"><b>Special Notes:</b> Take caution for the sea is unpredictable - but with great risk comes great reward ...</p>
      <p><b>Effect on gold:</b> ? / sec</p>
      <p><b>Effect on fear:</b> ? / sec</p>
      <h3><b>Cost:</b> 25k fear </h3>
    </div>
  </div>
</template>
