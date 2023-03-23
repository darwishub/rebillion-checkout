<template>
    <q-layout view="hHh lpr fFf">

        <q-header class="bg-dark header row items-center">
            <div class="container">
                <div class="header__logo">
                    <img src="/Logo.svg">
                </div>
            </div>
        </q-header>

        <q-page-container>        
                <router-view />
        </q-page-container>

    </q-layout>
</template>

<script setup>
import { AppVisibility, useQuasar } from 'quasar'

AppVisibility.appVisible;
const $q = useQuasar();

</script>

<style lang="scss" scoped>
.header {
    height: 80px;

    .header__logo {
        width: 171px;
        height: 36px;
    }
}

@media (max-width: 599.99px) {
    .header {
        height: 44px;

        .header__logo {
            width: 95px;
            height: 20px;
        }
        .header__logo img {
            width: 95px;
            height: 20px;
        }
    }
}
@media (max-width: 1023.99px) {
    .header {
        height: 58px;

        .header__logo {
            width: 133px;
            height: 28px;
        }
        .header__logo img {
            width: 133px;
            height: 28px;
        }
    }
}
</style>
