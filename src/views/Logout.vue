<template>
  <div>
    <button @click="logout">Sair</button>
  </div>
</template>

<script>
import { auth } from "../main";

export default {
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          console.log("Logout realizado com sucesso.");
          this.$router.replace('/');
        })
        .catch((error) => {
          console.error("Erro ao fazer logout:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Estilos opcionais */
</style>
