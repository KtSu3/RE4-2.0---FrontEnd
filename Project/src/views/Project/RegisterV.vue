<template>
  <q-page>
    <div class="q-pa-md">
      <q-card>
        <q-card-section class="text-h6">
          Cadastrar Viabilidade
        </q-card-section>

        <q-card-section class="teste">
          <q-form>
            <q-input
              v-model="form.descricao_projeto"
              label="Informações do Projeto"
              type="textarea"
              outlined
              dense
              class="q-mb-md"
            />

            <q-select
              v-model="form.vendedor"
              label="Vendedor"
              :options="vendedorOptions"
              option-label="vendedor"
              option-value="id"
              emit-value
              map-options
              outlined
              dense
              class="q-mb-md"
            />

            <q-select
              v-model="form.viavel"
              label="Viável?"
              :options="viavelOptions"
              outlined
              dense
              class="q-mb-md"
            />

            <q-input
              v-model="form.descricao_comercial"
              label="Informações do Vendedor"
              type="textarea"
              outlined
              dense
              class="q-mb-md"
            />

            <div class="q-mt-md">
              <q-btn label="Cadastrar" @click="addAtendimento" color="primary" />
              <q-btn label="Limpar Dados" type="reset" color="warning" flat />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';

export default {
  name: 'CadastrarViabilidade',
  setup() {
    const $q = useQuasar();
    const form = ref({
      descricao_projeto: '',
      vendedor: '',
      viavel: '',
      descricao_comercial: ''
    });

    const vendedorOptions = ref([]);
    const viavelOptions = ref([
      { label: 'Sim', value: 'Sim' },
      { label: 'Não', value: 'Não' }
    ]);

    const fetchVendedores = async () => {
      try {
        const response = await axios.get('`API BACKEND`');
        vendedorOptions.value = response.data.map(item => ({
          id: item.id,
          vendedor: item.vendedor
        }));
      } catch (error) {
        $q.notify({ type: 'negative', message: 'Erro ao carregar vendedores: ' + error.message });
      }
    };

    const addAtendimento = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      const objeto = {
       vendedor_responsavel_id: form.value.vendedor,
       descricao_comercial: form.value.descricao_comercial,
       descricao_projeto: form.value.descricao_projeto,
       projeto_responsavel: user.username,
       viavel: form.value.viavel.value
        };
        console.log(objeto)
      try {
        const response = await axios.post('`API BACKEND`', objeto);
        if (response.status === 200) {
          $q.notify({ type: 'positive', message: 'Viabilidade cadastrada com sucesso!' });
          form.value = {
            descricao_projeto: '',
            descricao_comercial: '',
            vendedor: '',
            viavel: '',
            descricao_comercial: ''
          };
        } else {
          $q.notify({ type: 'negative', message: response.data.error || 'Erro ao cadastrar viabilidade' });
        }
      } catch (error) {
        $q.notify({ type: 'negative', message: 'Erro na requisição: ' + error.message });
      }
    };

    onMounted(() => {
      fetchVendedores();
    });

    return {
      form,
      vendedorOptions,
      viavelOptions,
      addAtendimento
    };
  }
};
</script>

<style scoped>
.q-pa-md {
  margin: 0 auto;
  width: 700px;
  text-align: center;
}

.q-mt-md {
  margin-top: 16px;
}
</style>
