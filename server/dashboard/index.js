import http from "../config";

export default {
  GetListBuy: async (data= undefined,client = "", orderStatus = "", orderType = "") => {
    return await http.patch(`/dashboard/shoppingList`, {
      orderStatus,
      orderType,
      client,
      data
    })
  },


}
