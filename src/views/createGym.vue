<template>
  <div>
    <h2>Adicionar Novo Treino</h2>
    <form @submit.prevent="salvarTreino">
      <label for="data">Data:</label>
      <input type="date" id="data" v-model="data" required>
      
      <label for="tipo">Tipo de Treino:</label>
      <select id="tipo" v-model="tipo" required>
        <option value="musculação">Musculação</option>
        <option value="cardio">Cardio</option>
        <!-- Adicione mais tipos de treino conforme necessário -->
      </select>
      
      <div v-for="(exercicio, index) in exercicios" :key="index">
        <h3>Exercício {{ index + 1 }}</h3>
        <label for="nomeExercicio">Nome do Exercício:</label>
        <input type="text" id="nomeExercicio" v-model="exercicio.nome" required>
        
        <label for="series">Séries:</label>
        <input type="number" id="series" v-model.number="exercicio.series" required>
        
        <label for="repeticoes">Repetições:</label>
        <input type="number" id="repeticoes" v-model.number="exercicio.repeticoes" required>
        
        <label for="peso">Peso (kg):</label>
        <input type="number" id="peso" v-model.number="exercicio.peso">
        
        <button type="button" @click="removerExercicio(index)">Remover Exercício</button>
      </div>
      
      <button type="button" @click="adicionarExercicio">Adicionar Exercício</button>
      
      <button type="submit">Salvar Treino</button>
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
