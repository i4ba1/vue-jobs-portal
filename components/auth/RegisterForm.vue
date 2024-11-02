<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth';
import { useValidation } from '~/composables/useValidation';

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const terms = ref(false);
const errors = ref<FormErrors>({});

const { register, loading, error: authError } = useAuth();
const { validateEmail, validatePassword, validateRequired } = useValidation();

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!validateRequired(username.value)) {
    errors.value.username = 'Username is required';
  }
  
  if (!validateRequired(email.value)) {
    errors.value.email = 'Email is required';
  } else if (!validateEmail(email.value)) {
    errors.value.email = 'Invalid email format';
  }
  
  if (!validateRequired(password.value)) {
    errors.value.password = 'Password is required';
  } else if (!validatePassword(password.value)) {
    errors.value.password = 'Password must be at least 8 characters';
  }
  
  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match';
  }
  
  if (!terms.value) {
    errors.value.terms = 'You must accept the terms and conditions';
  }
  
  return Object.keys(errors.value).length === 0;
}

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      await register({
        username: username.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        terms: terms.value
      })
    } catch (error) {
      // Error is handled by the composable
    }
  }
}
</script>

<template>
  <va-card class="auth-card">
    <va-card-title>Create Account</va-card-title>
    <va-card-content>
      <form @submit.prevent="handleSubmit">
        <va-input
          v-model="username"
          label="Username"
          :error="!!errors.username"
          :error-messages="errors.username ? [errors.username] : []"
          class="mb-4"
        />

        <va-input
          v-model="email"
          label="Email"
          type="email"
          :error="!!errors.email"
          :error-messages="errors.email ? [errors.email] : []"
          class="mb-4"
        />
        
        <va-input
          v-model="password"
          label="Password"
          type="password"
          :error="!!errors.password"
          :error-messages="errors.password ? [errors.password] : []"
          class="mb-4"
        />

        <va-input
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          :error="!!errors.confirmPassword"
          :error-messages="errors.confirmPassword ? [errors.confirmPassword] : []"
          class="mb-4"
        />

        <div class="mb-4">
          <va-checkbox
            v-model="terms"
            :error="!!errors.terms"
            :error-messages="errors.terms ? [errors.terms] : []"
          >
            I accept the terms and conditions
          </va-checkbox>
        </div>

        <va-button
          block
          type="submit"
          :loading="loading"
        >
          Sign Up
        </va-button>

        <div v-if="authError" class="mt-4">
          <va-alert color="danger">
            {{ authError }}
          </va-alert>
        </div>

        <div class="text-center mt-4">
          Already have an account? 
          <NuxtLink to="/login">
            Login
          </NuxtLink>
        </div>
      </form>
    </va-card-content>
  </va-card>
</template>

<style scoped>
.auth-card {
  max-width: 400px;
  margin: 2rem auto;
}
</style>