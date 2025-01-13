<template>
    <div class="section-title">
        <h1 class="title">Pastas</h1>
        <img @click="homePage" src="https://dashboard.pandavideo.com.br/img/headerImage.d295470d.svg" alt="">
    </div>

    <section class="folder">
        <div class="search-camp">
            <div class="search-input">
                <v-text-field
                    append-inner-icon="mdi-magnify"
                    density="compact"
                    placeholder="Pesquisar vídeo ou pasta"
                    hide-details
                    single-line
                    v-model="searchQuery"
                ></v-text-field>
            </div>
        </div>

        <v-table class="items-list">
            <thead>
                <tr>
                    <th class="text-left">Nome</th>
                    <th class="text-center">Modificação</th>
                </tr>
            </thead>

            <tbody>
                <tr
                    class="table-item"
                    v-for="item in filteredItems"
                    :key="item.id"
                    @click="item.type === 'folder' ? openFolder(item.id) : openVideo(item.id)"
                >
                    <td class="text-left">
                        <img v-if="item.type === 'folder'" :src="folderImg" alt="">
                        <v-icon v-else icon="mdi-play-box-outline"></v-icon>
                        {{ item.name || item.title }}
                    </td>
                    <td class="text-center">{{ formateDate(item.updated_at) }}</td>
                </tr>
            </tbody>

            <div v-if="!hasItems" class="empty-message">
                <img :src="emptyImg" alt="">
                <h3>Você ainda não adicionou itens.</h3>
            </div>
        </v-table>
    </section>
</template>

<script>
    import folderImg from '@/assets/folder.png';
    import emptyImg from '@/assets/empty-state-img.png';

    export default {
        name: 'HomePage',        
        data() {
            return {
                foldersList: { folders: [] },
                videosList: { videos: [] },
                folderImg,
                emptyImg,
                hasItems: true,
                searchQuery: ''
            };
        },
        methods: {
            async getItems() {
                const videosList = await this.getVideosList();
                const foldersList = await this.getFoldersList();

                this.videosList = videosList || { videos: [] };
                this.foldersList = foldersList || { folders: [] };

                if (this.videosList.videos.length > 0 || this.foldersList.folders.length > 0) {
                    this.hasItems = true;
                }
                else {
                    this.hasItems = false;
                }
            },

            async getVideosList() {
                const response = await fetch(`https://api-v2.pandavideo.com.br/videos`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `${localStorage.getItem('apiKey')}`
                    }
                });

                if (!response.ok ) {
                    if (response.status === 401) {
                        this.$router.push(`/`);
                    }
                } else {
                    return await response.json();
                }
            },

            async getFoldersList() {
                const response = await fetch(`https://api-v2.pandavideo.com.br/folders`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `${localStorage.getItem('apiKey')}`
                    }
                });

                if (!response.ok ) {
                    if (response.status === 401) {
                        this.$router.push(`/`);
                    }
                } else {
                    return await response.json();
                }
            },

            formateDate(date) {
                const dateObj = new Date(date);
                return `Data: ${dateObj.toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
            },

            openFolder(id) {
                this.$router.push(`/folder/${id}`);
            },

            openVideo(id) {
                this.$router.push(`/player/${id}`);
            },

            homePage() {
                this.$router.push('/home');
            }
        },
        computed: {
            rootFolders() {
                if (this.foldersList.folders && this.foldersList.folders.length > 0) {
                    return this.foldersList.folders.filter((folder) => folder.parent_folder_id == null)
                } else {
                    return []
                }
            },

            rootVideos() {
                if (this.videosList.videos && this.videosList.videos.length > 0) {
                    return this.videosList.videos.filter((video) => video.folder_id == null)
                } else {
                    return []
                }
            },

            filteredItems() {
                const query = this.searchQuery.toLowerCase();

                const filteredFolders = this.rootFolders
                    .filter(folder => folder.name.toLowerCase().includes(query))
                    .map(folder => ({ ...folder, type: 'folder' }));

                const filteredVideos = this.rootVideos
                    .filter(video => video.title.toLowerCase().includes(query))
                    .map(video => ({ ...video, type: 'video' }));

                return [...filteredFolders, ...filteredVideos];
            },
        },
        watch: {
            '$route.params.id': {
                immediate: true,
                handler(newId) {
                    this.foldersList = { folders: [] };
                    this.videosList = { videos: [] };
                    this.hasItems = true;
                    this.getItems(newId);
                }
            }
        },
        async mounted() {
            // Verificando se a APIKEY ja esta validada, se não, redirecionando para Login
            if (localStorage.getItem('apiKeyValidated') == null) {
                this.$router.replace('/');
            }
            else {
                await this.getItems();
            }
        }
    };
</script>

<style scoped>
    .empty-message {
        position: absolute;
        top: calc(50% - 120.5px);
        left: calc(50% - 120px);
    }

    .folder {
        width: 90vw;
        height: 80vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #171924;
        border-radius: 10px;
        align-items: center;

        & .search-camp {
            width: 100%;
            display: flex;
            justify-content: flex-start;

            & .search-input {
                width: 40%;
                color: #ededff;
                margin: 20px 20px 0 20px;
            }
        }

        & .items-list {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background-color: #171924;
            color: #ccd3fe;
            font-size: 16px;

            & .table-item {
                color: #abadba;
                font-size: 14px;

                & img {
                    width: 12px;
                    margin: 0 5px;
                }
            }

            & .table-item:hover {
                cursor: pointer;
                background-color: #2c2e3a;
            }

            & .qtd-videos {
                width: 120px;
            }
        }
    }

    .section-title {
        color: #ededff;
        padding: 0 0 20px 15px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & img {
            width: 200px;
            transition: linear transform 0.1s;
        }

        & img:hover {            
            cursor: pointer;
            transform: scale(1.03);
        }
    }

    @media (max-width: 600px) {
        .section-title img {
            width: 150px;
        }
    }

    @media (max-width: 450px) {
        .section-title img {
            width: 120px;
        }
    }
</style>