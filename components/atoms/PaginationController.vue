<template>
    <div class="pagination">
      <button @click="InitialPage()" style="background-color: #EFEFEE;"><img src="@/static/icon/dobleArrow.svg"
          alt=""></button>
      <button class="btnPage" @click="previousPage" :disabled="currentPage === 1"><img src="@/static/icon/arrow.svg"
          alt=""></button>
      <span>{{ currentPage }}</span>
      <button class="btnPage btnNext" @click="nextPage" :disabled="currentPage === totalPages"><img
          src="@/static/icon/arrow.svg" alt=""></button>
    </div>
  </template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    InitialPage() {
      this.$emit("update:currentPage", this.currentPage = 1);
    },
    previousPage() {
      this.$emit("update:currentPage", this.currentPage - 1);
    },
    nextPage() {
      this.$emit("update:currentPage", this.currentPage + 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination{
    display: flex;
    width: 100%;
    justify-content: right;
    align-items: center;
    gap: 1rem;
}
.content{
    display: flex;
    gap: 1rem;
    align-items: center;
    button{
        display: flex;
        justify-content: center;
        padding: .2rem;
        background: #ea4e4226;
        width: 70px;
        height: 2rem;
        align-items: center;
        &:hover{
            background: rgba(254, 113, 100, 0.322);
        }

    }

    .btnNext{
        transform: rotateZ(180deg);
    }
}
    
</style>