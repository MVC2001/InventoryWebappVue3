import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const token = ref('');

  function setUser(userData) {
    user.value = userData;
  }

  function setToken(userToken) {
    token.value = userToken;
  }

  function clearUser() {
    user.value = null;
    token.value = '';
  }

  const isAuthenticated = computed(() => !!token.value);

  return { user, token, setUser, setToken, clearUser, isAuthenticated };
});
