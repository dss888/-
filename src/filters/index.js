import moment from 'moment'
export function formadate(val){
    return moment(val).format('YYYY/MM/DD HH:mm:ss')
     }