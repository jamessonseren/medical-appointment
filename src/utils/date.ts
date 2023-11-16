import dayjs from "dayjs";
// Validar o horário de atendimento

// Validar se o horário de término é maior que horário de início


export function validationTime(time: string){
    //99:99
    return dayjs(formatDateHour(time)).isValid()
}

export function formatDateHour(time: string){

    const date = dayjs().format('YYYY-MM-DD ')
    const dateTimeFormat = new Date(`${date} ${time}`) //2023-11-25 23:55

    return dayjs(dateTimeFormat)
}

export function compareEndTimeIsAfter(startTime: string, endTime: string){
    return formatDateHour(endTime).isAfter(formatDateHour(startTime))
}