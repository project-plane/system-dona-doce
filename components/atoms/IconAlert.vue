<template>
  <div id="passar_mouse" class="container">
    <span data-tooltip="Fora do Cardápio"></span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="-2 -2 24 24"
    >
      <path
        fill="#ffc700"
        d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0-13a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1m0 10a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
      />
    </svg>

    <div id="mostrar"> Fora do Cardapio</div>
  </div>
</template>
<style scoped>
.container{
    display: flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
}
/* #mostrar {
  display: none;
} */

#mostrar {
  display: block;
  font-size: 10px;
  position: sticky;
}
</style>
