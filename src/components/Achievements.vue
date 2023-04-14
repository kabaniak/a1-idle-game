<script>
export default {
  data() {
    return {
      dolphinHover: false,
      witchHover: false,
      mermaidHover: false,
      kelpieHover: false,
      krakenHover: false
    };
  },
  computed: {
    showDolphin() { return this.$store.state.counterValues.achieve.dolphin != 0 },
    showWitch() { return this.$store.state.counterValues.achieve.witch != 0 },
    showMermaid() { return this.$store.state.counterValues.achieve.mermaid != 0 },
    showKelpie() { return this.$store.state.counterValues.achieve.kelpie != 0 },
    showKraken() { return this.$store.state.counterValues.achieve.kraken != 0 },
    hover() { return this.dolphinHover || this.witchHover || this.mermaidHover || this.kelpieHover || this.krakenHover },
    infoId() {
      if (this.dolphinHover) { return "dolphinInfo" }
      if (this.witchHover) { return "witchInfo" }
      if (this.mermaidHover) { return "mermaidInfo" }
      if (this.kelpieHover) { return "kelpieInfo" }
      if (this.krakenHover) { return "krakenInfo" }
    }
  }
}
</script>

<template>
  <div class="achievementWrapper">
    <button class="achievement" :disabled="!showDolphin" @mouseover="$event => dolphinHover = true"
      @mouseleave="$event => dolphinHover = false">
      <img src="dolphin.PNG" alt="dolphin" class="achievementIcon" v-show="showDolphin" />
    </button>
    <button class="achievement" :disabled="!showWitch" @mouseover="$event => witchHover = true"
      @mouseleave="$event => witchHover = false">
      <img src="witch.PNG" alt="witch" class="achievementIcon" v-show="showWitch" />
    </button>
    <button class="achievement" :disabled="!showMermaid" @mouseover="$event => mermaidHover = true"
      @mouseleave="$event => mermaidHover = false">
      <img src="mermaid.PNG" alt="mermaid" class="achievementIcon" v-show="showMermaid" />
    </button>
    <button class="achievement" :disabled="!showKelpie" @mouseover="$event => kelpieHover = true"
      @mouseleave="$event => kelpieHover = false">
      <img src="kelpie.PNG" alt="kelpie" class="achievementIcon" v-show="showKelpie" />
    </button>
    <button class="achievement" :disabled="!showKraken" @mouseover="$event => krakenHover = true"
      @mouseleave="$event => krakenHover = false">
      <img src="kraken.PNG" alt="kraken" class="achievementIcon" v-show="showKraken" />
    </button>
  </div>
  <div class="creatureInfo" v-if="hover" :id="infoId">
    <div v-if="dolphinHover">
      <h3>You've befriended {{ this.$store.state.counterValues.achieve.dolphin }} dolphins</h3>
      <p><b>Chance for success:</b> 60%</p>
      <p><b>Effect on gold:</b> +5 / sec</p>
      <p><b>Effect on fear:</b> -10 / sec</p>
    </div>
    <div v-if="witchHover">
      <h3>You've befriended {{ this.$store.state.counterValues.achieve.witch }} witches</h3>
      <p><b>Chance for success:</b> 80%</p>
      <p><b>Effect on gold:</b> +6 / sec</p>
      <p><b>Effect on fear:</b> +4 / sec</p>
    </div>
    <div v-if="mermaidHover">
      <h3>You've befriended {{ this.$store.state.counterValues.achieve.mermaid }} mermaids</h3>
      <p><b>Chance for success:</b> 60%</p>
      <p><b>Effect on gold:</b> +6 / sec</p>
      <p><b>Effect on fear:</b> +10 / sec</p>
    </div>
    <div v-if="kelpieHover">
      <h3>You've befriended {{ this.$store.state.counterValues.achieve.kelpie }} kelpies</h3>
      <p><b>Chance for success:</b> 40%</p>
      <p><b>Effect on gold:</b> +3 / sec</p>
      <p><b>Effect on fear:</b> +20 / sec</p>
    </div>
    <div v-if="krakenHover">
      <h3>You've befriended {{ this.$store.state.counterValues.achieve.kraken }} krakens</h3>
      <p><b>Chance for success:</b> 25%</p>
      <p><b>Effect on gold:</b> +3 / sec</p>
      <p><b>Effect on fear:</b> +50 / sec</p>
    </div>
  </div>
</template>
