import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'interlink',
    storage: window.localStorage
  }).plugin(store);
}
