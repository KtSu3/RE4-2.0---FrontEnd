<template>
  <q-page>
    <div class="q-pa-md">
      <q-card>
        <q-card-section class="text-h6">
          Cadastrar Equipamento
        </q-card-section>

        <q-card-section class="teste">
          <q-form>
            
            <!-- Seleção de Equipamento -->
            <q-select
              v-model="form.equipamento"
              label="Equipamento"
              :options="equipamentos"
              option-label="produtos"
              option-value="id" 
              emit-value
              map-options
              outlined
              dense
              class="q-mb-md"
            />
            
            <!-- Seleção de Modelo -->
            <q-select
              v-model="form.modelo"
              label="Modelo"
              :options="modelos"
              option-label="modelos"
              option-value="id" 
              emit-value
              map-options
              outlined
              dense
              class="q-mb-md"
            />
            
            <!-- Seleção de Fabricante -->
            <q-select
              v-model="form.fabricante"
              label="Fabricante"
              :options="fabricantes"
              option-label="fabricantes"
              option-value="id" 
              emit-value
              map-options
              outlined
              dense
              class="q-mb-md"
            />
            
            <!-- Seleção de Problema Relatado -->
            <q-select
              v-model="form.problema_relatado"
              label="Conclusão do Teste"
              :options="problemas"
              option-label="conclusao_teste"
              option-value="id"
              emit-value
              map-options
              outlined
              dense
              class="q-mb-md"
            />
            
            <!-- Campo de Número de Série -->
            <q-input
              filled
              v-model="form.numero_serie"
              id='sn'
              name='sn'
              type='text'
              placeholder="Número de Série"
              @input="formatInput"
              class="q-mb-md"
            />

            <!-- Observação do Equipamento -->
            <q-input
              v-model="form.observacao"
              label="Observação do Equipamento"
              type="textarea"
              outlined
              dense
              class="q-mb-md"
            />
          
            <div class="q-mt-md">
              <q-btn label="Cadastrar" @click="addEquipament" color="primary" />
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
  name: 'CadastrarEquipamento',
  setup() {
    const $q = useQuasar();

    const form = ref({
      equipamento: '',
      modelo: '',
      fabricante: '',
      problema_relatado: '',
      numero_serie: '',
      observacao: '',
    });

    const equipamentos = ref([]);
    const modelos = ref([]);
    const fabricantes = ref([]);
    const problemas = ref([]);

    
    const fetchEquipamentos = async () => {
      try {
        const response = await axios.get('`API BACKEND`');
        equipamentos.value = response.data.map(item => ({
          id: item.id, 
          produtos: item.produtos,
        }));
        console.log(response.data)
      } catch (error) {
        $q.notify({ type: 'negative', message: 'Erro ao carregar equipamentos: ' + error.message });
      }
    };

    const fetchModelos = async () => {
      try {
        const response = await axios.get('`API BACKEND`');
        modelos.value = response.data.map(item => ({
          id: item.id,
          modelos: item.modelos,
        }));
      } catch (error) {
        $q.notify({ type: 'negative', message: 'Erro ao carregar modelos: ' + error.message });
      }
    };

    const fetchFabricantes = async () => {
      try {
        const response = await axios.get('`API BACKEND`');
        fabricantes.value = response.data.map(item => ({
          id: item.id,
          fabricantes: item.fabricantes,
        }));
      } catch (error) {
        $q.notify({ type: 'negative', message: 'Erro ao carregar fabricantes: ' + error.message });
      }
    };

    const fetchProblemas = async () => {
      try {
        const response = await axios.get('`API BACKEND`');
        problemas.value = response.data.map(item => ({
          id: item.id,
          conclusao_teste: item.conclusao_teste,
        }));
      } catch (error) {
        $q.notify({ type: 'negative', message: 'Erro ao carregar problemas relatados: ' + error.message });
      }
    };

    // Formatação do número de série
    const formatInput = (event) => {
      form.value.numero_serie = event.target.value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '');
    };

   
    const addEquipament = async () => {
      const { equipamento, modelo, fabricante, problema_relatado, numero_serie, observacao } = form.value;
      const objeto = {
            numero_serie,
            observacao,
            conclusao_teste_id: problema_relatado,
            fabricante_id: fabricante,
            modelo_id: modelo,
            produtos_id: equipamento,
            
          }
        console.log(objeto)
      if (equipamento && modelo && fabricante && problema_relatado && numero_serie) {
        try {
          const response = await axios.post('`API BACKEND`', objeto );
         
          
          if (response.status === 200) {
            $q.notify({ type: 'positive', message: 'Equipamento cadastrado com sucesso!' });
            form.value = {
              equipamento: '',
              modelo: '',
              fabricante: '',
              problema_relatado: '',
              numero_serie: '',
              observacao: '',
            };
            
          } else {
            $q.notify({ type: 'negative', message: response.data.error || 'Erro ao cadastrar' });
          }
        } catch (error) {
          $q.notify({ type: 'negative', message: 'Erro na requisição: ' + error.message });
        }
      } else {
        $q.notify({ type: 'warning', message: 'Preencha todos os campos.' });
      }
    };

  
    onMounted(() => {
      fetchEquipamentos();
      fetchModelos();
      fetchFabricantes();
      fetchProblemas();
    });
   
   

    return {
      form,
      equipamentos,
      modelos,
      fabricantes,
      problemas,
      addEquipament,
      formatInput,
    };
  },
};
</script>

<style scoped>
.q-pa-md {
  margin: 0 auto;
  width: 700px;
  height: 50px;
  text-align: center;
}

.q-mt-md {
  margin-top: 16px;
}
</style>
