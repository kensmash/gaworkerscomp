<template>
  <div class="footnote">
    <p class="footnote-number">Footnote {{footnotenum}}</p>
    <b-form-input :value="text" @input="$emit('update', $event, index)" type="text" placeholder="Enter Footnote"></b-form-input>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String
      },
      index: {
        type: String
      }
    },
    data() {
      return {
        footnotenum: parseInt(this.index) + 1
      };
    }
  };
</script>

<style scoped>
  .footnote-number {
    margin: 0.5em 0 0.25em;
    padding: 0;
    font-size: 0.8em;
  }
</style>
