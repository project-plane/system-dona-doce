import http from "../config";

export default {
  CreateIngredientes: async (data) => {
    return await http.post('/ingredients', data)
  },
  ListIngredientes: async () => {
    return await http.get('/ingredients?limit=9999')
  },
  FindIngrediente: async (id) => {
    return await http.get(`/ingredients/${id}`)
  },
  DeleteIngredientes: async (id) => {
    return await http.delete(`/ingredients/${id}`)
  },
  UpdateIngredientes: async (id, data) => {
    return await http.put(`/ingredients/${id}`, data)
  },
  CreateReceitaIngrediente: async (data) => {
    return await http.post('/revenue-ingredient', data)
  }
}
