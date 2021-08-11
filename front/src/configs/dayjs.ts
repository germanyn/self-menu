import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')