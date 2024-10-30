<template>
    <div class="container mt-5">
        <div class="card mx-auto" style="max-width: 500px; box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;">
            <div class="card-header">
                <h2 class="card-title text-center">Request Password Reset</h2>
            </div>
            <div class="card-body">
                <form @submit.prevent="requestReset">
                    <div class="form-group">
                        <input
                            type="email"
                            v-model="email"
                            class="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button type="submit" class="btn btn-block" style="background-color:#075d80; color:white;">
                        <i class="fa fa-envelope"></i> Send Reset Link
                    </button>
                </form>
                <br>
                <a href="/"><i class="fa fa-home"></i> Home</a>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../axios'; 
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            email: '',
        };
    },
    methods: {
        async requestReset() {
            const toast = useToast(); // Initialize toast
            try {
                await axios.post('api/auth/request-reset', { email: this.email });
                toast.success('Reset link sent to email successfully!'); // Success message
            } catch (err) {
                
                toast.error('Internal Server error. Failure sending reset link.'); 
            }
        },
    },
};
</script>

<style>
/* Add any custom styles here if needed */
</style>
