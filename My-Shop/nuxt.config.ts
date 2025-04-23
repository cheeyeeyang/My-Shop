// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  runtimeConfig: {
    JWT_SECRET: '2064a86b48591279fc0df166d809420be88437dc9c51e57c08a58ce1856ae991f1fb171b6ce6971e9ecedf4392379705260a1016c67519b0ff0f0bfc0361574e48596f888211e58972b53e77cc338655e08a2ea045403983171c1a80a931f7cc28f9f5805cb14a23522823ab17e25047eda3cf3eac05d2eef63b96088490f3150ca5b258bcf031385cccfd6d8066780f67a3bb0ed0006de7e12f9a789cffc226bd358280cbc9bed2d9d7025b92805c78366871ffd81916f064166dd4b79893c0abe18ac90f8b705e360f214eb6e1c52d60fe8cd3c336aaa74bf',
    JWT_EXPIRES_IN: '12h',                     
  }
})