<script setup>
  import { ref, onBeforeMount, reactive, render } from 'vue'
  import { useRouter } from 'vue-router';
 
  const router = useRouter()

  onBeforeMount(async => {
       token = localStorage.getItem("user");
       if (!token) router.push('/login')
      
      console.log(token)
  }) 
  function teste(){
    if(token != "" ){
      return token.split('username')[1].split(',')[0].split('"')[2]
    }
    
  }
  let token = reactive("")
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
            <router-link to="menuP">Projeto</router-link>
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
              @click="logout()"
              push
              size="sm"
              
            />
            <!-- <router-link to="login"  class="q-btn q-ma-none text-white">Sair</router-link> -->
          </div>
        </div>
      </q-menu>
    </q-btn>
  </div>
          <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
        </q-toolbar>
  
        
        <div class="q-pa-md row q-gutter-md">
          <q-btn-dropdown color="primary" label="Viabilidades">
            
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <a href="registerV" style="text-decoration: none; color: inherit;"> Cadastrar Viabilidade
                    </a></q-item-label>
                </q-item-section>
              </q-item>
  
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <a href="tableV" style="text-decoration: none; color: inherit;">
                      Viabilidades Cadastradas
                    </a></q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
  
          <q-btn-dropdown color="primary" label="Técnicos">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <a href="registerT" style="text-decoration: none; color: inherit;">
                      Cadastrar Técnico
                    </a></q-item-label>
                </q-item-section>
              </q-item>
  
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <a href="tableC" style="text-decoration: none; color: inherit;">
                      Técnicos Cadastrados
                    </a></q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn-dropdown color="primary" label="Opções">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>
                    <a href="registerO" style="text-decoration: none; color: inherit;">
                       Técnicos Assuntos Vendedores
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
  

  

  