<template>
  <q-page>
    <q-toolbar>
      <q-toolbar-title style="color: white;">Atendimentos Técnicos Cadastrados</q-toolbar-title>
      <q-btn color="primary" label="Exportar XLSX" @click="exportTableToXLSX" class="q-ml-md" />
    </q-toolbar>

    <q-input
      v-model="searchQuery"
      filled
      placeholder="Procurar Assunto"
      class="q-mb-md"
      @input="filterTable"
    />

    <q-input
      v-model="dateFilter"
      filled
      placeholder="Filtrar por Data"
      class="q-mb-md"
      type="date"
      @input="filterTable"
    />

    <q-table
      :rows="paginatedAtendimentos"
      :columns="columns"
      row-key="id"
      dense
    >
      <template v-slot:body-cell-projeto_responsavel="props">
        <q-td :props="props" class="text-center">{{ props.row.projeto_responsavel }}</q-td>
      </template>

      <template v-slot:body-cell-tecnico="props">
        <q-td :props="props" class="text-center">{{ props.row.tecnico_responsavel }}</q-td>
      </template>

      <template v-slot:body-cell-assunto="props">
        <q-td :props="props" class="text-center">{{ props.row.assunto }}</q-td>
      </template>

      <template v-slot:body-cell-info_atendimento="props">
        <q-td :props="props" class="text-center">{{ props.row.info_atendimento }}</q-td>
      </template>

      <template v-slot:body-cell-data="props">
        <q-td :props="props" class="text-center">{{ new Date(props.row.date).toLocaleDateString() }}</q-td>
      </template>
    </q-table>

    <q-pagination
      v-model="page"
      :max="maxPages"
      @update:model-value="paginate"
      class="q-mt-md"
      color="primary"
      boundary-numbers
      total-visible="7"
      boundary-links
    />
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import * as XLSX from 'xlsx';

export default {
  name: 'AtendimentosCadastrados',
  setup() {
    const atendimentos = ref([]);
    const searchQuery = ref('');
    const dateFilter = ref('');
    const page = ref(1);
    const rowsPerPage = 10;

    const columns = [
      { name: 'projeto_responsavel', label: 'Projetista', align: 'center', field: 'projeto_responsavel' },
      { name: 'tecnico', label: 'Técnico', align: 'center', field: 'tecnico' },
      { name: 'assunto', label: 'Assunto', align: 'center', field: 'assunto' },
      { name: 'info_atendimento', label: 'Informação do Atendimento', align: 'center', field: 'info_atendimento' },
      { name: 'date', label: 'Data', align: 'center', field: 'date' },
    ];

    // Filtro de dados por assunto e data
    const filteredAtendimentos = computed(() => {
      return atendimentos.value.filter(atendimento => {
        const matchesSearchQuery =
          searchQuery.value === '' ||
          atendimento.assunto?.toUpperCase().includes(searchQuery.value.toUpperCase());

        const matchesDateFilter = dateFilter.value
          ? new Date(atendimento.date).toISOString().slice(0, 10) === dateFilter.value
          : true;

        return matchesSearchQuery && matchesDateFilter;
      });
    });

    // Paginação dos dados filtrados
    const paginatedAtendimentos = computed(() => {
      const start = (page.value - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      return filteredAtendimentos.value.slice(start, end);
    });

    // Total de páginas baseado na quantidade de dados filtrados
    const maxPages = computed(() => Math.ceil(filteredAtendimentos.value.length / rowsPerPage));

    const filterTable = () => {
      page.value = 1;
    };

    const paginate = (pageValue) => {
      page.value = pageValue;
    };

    // Exportar a tabela filtrada para XLSX
    const exportTableToXLSX = () => {
      const data = filteredAtendimentos.value.map(row => ({
        projeto_responsavel: row.projeto_responsavel,
        tecnico: row.tecnico_responsavel,
        assunto: row.assunto,
        info_atendimento: row.info_atendimento,
        Data: new Date(row.date).toLocaleDateString(),
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Atendimentos');
      XLSX.writeFile(wb, 'atendimentos_cadastrados.xlsx');
    };

    // Carregar dados da API ao montar o componente
    onMounted(async () => {
      try {
        const response = await axios.get('`API BACKEND`');
        console.log(response)
        atendimentos.value = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        atendimentos.value = [];
      }
    });

    return {
      columns,
      searchQuery,
      dateFilter,
      filteredAtendimentos,
      paginatedAtendimentos,
      page,
      maxPages,
      filterTable,
      paginate,
      exportTableToXLSX,
    };
  },
};
</script>

<style scoped>
.q-page {
  padding: 16px;
}

.q-toolbar-title {
  font-size: 1.5rem;
}

.q-input {
  max-width: 400px;
  background-color: white;
}

.text-center {
  text-align: center;
}

.q-table {
  margin-top: 16px;
  text-align: center;
}
</style>
