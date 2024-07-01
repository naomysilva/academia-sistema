<template>
  <div>
    <h2>Meus Treinos Salvos</h2>
    <ul v-if="treinos.length > 0">
      <li v-for="treino in treinos" :key="treino.id">
        <h3>Treino {{ treino.id }}</h3>
        <p><strong>Data:</strong> {{ treino.data }}</p>
        <p><strong>Tipo:</strong> {{ treino.tipo }}</p>
        <ul>
          <li v-for="exercicio in treino.exercicios" :key="exercicio.id">
            <p><strong>Exercício:</strong> {{ exercicio.nome }}</p>
            <p><strong>Séries:</strong> {{ exercicio.series }}</p>
            <p><strong>Repetições:</strong> {{ exercicio.repeticoes }}</p>
            <p v-if="exercicio.peso"><strong>Peso:</strong> {{ exercicio.peso }} kg</p>
          </li>
        </ul>
      </li>
    </ul>
    <p v-else>Nenhum treino encontrado.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      treinos: []
    };
  },
  created() {
    this.carregarTreinos();
  },
  methods: {
    carregarTreinos() {
      axios.get('http://localhost:3000/treinos')
        .then(response => {
          this.treinos = response.data;
        })
        .catch(error => {
          console.error('Erro ao carregar treinos:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Estilos opcionais para o template */
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}
h3 {
  margin-top: 0;
}
</style>
