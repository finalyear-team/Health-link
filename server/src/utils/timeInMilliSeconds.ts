export const getTimeMilliSeconds=(date:Date)=>{
    return date.getHours() * 3600 * 1000 + date.getMinutes() * 60 * 1000 + date.getSeconds() * 1000
}