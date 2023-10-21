import http from "../config";

export default {
  GetListBuy: async (client = "", orderStatus = "", orderType = "") => {
    return await http.patch(`/dashboard/shoppingList`, {
      orderStatus,
      orderType,
      client
    })
  },


}
