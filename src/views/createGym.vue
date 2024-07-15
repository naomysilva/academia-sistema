<template>
  <div>
    <h2>Add New Workout</h2>
    <form @submit.prevent="salvarTreino">
      <label for="data">Date:</label>
      <input type="date" id="data" v-model="data" required>
      
      <label for="tipo">Workout Type:</label>
      <select id="tipo" v-model="tipo" required>
        <option value="musculação">Weight Training</option>
        <option value="cardio">Cardio</option>
        <!-- Adicione mais tipos de treino conforme necessário -->
      </select>
      
      <div v-for="(exercicio, index) in exercicios" :key="index">
        <h3>Exercício {{ index + 1 }}</h3>
        <label for="nomeExercicio">Exercise Name:</label>
        <input type="text" id="nomeExercicio" v-model="exercicio.nome" required>
        
        <label for="series">Sets:</label>
        <input type="number" id="series" v-model.number="exercicio.series" required>
        
        <label for="repeticoes">Repetitions:</label>
        <input type="number" id="repeticoes" v-model.number="exercicio.repeticoes" required>
        
        <label for="peso">Weight (kg):</label>
        <input type="number" id="peso" v-model.number="exercicio.peso">
        
        <button type="button" class="btn btn-danger" @click="removerExercicio(index)">Remove Exercise</button>
      </div>
      
      <button type="button"  class="btn btn-info mt-2" @click="adicionarExercicio">Add Exercise</button>
      
      <button type="submit" class="btn btn-success m-2">Save Workout</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: '',
      tipo: '',
      exercicios: [{ nome: '', series: 0, repeticoes: 0, peso: 0 }]
    };
  },
  methods: {
    adicionarExercicio() {
      this.exercicios.push({ nome: '', series: 0, repeticoes: 0, peso: 0 });
    },
    removerExercicio(index) {
      this.exercicios.splice(index, 1);
    },
    salvarTreino() {
      const novoTreino = {
        data: this.data,
        tipo: this.tipo,
        exercicios: this.exercicios
      };
      
      axios.post('http://localhost:3000/treinos', novoTreino)
        .then(response => {
          console.log('Treino salvo com sucesso:', response.data);
          // Limpar formulário ou redirecionar após salvar
          this.data = '';
          this.tipo = '';
          this.exercicios = [{ nome: '', series: 0, repeticoes: 0, peso: 0 }];
        })
        .catch(error => {
          console.error('Erro ao salvar treino:', error);
        });
    }
  }
};
</script>

<style scoped>
/* Estilos opcionais para o formulário */
form {
  max-width: 400px;
  margin: 0 auto;
}
label {
  display: block;
  margin-bottom: 5px;
}
input, select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}
button {
  margin-top: 10px;
}
</style>
