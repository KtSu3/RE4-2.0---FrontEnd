<template>
  <main id="container">
    <q-form @submit.prevent="handleSubmit" id="LoginForm">
      <div id="form_header">
        <h1>RE4</h1>
        <q-icon id="mode_icon" name="moon" @click="toggleMode" />
      </div>

      <div id="inputs">
        <div class="input-box">
          <q-input
          
            v-model="username"
            label="Usuário"
            required
            prepend-icon="person"
          />
        </div>
        <div class="input-box">
          <q-input
            v-model="password"
            label="Senha"
            type="password"
            required
            prepend-icon="lock"
          />
        </div>
      </div>

      <div v-if="errorMessage" id="errorMessage">{{ errorMessage }}</div>

      <q-btn
        label="Login"
        id="login_button"
        @click="handleSubmit"
        color="primary"
      />
    </q-form>
  </main>
</template>

<script>
import CryptoJS from "crypto-js";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleSubmit() {
      if (!this.username || !this.password) {
        this.errorMessage = 'Por favor, preencha todos os campos.';
        return;
      }

      try {
       
        const hash = CryptoJS.SHA256(this.password).toString();

        const loginResponse = await axios.get(
          `API BACKEND`
        );

        if (loginResponse.status === 200) {
          const params = {
            username: loginResponse.data.nome,
            grup: loginResponse.data.grupo,
            email: loginResponse.data.email,
            password: hash,
          };
          try {
           
            const djangoUserResponse = await this.createOrUpdateUser(params);

            if (djangoUserResponse) {
              // Salva os dados do usuário no localStorage e redireciona
              localStorage.setItem('user', JSON.stringify(djangoUserResponse));
              this.router.push({ name: 'index' });
            }
          } catch (error) {
            this.errorMessage = 'Erro ao criar/atualizar usuário no backend.';
          }
        } else {
          this.errorMessage = 'Usuário ou senha inválidos.';
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Erro ao realizar login. Tente novamente.';
      }
    },

    async createOrUpdateUser(params) {
      try {
        const { username, email, password, grup } = params;
        
        const djangoPostResponse = await axios.post(
          `API BACKEND`,
          params
        );

        return djangoPostResponse.data;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          
          const { username, email, password, grup } = params;
          const djangoPutResponse = await axios.put(
            `API BACKEND`,
            { username, email, password, grup }
          );
          return djangoPutResponse.data;
        } else {
          throw new Error('Erro ao criar/atualizar o usuário.');
        }
      }
    },

    toggleMode() {
      // Alterna entre modos claro/escuro
      document.body.classList.toggle('dark');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400&display=swap');

:root {
  --color-light-50: #f8fafc;
  --color-dark-50: #797984;
  --color-dark-100: #ffffff;
  --color-purple-50: hsl(202, 83%, 47%);
  --color-purple-100: #053c52;
  /* --color-gradient: linear-gradient(90deg, var(--color-purple-50), var(--color-purple-100)); */
}

* {
  color: #ffffff !important;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  color: #000000;
}

#container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-gradient);
}

#LoginForm {
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 400px;
  /* background-color: var(--color-light-50); */
  background-color: rgba(109, 167, 253, 0.384);
  padding: 30px 40px;
  border-radius: 8px;
  gap: 30px;
  box-shadow: 15px 15px 50px rgb(0, 0, 0);
  
}

#form_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
}

#form_header h1 {
  font-size: 40px;
  position: relative;
}

#form_header h1::before {
  position: absolute;
  content: '';
  width: 40%;
  height: 3px;
  background-color: var(--color-purple-50);
  bottom: 10px;
  border-radius: 5px;
}

#mode_icon {
  cursor: pointer;
  font-size: 20px;
}

.input-box {
  display: flex;
  flex-direction: column;
  gap: 20px;

  inputs{
    color: #ffffff !important;
  } 
}

#errorMessage {
  color: red;
}

#login_button {
  border: none;
  background: var(--color-gradient);
  padding: 7px;
  border-radius: 3px;
  color: var(--color-light-50);
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
}

#login_button:hover {
  transform: scale(1.05);
}

/* .dark #LoginForm {
  color: var(--color-light-50);
  background-color: var(--color-dark-100);
} */

.dark #LoginForm .q-input__control {
  color: var(--color-light-50);
}
</style>
