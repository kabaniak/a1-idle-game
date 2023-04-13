<script>
</script>

<template>
  <div class="eventWrapper">
    <ul id="listOfEvents">
      <li class="singleEvent" v-for="item in this.$store.state.messageLog" :key="item">
        <p class="eventText">{{ item }}</p>
      </li>
    </ul>
  </div>
</template>
