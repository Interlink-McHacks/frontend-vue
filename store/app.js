export const app = () => ({
  token: ""
})

export const mutations = {
  setToken(state, token) {
    state.token = token;
  }
}
