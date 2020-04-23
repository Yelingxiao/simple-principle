<template>
  <button @click="count++">{{ count }}</button>
</template>

<script>
export default {
  data: () => ({ count: 2 })
}
</script>

<style scoped>
button { color: red }
</style>