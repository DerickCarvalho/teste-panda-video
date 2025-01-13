<template>
    <div>
        <v-alert
            :type="alertClass"
            variant="outlined"
            class="alert"
        >
            <slot></slot>
        </v-alert>
    </div>
</template>

<script>
    export default {
        name: 'AlerdCard',
        props: ['variant'],
        computed: {
            alertClass() {
                return [
                    this.variant ? `${this.variant}` : ''
                ]
            }
        }
    }
</script>

<style scoped>
    .alert {
        margin: 20px 0;
    }
</style>