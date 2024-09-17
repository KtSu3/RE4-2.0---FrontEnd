<template>
  <q-page>
    <q-toolbar>
      <q-toolbar-title style="color: white;">Viabilidades Cadastradas</q-toolbar-title>
      <q-btn color="primary" label="Exportar XLSX" @click="exportTableToXLSX" class="q-ml-md" />
    </q-toolbar>

    <q-input
      v-model="searchQuery"
      filled
      placeholder="Procurar pelo Responsável do Projeto"
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
      :rows="paginatedViabilidades"
      :columns="columns"
      row-key="id"
      dense
    >
      <template v-slot:body-cell-projeto_responsavel="props">
        <q-td :props="props" class="text-center">{{ props.row.projeto_responsavel }}</q-td>
      </template>

      <template v-slot:body-cell-descricao_projeto="props">
        <q-td :props="props" class="text-center">{{ props.row.descricao_projeto }}</q-td>
      </template>

      <template v-slot:body-cell-vendedor_responsavel="props">
        <q-td :props="props" class="text-center">{{ props.row.vendedor_responsavel }}</q-td>
      </template>

      <template v-slot:body-cell-descricao_comercial="props">
        <q-td :props="props" class="text-center">{{ props.row.descricao_comercial }}</q-td>
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
  name: 'ViabilidadesCadastradas',
  setup() {
    const viabilidades = ref([]);
    const searchQuery = ref('');
    const dateFilter = ref('');
    const page = ref(1);
    const rowsPerPage = 10;

    const columns = [
      { name: 'projeto_responsavel', label: 'Projetista', align: 'center', field: 'projeto_responsavel' },
      { name: 'descricao_projeto', label: 'Descrição Projeto', align: 'center', field: 'descricao_projeto' },
      { name: 'vendedor_responsavel', label: 'Vendedor', align: 'center', field: 'vendedor_responsavel' },
      { name: 'descricao_comercial', label: 'Descrição Comercial', align: 'center', field: 'descricao_comercial' },
      { name: 'date', label: 'Data', align: 'center', field: 'date' },
    ];

    const filteredViabilidades = computed(() => {
      return viabilidades.value.filter(item => {
        const matchesSearchQuery =
          searchQuery.value === '' ||
          item.projeto_responsavel.toUpperCase().includes(searchQuery.value.toUpperCase());

        const matchesDateFilter = dateFilter.value
          ? new Date(item.date).toISOString().slice(0, 10) === dateFilter.value
          : true;

        return matchesSearchQuery && matchesDateFilter;
      });
    });

    const paginatedViabilidades = computed(() => {
      const start = (page.value - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      return filteredViabilidades.value.slice(start, end);
    });

    const maxPages = computed(() => Math.ceil(filteredViabilidades.value.length / rowsPerPage));

    const filterTable = () => {
      page.value = 1;
    };

    const paginate = (pageValue) => {
      page.value = pageValue;
    };

    const exportTableToXLSX = () => {
      const data = filteredViabilidades.value.map(row => ({
        projeto_responsavel: row.projeto_responsavel,
        descricao_projeto: row.descricao_projeto,
        vendedor_responsavel: row.vendedor_responsavel,
        descricao_comercial: row.descricao_comercial,
        Data: new Date(row.date).toLocaleDateString(),
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Viabilidades');
      XLSX.writeFile(wb, 'viabilidades_cadastradas.xlsx');
    };

    onMounted(async () => {
      try {
        const response = await axios.get('`API BACKEND`');
        console.log(response.data)
        viabilidades.value = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        viabilidades.value = [];
      }
    });

    return {
      columns,
      searchQuery,
      dateFilter,
      filteredViabilidades,
      paginatedViabilidades,
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
