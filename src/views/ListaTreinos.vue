<template>
  <div>
    <h2>My Saved Workouts</h2>

    <ul v-if="treinos.length > 0">
      <li v-for="treino in treinos" :key="treino.id">
        <h3>Workout {{ treino.id }}</h3>
        <p><strong>Date:</strong> {{ treino.data }}</p>
        <p><strong>Type:</strong> {{ treino.tipo }}</p>
        <ul class="exercicio">
          <li v-for="exercicio in treino.exercicios" :key="exercicio.id">
            <p><strong>Exercise:</strong> {{ exercicio.nome }}</p>
            <p><strong>Sets:</strong> {{ exercicio.series }}</p>
            <p><strong>Repetitions:</strong> {{ exercicio.repeticoes }}</p>
            <p v-if="exercicio.peso"><strong>Weight:</strong> {{ exercicio.peso }} kg</p>
          </li>
        </ul>
      </li>
    </ul>
    <p v-else>No workouts found.</p>
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
  display: flex;
  justify-content: space-around;
}
li {
  margin-top: 1rem;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}
h3 {
  margin-top: 0;
}

.exercicio {
  display: flex;
  flex-direction: column;
}
</style>
