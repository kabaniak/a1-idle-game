<script>
export default {
  methods: {
    formatCount (num){
      let val = Math.floor(num)
      if (val < 1000){
        return val
      }
      else if( val < 1000000){
        return Math.floor((val / 1000) * 100) / 100 + "k"
      }
      else {
        return Math.floor((val / 1000000) * 100) / 100 + "m"
      }
    }
  }
}
</script>

<template>
  <div class="counterWrapper">
    <div class="singleCounter">
      <p class="counterLabel">Stats: </p>
      <div class="miniCounter">
        <p class="counterValue">Gold: {{ formatCount(this.$store.state.counterValues.gold) }}</p>
      </div>
      <div class="miniCounter">
        <p class="counterValue">Fear: {{ formatCount(this.$store.state.counterValues.fear) }}</p>
      </div>
    </div>

    <div class="singleCounter" >
      <p class="counterLabel">Crew Strength: </p>
      <div class="miniCounter">
        <p class="counterValue">Deckhands: {{ Math.floor(this.$store.state.counterValues.manpower.deckhand) }} </p>
      </div>
      <div class="miniCounter">
        <p class="counterValue">Mercenaries: {{ Math.floor(this.$store.state.counterValues.manpower.muscle) }}</p>
      </div>
    </div>

    <div class="singleCounter">
      <p class="counterLabel">Ships: </p>

      <div class="miniCounter">
        <p class="counterValue">Dingies: {{ Math.floor(this.$store.state.counterValues.ships.dingy) }}</p>
      </div>
      <div class="miniCounter">
        <p class="counterValue">Galleys: {{ Math.floor(this.$store.state.counterValues.ships.galley) }}</p>
      </div>
      <div class="miniCounter">
        <p class="counterValue">Warships: {{ Math.floor(this.$store.state.counterValues.ships.warship) }}</p>
      </div>
    </div>
  </div>
</template>
