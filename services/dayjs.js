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

  formtDateAddHour: (date, hour) => {
    return dayjs(date).add(hour, 'h').utc(false).toDate()
  },
}



