<template>
  <q-page>
    <q-toolbar>
      <q-toolbar-title style="color: white;">Equipamentos Cadastrados</q-toolbar-title>
      <q-btn color="primary" label="Exportar XLSX" @click="exportTableToXLSX" class="q-ml-md" />
    </q-toolbar>

    <q-input
      v-model="searchQuery"
      filled
      placeholder="Procurar pelo Número de Série"
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
      :rows="paginatedEquipamentos"
      :columns="columns"
      row-key="id"
      dense
    >
      <template v-slot:body-cell-produtos="props">
        <q-td :props="props" class="text-center">{{ props.row.produtos.produtos }}</q-td>
      </template>

      <template v-slot:body-cell-modelo="props">
        <q-td :props="props" class="text-center">{{ props.row.modelo.modelos }}</q-td>
      </template>

      <template v-slot:body-cell-fabricante="props">
        <q-td :props="props" class="text-center">{{ props.row.fabricante.fabricantes }}</q-td>
      </template>

      <template v-slot:body-cell-conclusao_teste="props">
        <q-td :props="props" class="text-center">{{ props.row.conclusao_teste.conclusao_teste }}</q-td>
      </template>

      <template v-slot:body-cell-numero_serie="props">
        <q-td :props="props" class="text-center">{{ props.row.numero_serie }}</q-td>
      </template>

      <template v-slot:body-cell-observacao="props">
        <q-td :props="props" class="text-center">{{ props.row.observacao }}</q-td>
      </template>

      <template v-slot:body-cell-date="props">
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
  name: 'EquipamentosCadastrados',
  setup() {
    const produtos = ref([]);
    const searchQuery = ref('');
    const dateFilter = ref('');
    const page = ref(1);
    const rowsPerPage = 10;

    const columns = [
      { name: 'produtos', label: 'Equipamento', align: 'center', field: 'produtos' },
      { name: 'modelo', label: 'Modelo', align: 'center', field: 'modelo' },
      { name: 'fabricante', label: 'Fabricante', align: 'center', field: 'fabricante' },
      { name: 'conclusao_teste', label: 'Problema Relatado', align: 'center', field: 'conclusao_teste' },
      { name: 'numero_serie', label: 'Número de Serie', align: 'center', field: 'numero_serie' },
      { name: 'observacao', label: 'Observação', align: 'center', field: 'observacao' },
      { name: 'date', label: 'Data', align: 'center', field: 'date' },
    ];

    const filteredEquipamentos = computed(() => {
      return produtos.value.filter(produto => {
        const matchesSearchQuery =
          searchQuery.value === '' ||
          produto.numero_serie.toUpperCase().includes(searchQuery.value.toUpperCase()); // Filtro pelo Número de Série

        const matchesDateFilter = dateFilter.value
          ? new Date(produto.date).toISOString().slice(0, 10) === dateFilter.value
          : true; // Filtro pela Data

        return matchesSearchQuery && matchesDateFilter;
      });
    });

    const paginatedEquipamentos = computed(() => {
      const start = (page.value - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      return filteredEquipamentos.value.slice(start, end);
    });

    const maxPages = computed(() => Math.ceil(filteredEquipamentos.value.length / rowsPerPage));

    const filterTable = () => {
      page.value = 1; 
    };

    const paginate = (pageValue) => {
      page.value = pageValue;
    };

    const exportTableToXLSX = () => {
      const data = filteredEquipamentos.value.map(row => ({
        Equipamento: row.produtos.produtos,
        Modelo: row.modelo.modelos,
        Fabricante: row.fabricante.fabricantes,
        'Problema Relatado': row.conclusao_teste.conclusao_teste,
        'Número de Serie': row.numero_serie,
        Observação: row.observacao,
        Data: new Date(row.date).toLocaleDateString(),
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Equipamentos');
      XLSX.writeFile(wb, 'equipamentos_cadastrados.xlsx');
    };

    onMounted(async () => {
      try {
        const response = await axios.get('`API BACKEND`');
        produtos.value = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        produtos.value = [];
      }
    });

    return {
      columns,
      searchQuery,
      dateFilter,
      filteredEquipamentos,
      paginatedEquipamentos,
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
