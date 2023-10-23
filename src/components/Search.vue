<template>
  <div class="search">
    <div class="search__box">
      <input
        placeholder="Введите имя пользователя"
        type="text"
        class="search__box-input"
        v-model="search"
        @keydown.enter="getUserInfo"
      />
      <span 
      class="search__box-close"
      @click="clear"
      >
      ❌
      </span>
    </div>
    <button @click="getUserInfo" class="search__btn">НАЙТИ</button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      search: "",
    };
  },
  methods: {
    ...mapActions(['userInfo']),
    ...mapMutations(['resetUser']),
    
    getUserInfo() {
      this.userInfo(this.search)
    },
    clear(){
      this.search = ''
      this.resetUser()
    }
  },
};
</script>

<style>
</style>