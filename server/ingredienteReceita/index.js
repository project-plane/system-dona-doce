import http from "../config";

export default {
  DeleteReceitaIngrediente: async (data) => {
    return await http.delete('/revenue-ingredient', { data })
  },
  UpdateReceitaIngrediente: async (data) => {
    return await http.patch('/revenue-ingredient', data)
  },
  CreateReceitaIngrediente: async (data) => {
    return await http.post('/revenue-ingredient', data)
  }
}
