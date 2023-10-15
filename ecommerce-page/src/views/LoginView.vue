<template>

    <div class="login-wrapper">
        <div class="login container-sm mx-auto">
            <div class="form-floating mb-3 col col-4">
                <input type="email" class="form-control" id="floatingInput" placeholder="User">
                <label for="floatingInput">User</label>
            </div>
            <div class="form-floating col-4">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <RouterLink to="/" class="btn btn-outline-secondary btn-lg mt-3 col-4">Sign in</RouterLink>
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
    height: 100%;
}

.login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>