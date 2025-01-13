<template>
    <v-container class="container">
        <div class="top-page">
            <h1>Player</h1>
            <img @click="homePage" src="https://dashboard.pandavideo.com.br/img/headerImage.d295470d.svg" alt="">
        </div>
        <v-card v-if="!errorMessage" class="card">
            <div class="embed-video" v-html="videoEmbed.html"></div>
            <v-text-field
                class="input"
                v-model="videoTitle"
                label="Título do vídeo"
                outlined
            ></v-text-field>
            <v-textarea
                class="input"
                v-model="videoDesc"
                label="Descrição do vídeo"
                outlined
                rows="4"
            ></v-textarea>

            <v-btn
                :disabled="!hasModification"
                class="mt-4 btn"
                @click="updateInfoVideo(this.$route.params.id)"
                :loading="loadingButton"
            >
                Salvar
            </v-btn>
        </v-card>

        <v-card v-if="errorMessage" class="card error">
            <v-card-title>
                Houve algum problema
            </v-card-title>

            <v-card-text>
                Algum problema interno fez com que esta página não fosse exibida corretamente, tente acessa-la novamente mais tarde.
            </v-card-text>
        </v-card>
    </v-container>
  </template>

<script>
    import folderImg from '@/assets/folder.png';

    export default {    
        name: 'PlayerView',        
        data() {
            return {
                folderImg,
                videoEmbed: {},
                infoVideo: {},
                videoTitle: "",
                videoDesc: "",
                hasModification: false,
                loadingButton: false,
                errorMessage: false
            }
        },

        methods: {
            async getVideoEmbed(videoId) {
                const videoEmbed = await fetch(`https://api-v2.pandavideo.com/oembed?url=https%3A%2F%2Fdashboard.pandavideo.com.br%2F%23%2Fvideos%2F${videoId}`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `${localStorage.getItem('apiKey')}`
                    }
                });

                if (!videoEmbed.ok) {
                    this.errorMessage = true
                }
                else {
                    this.videoEmbed = await videoEmbed.json();
                }
            },

            async getInfoVideo(videoId) {
                console.log(this.videoTitle, this.videoDesc)
                const infoVideo = await fetch(`https://api-v2.pandavideo.com.br/videos/${videoId}`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `${localStorage.getItem('apiKey')}`
                    }
                });

                if (!infoVideo.ok) {
                    console.log('Corrigir depois');
                }
                else {
                    this.infoVideo = await infoVideo.json();
                }
            },

            async updateInfoVideo(videoId) {
                this.loadingButton = true;
                const updateInfoVideos = await fetch(`https://api-v2.pandavideo.com.br/videos/${videoId}`, {
                    method: 'PUT',
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/json',
                        'Authorization': `${localStorage.getItem('apiKey')}`
                    },
                    body: JSON.stringify({title: this.videoTitle? this.videoTitle : '', description: this.videoDesc? this.videoDesc : ''})
                });

                if (!updateInfoVideos.ok) {
                    console.log('Corrigir depois');
                }
                else {
                    location.reload();
                }
            },

            homePage() {
                this.$router.push('/home')
            }
        },
        watch: {
            videoTitle(newVal) {
            this.hasModification = newVal !== this.infoVideo.title;
            },
            videoDesc(newVal) {
                this.hasModification = newVal !== this.infoVideo.description;
            },
        },
        async mounted() {
            // Verificando se a APIKEY ja esta validada, se não, redirecionando para Login
            if (localStorage.getItem('apiKeyValidated') == null) {
                this.$router.push('/');
            }
            
            await this.getVideoEmbed(this.$route.params.id);
            await this.getInfoVideo(this.$route.params.id)
            this.videoTitle = this.infoVideo.title;
            this.videoDesc = this.infoVideo.description;
        }
    }
</script>

<style scoped>
    .container {
        width: 100vw;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;

        & .top-page {
            width: 95%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #ededff;

            & img {
                width: 200px;
                transition: linear transform 0.1s;
            }

            & img:hover {
                cursor: pointer;
                transform: scale(1.03);
            }
        }

        & .card {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #171924;
            color: #FFF;
            padding: 50px;
            margin: 20px;

            & .input {
                width: 40%;
                margin: 20px 0 0 0;
            }
        }

        & .error {
            height: 80vh;
        }
    }

    .btn {
        background-color: #3f55ee;
        color: #FFF;
    }
</style>