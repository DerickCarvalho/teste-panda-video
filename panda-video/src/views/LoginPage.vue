<template>
    <v-container class="d-flex justify-center align-center fill-height container">   
        <AlertCard 
            v-if="viewAlert"
            :variant="typeAlert"
        >
            {{ alertText }}
        </AlertCard>
        
        <v-card elevation="10" class="card">
            <div class="logo-panda">
                <v-img
                    :width="300"
                    aspect-ratio="16/9"
                    cover
                    src="../assets/icon-panda.png"
                ></v-img>
            </div>

            <div class="form">
                <v-card-title class="text-h4 text-center">LogIn</v-card-title>
                <v-card-subtitle class="text-subtitle-2 text-center mb-6 mt-2">
                    Insira sua API Key
                </v-card-subtitle>
            
                <v-form ref="form" v-model="valid">
                    <v-text-field
                        v-model="apiKey"
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'"
                        dense
                        placeholder="API Key"
                        variant="outlined"
                        required
                        @click:append-inner="visible = !visible"
                        @keydown.enter.prevent
                    ></v-text-field>

                    <v-btn
                        block
                        large
                        :disabled="!valid"
                        class="mt-4 btn"
                        @click="login"
                        :loading="loadingButton"
                    >
                        Login
                    </v-btn>
                </v-form>
            </div>
        </v-card>
    </v-container>
</template>
  
<script>
import AlertCard from '@/components/AlertCard.vue'

export default {    
    components: {
        AlertCard
    },

    data() {
        return {
            apiKey: '',
            valid: false,
            visible: false,
            viewAlert: false,
            alertText: '',
            typeAlert: '',
            loadingButton: false,
        };
    },

    mounted() {
        // Verificando se a APIKEY ja esta salva, caso sim, redirecionando para a homepage
        if (localStorage.getItem('apiKeyValidated') != null) {
            this.$router.push('/home');
        }
    },

    methods: {
        async login() {
            this.loadingButton = true;
            try {
                const userVerify = await fetch ('https://api-v2.pandavideo.com.br/profile', {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': this.apiKey,
                    }
                });                

                if (!userVerify.ok) {
                    if (userVerify.status == 401) {
                        this.alertText = 'API Key não reconhecida pelo sistema!';
                        this.typeAlert = 'warning';
                        this.viewAlert = true;
                        this.loadingButton = false;
                    }
                    else if (userVerify.status == 429) {
                        this.alertText = 'Limite de requisições atingido!';
                        this.typeAlert = 'warning';
                        this.viewAlert = true;
                        this.loadingButton = false;
                    }
                }                
                else {
                    if (this.apiKey) {
                        localStorage.setItem('apiKey', this.apiKey);
                        localStorage.setItem('apiKeyValidated', 'success');                       
                        this.$router.push('/home');
                    }
                }
            } catch {
                this.alertText = 'Erro ao acessar o servidor!';
                this.typeAlert = 'warning';
                this.viewAlert = true;
            }
        }
    },
};
</script>
  
<style scoped>
    .container {
        width: 100vw;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .card {
        width: 50%;
        background-color: #171924;
        color: #FFF;
        display: flex;
        justify-content: space-between;
        padding: 50px;

        & .logo-panda {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        & .form {
            width: 50%;
        }
    }

    .btn {
        background-color: #3f55ee;
        color: #FFF;
    }

    @media (max-width: 1280px) {
        .card {
            width: 100%;
        }
    }

    @media (max-width: 960px) {
        .card {
            width: 70%;
        }
    }

    @media (max-width: 700px) {
        .card {
            width: 90%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 50px 0;
        }

        & .logo-panda {
            width: 100%;
        }

        & .form {
            width: 100%;
        }
    }
</style>