<template>

    <nav class="navbar navbar-expand-lg bg-tertiary" data-bs-theme="light">
        <div class="container-fluid col-8">
            <RouterLink class="navbar-brand" to="/">ShopStuff</RouterLink>
            <div class="navbar-right col-2 d-flex justify-content-between">
                <RouterLink to="/login">Login</RouterLink>
                <RouterLink to="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                    </svg>
                </RouterLink>
            </div>        
        </div>
    </nav>
    
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: "HeaderPage",
}
</script>

<style scoped>

nav a {
    text-decoration: none;
    color: #FFF;
}

nav a:active {
    text-decoration: none;
    color: #FFF;
}

.navbar {
    background-color: #333;
    color: #FFF;
}

</style>