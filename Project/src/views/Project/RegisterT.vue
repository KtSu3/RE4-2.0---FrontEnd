<template>
  <q-page>
    <div class="q-pa-md">
      <q-card>
        <q-card-section class="text-h6">
          Cadastrar Atendimento Técnico
        </q-card-section>

        <q-card-section class="teste">
          <q-form>
            <q-select
              v-model="form.tecnico"
              label="Técnico"
              :options="tecnico"
              option-label="tecnico"
              option-value="id"
              emit-value
              map-options
              outlined
              dense
              class="q-mb-md"
            />

            <q-select
              v-model="form.assunto"
              label="Assunto"
              :options="assunto"
              option-label="assunto"
              option-value="id"
              emit-value
              map-options
              outlined
              dense
              class="q-mb-md"
            />

            <q-input
              v-model="form.info"
              label="Informações do Atendimento"
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
  name: 'CadastrarTecnico',
  setup() {
    const $q = useQuasar();
    const form = ref({
      tecnico: '',
      assunto: '',
      info: '',
     
    });

    const tecnico = ref([]);
    const assunto = ref([]);

    const fetchTecnicos = async () => {
      try {
        // const response = await axios.get('');
        const response = await axios.get('`API BACKEND`');
        tecnico.value = response.data.map(item => ({
          id: item.id,
          tecnico: item.tecnico,
        }));
      } catch (error) {
        $q.notify({ type: 'negative', message: 'Erro ao carregar técnicos: ' + error.message });
      }
    };

    const fetchAssuntos = async () => {
      try {
        const response = await axios.get('`API BACKEND`');
        assunto.value = response.data.map(item => ({
          id: item.id,
          assunto: item.assunto,
        }));
      } catch (error) {
        $q.notify({ type: 'negative', message: 'Erro ao carregar assuntos: ' + error.message });
      }
    };

    const addAtendimento = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
     

      const  objeto = {
  tecnico_responsavel_id: form.value.tecnico,
  assunto_id: form.value.assunto,
  info_atendimento: form.value.info,
  projeto_responsavel: user.username,
};

      console.log(objeto)

      if (form.value.tecnico && form.value.assunto && form.value.info) {
        try {
          const response = await axios.post('`API BACKEND`', objeto);
          if (response.status === 200) {
            $q.notify({ type: 'positive', message: 'Atendimento cadastrado com sucesso!' });
            form.value = {
              tecnico: '',
              assunto: '',
              info: '',
              
            };
            console.log(response.d)
          } else {
            $q.notify({ type: 'negative', message: response.data.error || 'Erro ao cadastrar atendimento' });
          }
        } catch (error) {
          $q.notify({ type: 'negative', message: 'Erro na requisição: ' + error.message });
        }
      } else {
        $q.notify({ type: 'warning', message: 'Preencha todos os campos.' });
      }
    };

    onMounted(() => {
      fetchTecnicos();
      fetchAssuntos();
    });

    return {
      form,
      tecnico,
      assunto,
      addAtendimento,
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
