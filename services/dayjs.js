import * as dayjs from "dayjs"
import * as utc from "dayjs/plugin/utc"
import * as timezone from "dayjs/plugin/timezone"

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Manaus');

export default {
  formtDateBr: (date) => {

    return dayjs(date).utc(false).format('DD/MM/YYYY')
  },

  formtDateUSA: (date) => {

    return dayjs(date).utc(true).format('YYYY-MM-DD')
  },

  formtDateAddHour: (date, hour) => {
    return dayjs(date).add(hour, 'h').utc(false).toDate()
  },
  valueorder(listOrder) {
    const formattedTotal = listOrder.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })

    return formattedTotal
},
}



