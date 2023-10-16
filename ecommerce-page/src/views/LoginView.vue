<template>

    <div class="login-wrapper">
        <div class="login container-sm col-6">
            <div class="form-floating mb-3 col">
                <input type="email" class="form-control" id="floatingInput" placeholder="User">
                <label for="floatingInput">User</label>
            </div>
            <div class="form-floating col">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <RouterLink to="/" class="btn btn-outline-secondary btn-lg mt-3 col-12">Sign in</RouterLink>
        </div>
    </div>

</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: "LoginView",
}
</script>

<style scoped>
.login-wrapper {
    background-color: #040015;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
}
</style>