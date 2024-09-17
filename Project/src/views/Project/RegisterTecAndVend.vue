<template>
    <q-page class="flex flex-center">
      <div class="q-pa-md container">
        <div class="q-gutter-md form-wrapper">
          <h3 style="color: white">Cadastrar Opções</h3>
          <!-- Container para os dois formulários lado a lado -->
          <div class="q-mb-md forms-container">
    
            <!-- Formulário 1 -->
            <div class="form-item">
              <q-form @submit="onSubmitEquipamento" @reset="onResetEquipamento" class="q-gutter-md">
                <q-input
                  filled
                  v-model="formData.tecnico"
                  label="Técnico"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'Por gentileza, insira o Técnico']"
                />
                <div> 
                  <q-btn label="Cadastrar" type="submit" color="primary" />
                  <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-form>
    
              <q-form @submit="onSubmitModelo" @reset="onResetModelo" class="q-gutter-md">
                <q-input
                  filled
                  v-model="formData.assunto"
                  label="Assunto"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'Por gentileza, insira o Assunto']"
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
                  v-model="formData.vendedor"
                  label="Vendedor"
                  lazy-rules
                  :rules="[val => val && val.length > 0 || 'Por gentileza, insira o Vendedor']"
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
        tecnico: '',
        assunto: '',
        vendedor: '',
        
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
        if (!formData.value.tecnico) {
          notifyError('Técnico');
          return;
        }
        console.log(onSubmitEquipamento)
        try {
          await axios.post('`API BACKEND`', { tecnico: formData.value.tecnico });
          notifySuccess('Técnico');
          onResetEquipamento();
        } catch (error) {
          handleError(error);
        }
      };
  
      const onSubmitModelo = async () => {
        if (!formData.value.assunto) {
          notifyError('Assunto');
          return;
        }
        try {
          await axios.post('`API BACKEND`', { assunto: formData.value.assunto });
          notifySuccess('Modelo');
          onResetModelo();
        } catch (error) {
          handleError(error);
        }
      };
  
      const onSubmitFabricante = async () => {
        if (!formData.value.vendedor) {
          notifyError('Fabricante');
          return;
        }
        try {
          await axios.post('`API BACKEND`', { vendedor: formData.value.vendedor });
          notifySuccess('Vendedor');
          onResetFabricante();
        } catch (error) {
          handleError(error);
        }
      };
  

  
      const onResetEquipamento = () => { formData.value.tecnico = ''; };
      console.log(onResetEquipamento)
      const onResetModelo = () => { formData.value.assunto = ''; };
      const onResetFabricante = () => { formData.value.vendedor = ''; };

  
      return {
        formData,
        onSubmitEquipamento,
        onSubmitModelo,
        onSubmitFabricante, 
        onResetEquipamento,
        onResetModelo,
        onResetFabricante,
       
      };
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
  
  
  .q-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
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
  