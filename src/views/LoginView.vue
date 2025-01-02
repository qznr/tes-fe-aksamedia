<template>
  <div class="min-h-screen bg-white dark:bg-dark-bg">
    <div class="min-h-screen flex items-center justify-center">

      <!-- Card Container -->
      <div class="relative rounded-xl shadow-lg backdrop-blur-md max-w-4xl w-full mx-auto my-16 gradient dark:bg-white glow">
        <div class="flex sm:block md:flex">
          <div class="w-full md:w-1/2 p-8">
            <h3 class="text-2xl font-bold text-black text-center mb-4">Login Here!</h3>
            <LoginForm @submit="handleLogin" />
          </div>
          <!-- Second Half Content Removed -->
        </div>

        <!-- Overlapping Card -->
        <div class="absolute overflow-hidden rounded-3xl z-10 -top-20 right-14 h-[480px] w-[360px] translate-x-1 skew-x-[-20deg] flex items-center justify-center shadow-2xl">
          <img src="../assets/Light_Cone_Incessant_Rain_Artwork.jpg" alt="Silver Wolf Image" class="skew-x-[20deg] object-cover transform scale-[145%]">
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import LoginForm from '../components/auth/LoginForm.vue';
import { useAuth } from '../composables/auth';

const { login } = useAuth();

const handleLogin = ({ username, password }) => {
  login(username, password);
};
</script>

<style scoped>
.gradient {
  background-image: linear-gradient(135deg, white 50%, #DE78DE, #78ABDE, #78DE78);
}

.glow {
  box-shadow: 0 0 20px 5px rgba(173, 216, 230, 0.7); /* Light Blue glow */
}

.dark .glow {
  box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.3); /* White glow in dark mode */
}
</style>