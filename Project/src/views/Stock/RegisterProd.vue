<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md container">
      <div class="q-gutter-md form-wrapper">
        <h3 style="color: white">Cadastrar Opções de Equipamento</h3>
        <!-- Container para os dois formulários lado a lado -->
        <div class="q-mb-md forms-container">
  
          <!-- Formulário 1 -->
          <div class="form-item">
            <q-form @submit="onSubmitEquipamento" @reset="onResetEquipamento" class="q-gutter-md">
              <q-input
                filled
                v-model="formData.produtos"
                label="Equipamento"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Por gentileza, insira o Produto']"
              />
              <div> 
                <q-btn label="Cadastrar" type="submit" color="primary" />
                <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
  
            <q-form @submit="onSubmitModelo" @reset="onResetModelo" class="q-gutter-md">
              <q-input
                filled
                v-model="formData.modelos"
                label="Modelo"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Por gentileza, insira o Modelo']"
              />
              <div>
                <q-btn label="Cadastrar" type="submit" color="primary" />
                <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
          </div>

          <!-- Formulário 2 -->
          <div class="form-item">
            <q-form @submit="onSubmitFabricante" @reset="onResetFabricante" class="q-gutter-md">
              <q-input
                filled
                v-model="formData.fabricantes"
                label="Fabricante"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Por gentileza, insira o Fabricante']"
              />
              <div>
                <q-btn label="Cadastrar" type="submit" color="primary" />
                <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
  
            <q-form @submit="onSubmitConclusaoTeste" @reset="onResetConclusaoTeste" class="q-gutter-md">
              <q-input
                standout
                v-model="formData.conclusao_teste"
                label="Conclusão do Teste"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Por gentileza, insira a Conclusão']"
              />
              <div>
                <q-btn label="Cadastrar" type="submit" color="primary" />
                <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </q-form>
          </div>
  
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const $q = useQuasar();

    const formData = ref({
      produtos: '',
      modelos: '',
      fabricantes: '',
      conclusao_teste: '',
    });

    const notifyError = (campo) => {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: `Por gentileza, insira o ${campo}`,
      });
    };

    const notifySuccess = (campo) => {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: `${campo} cadastrado com sucesso!`,
      });
    };

    const handleError = (error) => {
      console.error('Erro ao cadastrar:', error);
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: 'Erro ao cadastrar. Verifique o console para mais detalhes.',
      });
    };

    const onSubmitEquipamento = async () => {
      if (!formData.value.produtos) {
        notifyError('Equipamento');
        return;
      }
      try {
        await axios.post('`API BACKEND`', { produtos: formData.value.produtos });
        notifySuccess('Equipamento');
        onResetEquipamento();
      } catch (error) {
        handleError(error);
      }
    };

    const onSubmitModelo = async () => {
      if (!formData.value.modelos) {
        notifyError('Modelo');
        return;
      }
      try {
        await axios.post('`API BACKEND`', { modelos: formData.value.modelos });
        notifySuccess('Modelo');
        onResetModelo();
      } catch (error) {
        handleError(error);
      }
    };

    const onSubmitFabricante = async () => {
      if (!formData.value.fabricantes) {
        notifyError('Fabricante');
        return;
      }
      try {
        await axios.post('`API BACKEND`', { fabricantes: formData.value.fabricantes });
        notifySuccess('Fabricante');
        onResetFabricante();
      } catch (error) {
        handleError(error);
      }
    };

    const onSubmitConclusaoTeste = async () => {
      if (!formData.value.conclusao_teste) {
        notifyError('Conclusão do Teste');
        return;
      }
      try {
        await axios.post('`API BACKEND`', { conclusao_teste: formData.value.conclusao_teste });
        notifySuccess('Conclusão do Teste');
        onResetConclusaoTeste();
      } catch (error) {
        handleError(error);
      }
    };

    const onResetEquipamento = () => { formData.value.produtos = ''; };
    const onResetModelo = () => { formData.value.modelos = ''; };
    const onResetFabricante = () => { formData.value.fabricantes = ''; };
    const onResetConclusaoTeste = () => { formData.value.conclusao_teste = ''; };

    return {
      formData,
      onSubmitEquipamento,
      onSubmitModelo,
      onSubmitFabricante,
      onSubmitConclusaoTeste,
      onResetEquipamento,
      onResetModelo,
      onResetFabricante,
      onResetConclusaoTeste,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}


.q-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}

.form-wrapper {
  padding: 2rem;
}

.forms-container {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.form-item {
  flex: 1;
  max-width: 48%; /* Ajuste conforme necessário para a largura dos formulários */
  background-color: #ffffff; /* Fundo branco */
  border-radius: 8px; /* Bordas arredondadas */
  padding: 1rem; /* Espaçamento interno para os formulários */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve para destacar o formulário */
}

.q-gutter-md {
  margin-bottom: 1.5rem;
}

.q-mb-md {
  margin-bottom: 1rem;
}
</style>
