<template>
    <div class="q-pa-md row justify-center q-gutter-md">
        <div class="col">
            <q-card class="my-card">
                <q-img src="src/components/icons/IMG/reE.jpg">
                    
                <div class="absolute-bottom text-h6">
                    <a href="menuE" style="text-decoration: none; color: inherit;">
                    Estoque TI
                </a>
                </div>
                </q-img>
        
                <q-card-section style="background-color: #0345867a;">
                    <a href="menuE" style="text-decoration: none; color: inherit;">
                {{ lorem }}
            </a>
                </q-card-section>
            </q-card>
        </div>
        <div class="col">
            <q-card class="my-card">
                <q-img src="src/components/icons/IMG/rePP.jpg">
                <div class="absolute-bottom text-h6">
                    <a href="menuP" style="text-decoration: none; color: inherit;">
                    Projeto
                    </a>
                </div>
                </q-img>
        
                <q-card-section style="background-color: #0345867a;">
                    <a href="menuP" style="text-decoration: none; color: inherit;">
                {{ loren2 }}
            </a>
                </q-card-section>
            </q-card>
        </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
   import { ref, onBeforeMount, reactive, render } from 'vue'
     
    const lorem = 'Cadastro e Teste de Equipamentos'
    const loren2 = 'Cadastro de Viabilidades e Atendimento Técnico'
    const router = useRouter()

  onBeforeMount(async => {
       const token = localStorage.getItem("user");
       console.log(token)
       if(token === ""){
        router.push('/login')
       }
       
  }) 
  
  </script>
  
  <style scoped>
  .my-card {
    width: 450px;
    display: inline-block;
  }
  </style>
  