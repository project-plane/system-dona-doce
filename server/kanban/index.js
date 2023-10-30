import http from "../config";

export default {
  GetKanban: async (typeCard) => {
    return await http.get(`/control-production/kambam?order_type=${typeCard}`)
  },

  UpdateKanban: async (id, seq) => {
    return await http.patch(`/control-production/kambam/${id}/${seq}`)
  },
  GetOrderRoute: async ()=> {
     return await http.get(`/order/kambamRoute`)
 
  },
  GetOrderRouteCompany: async ()=> {
    return await http.get(`/company/priority`)

 },
  

}
