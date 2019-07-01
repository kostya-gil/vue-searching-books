<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style src="./main.css"></style>
<style lang="scss">
  span.stars, span.stars span {
    display: block;
    background: url(../src/assets/stars.png) 0 -14px repeat-x;
    width: 70px;
    height: 13px;
  }

  span.stars span {
    background-position: 0 0;
  }

  img {
    border: none;
    max-width: 100%;
    height: auto;
  }

  html,
  body {
    overflow-x: hidden;
  }

  #app {
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  button {
    outline: none;
    border: none;
  }

  p {
    line-height: 1.2;
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
  }

  .loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(241, 234, 234, 0.9);
    transition: all .3s ease;
    z-index: 10;
    cursor: not-allowed;
  }

  .is-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }

  .desc-part {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 55%;
    background: url(assets/placeholder-img.png) no-repeat top center;
    background-size: cover;

    &__title {
      position: absolute;
      right: 32px;
      font-size: 59px;
      font-weight: 900;
      bottom: 252px;
      color: #4B5959;
      text-transform: uppercase;
    }
  }


  .search-part {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 45%;
    padding: 0 15px;

    &__content {
      margin: 0 auto;
      margin-top: 64px;
      max-width: 446px;
      width: 100%;
    }
  }

  @media only screen and (max-width: 940px) {
    .desc-part,
    .search-part {
      width: 100%;
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      top: 0;
      padding: 0;
    }

    .desc-part__title {
      right: auto;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .search-part__content {
      margin-top: 0;
      max-width: none;
      height: 100%;
      padding: 0 15px;

      &.loaded {
        background: white;
      }
    }
  }

   @media only screen and (max-width: 475px) {
    .desc-part__title {
      font-size: 33px;
      bottom: 181px;
    }
  }
</style>
