export default {
  addToCart({ commit }, product) {
    if (product.inventory > 0) {
      commit('ADD_TO_CART', { id: product.id })
    }
  },

  addTodo ({ commit }, text) {
    commit('addTodo', {
      text,
      done: false
    })
  },

  removeTodo ({ commit }, todo) {
    commit('removeTodo', todo)
  },

  toggleTodo ({ commit }, todo) {
    commit('editTodo', { todo, done: !todo.done })
  },

  editTodo ({ commit }, { todo, value }) {
    commit('editTodo', { todo, text: value })
  },

  toggleAll ({ state, commit }, done) {
    state.todos.forEach((todo) => {
      commit('editTodo', { todo, done })
    })
  },

  clearCompleted ({ state, commit }) {
    state.todos.filter(todo => todo.done)
      .forEach(todo => {
        commit('removeTodo', todo)
      })
  }
}
