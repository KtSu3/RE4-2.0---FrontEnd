<script setup>
  import { ref, onBeforeMount, reactive, render } from 'vue'
  import { useRouter } from 'vue-router';
 
 
  const router = useRouter()
 
  onBeforeMount(async => {
      token = localStorage.getItem("user");
      console.log(token)
 }) 
 function teste(){
   if(token != "" ){
     return token.split('username')[1].split(',')[0].split('"')[2]
   }
   
 }
 let token = reactive({

 })
 const rightDrawerOpen = ref(false)
 function toggleRightDrawer () {
   rightDrawerOpen.value = !rightDrawerOpen.value
 }

 function logout(){
   localStorage.setItem('user', "")
   router.push('/login')
 }
  </script>

<template>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src='/src/components/icons/favicon.ico'>
            </q-avatar>
            <router-link to="menuE">Estoque TI</router-link>
          </q-toolbar-title>
          <div class="q-pa-md"> 
    <q-btn color="log" label="Conta">
      <q-menu>
        <div class="row no-wrap q-pa-md"> 
          <div class="column"> 
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar icon="person" size="72px">
              <!-- <img src=""> -->
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">{{ teste() }}</div>

            <q-btn
              color="primary"
              label="Sair"
              @click="logout"
              push
              size="sm"
              
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
  </div>
          
        </q-toolbar>
  
        
        <div class="q-pa-md row q-gutter-md">
          <q-btn-dropdown color="primary" label="Equipamentos">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <a href="registerE" style="text-decoration: none; color: inherit;"> Cadastrar Equipamento
                    </a></q-item-label>
                </q-item-section>
              </q-item>
  
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <a href="tableE" style="text-decoration: none; color: inherit;">
                      Equipamentos Cadastrados
                    </a></q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn-dropdown color="primary" label="Cadastrar Opções do Equipamento">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <a href="registerprod" style="text-decoration: none; color: inherit;"> Cadastrar Equipamento
                    </a></q-item-label>
                </q-item-section>
              </q-item>
  
            </q-list>
          </q-btn-dropdown>

        </div>

        

      </q-header>
      

  
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </template>
  <style>
  a{
      text-decoration: none;
      color: aliceblue;

  }


  </style>
  

  

  