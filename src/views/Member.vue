<template>
  <div class="col-md-12">
    <h1>Área do Aluno</h1>
    <div v-if="loading">Loading exercises...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h3>O que Gostaria de malhar Hoje?</h3>
      <ul class="d-flex justify-content-between">
        <li v-for="exercise in exercises" :key="exercise.id">
          <a href="" @click.prevent="groupType(exercise)">{{
            exercise.muscle
          }}</a>
        </li>
      </ul>
      <div v-if="selectedExerciseDetails.length">
        <h3>Detalhes do musculo Selecionado</h3>
        
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Tipo</th>
              <th scope="col">Grupo Muscular</th>
              <th scope="col">Dificuldade</th>
              <th scope="col">Instruções</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="selected in selectedExerciseDetails" :key="selected.id">
              <td>{{ selected.name }}</td>
              <td>{{ selected.type }}</td>
              <td>{{ selected.muscle }}</td>
              <td>{{ selected.difficulty }}</td>
              <td>{{ selected.instructions }}</td>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      exercises: [],
      loading: true,
      error: null,
      selectedExerciseDetails: [],
    };
  },
  mounted() {
    this.fetchExercises();
  },
  methods: {
    async fetchExercises() {
      try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/exercises",
          {
            headers: {
              "X-Api-Key": "Ip07y25Ax7tXC1y2J1M60A==1cglUFFADfwFimwI",
            },
          }
        );
        this.exercises = response.data;
      } catch (error) {
        this.error = "Failed to load exercises";
      } finally {
        this.loading = false;
      }
    },
    async groupType(exercise) {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/exercises?muscle=${exercise.muscle}`,
          {
            headers: {
              "X-Api-Key": "Ip07y25Ax7tXC1y2J1M60A==1cglUFFADfwFimwI",
            },
          }
        );
        this.selectedExerciseDetails = response.data;
        console.log(
          "Detalhes do exercício selecionado:",
          this.selectedExerciseDetails
        );
      } catch (error) {
        console.error("Failed to load exercise details", error);
      }
    },

    async saveExercise(selected) {
      try {
        const response = await axios.post(
          "http://localhost:3000/addExercise",
          selected
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Erro ao adicionar exercício:", error);
      }
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
