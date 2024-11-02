// components/auth/LoginForm.vue
<template>
  <va-card class="auth-card">
    <va-card-title>Login</va-card-title>
    <va-card-content>
      <!-- Change to normal submit and handle with method -->
      <form @submit="onSubmit">
        <va-input
          v-model="formData.email"
          label="Email"
          type="email"
          :error="!!errors.email"
          :error-messages="errors.email ? [errors.email] : []"
          class="mb-4 full-width"
        />
        
        <va-input
          v-model="formData.password"
          label="Password"
          type="password"
          :error="!!errors.password"
          :error-messages="errors.password ? [errors.password] : []"
          class="mb-4 full-width"
        />

        <div class="mb-4">
          <va-checkbox
            v-model="formData.remember"
            label="Remember me"
            color="primary"
            class="custom-checkbox"
          />
        </div>

        <!-- Change to click event instead of submit -->
        <va-button
          block
          type="button"
          :loading="loading"
          @click="handleSubmit"
        >
          Login
        </va-button>

        <div v-if="authError" class="mt-4">
          <va-alert color="danger">
            {{ authError }}
          </va-alert>
        </div>

        <div class="text-center mt-4">
          Don't have an account? 
          <NuxtLink to="/register">
            Sign Up
          </NuxtLink>
        </div>
      </form>
    </va-card-content>
  </va-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { LoginCredentials } from '~/models/auth.model';

interface FormErrors {
  email?: string;
  password?: string;
}

const formData = reactive<LoginCredentials>({
  email: '',
  password: '',
  remember: false
});

const errors = ref<FormErrors>({});
const { login, loading, error: authError } = useAuth();

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

const validateForm = (): boolean => {
  errors.value = {};
  
  if (!formData.email) {
    errors.value.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.value.email = 'Invalid email format';
  }
  
  if (!formData.password) {
    errors.value.password = 'Password is required';
  } else if (!validatePassword(formData.password)) {
    errors.value.password = 'Password must be at least 8 characters';
  }
  
  return Object.keys(errors.value).length === 0;
};

// Separate form submission handler
const onSubmit = (event: Event) => {
  event.preventDefault();
};

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      await login({
        email: formData.email,
        password: formData.password,
        remember: formData.remember
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  }
};
</script>

<style scoped>
.auth-card {
  max-width: 400px;
  margin: 2rem auto;
}

/* Option 1: Using full-width class */
.full-width {
  width: 100%;
}

:deep(.va-checkbox__input-container) {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.va-checkbox__square) {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid var(--va-primary);
  transition: all 0.3s ease;
}

:deep(.va-checkbox__input) {
  opacity: 0;
  position: absolute;
}

/* Hide the material icons text */
:deep(.va-checkbox__icon) {
  font-size: 0 !important;
}

/* Add custom checkmark */
:deep(.va-checkbox__square::after) {
  content: '';
  position: absolute;
  display: none;
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Show checkmark when checked */
:deep(.va-checkbox__input:checked ~ .va-checkbox__square::after) {
  display: block;
}

:deep(.va-checkbox__label) {
  color: var(--va-text-primary);
  margin-left: 4px;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

.text-center {
  text-align: center;
}
</style>