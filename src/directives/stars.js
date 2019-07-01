import Vue from 'vue';

Vue.directive('stars', {
  bind(el, binding) {
    const val = parseFloat(binding.value);
    const size = (Math.max(0, (Math.min(5, val))) * 16) - 7;
    const span = document.createElement('span');
    span.style.width = `${size}px`;
    el.appendChild(span);
  },
});
