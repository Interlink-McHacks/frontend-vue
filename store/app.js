export const app = () => ({
  token: "",
  tenantID: ""
})

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setTenantID(state, tenantID) {
    state.tenantID = tenantID;
  }
}
