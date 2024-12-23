<script setup>
const sendSentryError = () => {
  throw new Error('Test sentry error')
}
</script>

<template>
  <button @click="sendSentryError">Send sentry error</button>
</template>
