<template>
  <div>
    <h1>Workout Schedule</h1>
    <form @submit.prevent="adicionarAgendamento">
      <input class="m-2" v-model="nome" placeholder="Nome" />
      <input class="m-2" v-model="data" type="date" placeholder="Data" />
      <input class="m-2" v-model="hora" type="time" placeholder="Hora" />
      <textarea
        class="m-2"
        v-model="descricao"
        placeholder="Description"
      ></textarea>
      <button type="submit" class="btn btn-success my-3">
        Add Appointment
      </button>
    </form>

    <div>
      <h2>Search Appointments</h2>
      <input v-model="nomeBusca" placeholder="Search by Name" />
      <button class="btn btn-info mx-2" @click="buscarAgendamentos">
        Search
      </button>
    </div>

    <ul>
      <li v-for="agendamento in agendamentos" :key="agendamento.id">
        <p>
          {{ agendamento.nome }} - {{ agendamento.data }} -
          {{ agendamento.hora }}
        </p>
        <p>{{ agendamento.descricao }}</p>
        <button class="btn btn-danger" @click="deletarAgendamento(agendamento.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nome: "",
      data: "",
      hora: "",
      descricao: "",
      agendamentos: [],
      nomeBusca: "", // Adicionado campo para busca
    };
  },
  methods: {
    async carregarAgendamentos() {
      try {
        const response = await axios.get("http://localhost:3000/agendamentos");
        this.agendamentos = response.data;
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
      }
    },
    async adicionarAgendamento() {
      try {
        const novoAgendamento = {
          nome: this.nome,
          data: this.data,
          hora: this.hora,
          descricao: this.descricao,
        };
        await axios.post("http://localhost:3000/agendamentos", novoAgendamento);
        this.carregarAgendamentos();
        this.nome = "";
        this.data = "";
        this.hora = "";
        this.descricao = "";
      } catch (error) {
        console.error("Erro ao adicionar agendamento:", error);
      }
    },
    async deletarAgendamento(id) {
      try {
        await axios.delete(`http://localhost:3000/agendamentos/${id}`);
        this.carregarAgendamentos();
      } catch (error) {
        console.error("Erro ao deletar agendamento:", error);
      }
    },
    async buscarAgendamentos() {
      if (!this.nomeBusca) {
        console.error("Nome de busca não pode ser vazio");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/agendamentos/buscar?nome=${this.nomeBusca}`
        );
        this.agendamentos = response.data;
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    },
  },
  mounted() {
    this.carregarAgendamentos();
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input,
textarea {
  width: 50%;
}

ul {
  display: flex;
  justify-content: center;
}

li {
  border: 1px solid #7e92b3;
  width: 100%;
  list-style: none;
  max-width: 400px;
  padding: 22px;
  background: #fff;
  border-radius: 14px;
  margin: 1rem;
}
</style>
