import Enum from './enum'

/**
 * @param {string} str
 * Author: Anh Quân (06/07/2023)
 * Description: Hàm chuyển chữ tiếng việt có dấu thành k dấu
 */
export function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
    str = str.replace(/Đ/g, 'D')
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, '') // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ')
    str = str.trim()
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        // str = str.replace(
        //   /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        //   " "
        // );
    return str
}

// Author: Anh Quân (20/06/2023)
/**
 * @param {string} date
 * Author: Anh Quân (28/06/2023)
 * Description: Hàm chuyển ngày tháng cùng định dạng với input
 */
export const convertNewDate = (date) => {
        try {
            let newDate
            if (date === null || date === undefined) {
                return ''
            }
            if (date.length > 9) {
                newDate = convertDate(date).split('/').reverse().join('-')
            } else {
                newDate = date.split('/').reverse().join('-')
            }
            return newDate
        } catch (error) {
            console.log(error)
            return ''
        }
    }
    /**
     * @param {string} gender
     * Author: Anh Quân (20/06/2023)
     * Description: Hàm chuyển dữ liệu giới tính Nam/Nữ
     */
export function convertGender(gender) {
    try {
        if (gender !== Enum.Gender.Female && gender !== Enum.Gender.Male) {
            return 'Khác'
        }
        return gender === Enum.Gender.Male ? 'Nam' : 'Nữ'
    } catch (error) {
        console.log(error)
        return ''
    }
}
/**
 * @param {string} dateTime
 * Author: Anh Quân (20/06/2023)
 * Description: Hàm chuyển dateTime sang ngày/tháng/năm
 */
export function convertDate(dateTime) {
    try {
        // const date = new Date(dateTime);
        if (dateTime && dateTime.length > 0) {
            const date = new Date(dateTime).toLocaleString('vi-vn', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            })
            const dateArray = date.split('/')
            const newDate =
                parseInt(dateArray[0]) > 9 ? parseInt(dateArray[0]) : '0' + parseInt(dateArray[0])
            const month =
                parseInt(dateArray[1]) > 9 ? parseInt(dadateArray[1]) : '0' + parseInt(dateArray[1])
            const year = parseInt(dateArray[2])
                // const month  = date.getUTCMonth() + 1; //months from 1-12
                // const newDate =  date.getUTCDate();
                // const year = date.getUTCFullYear();
            return `${newDate}/${month}/${year}`
        }
        return '';
    } catch (error) {
        console.log(error)
        return ''
    }
}
/**
 * @param {string} currency
 * Author: Anh Quân (20/06/2023)
 * Description: Hàm chuyển định dạng tiền sang kiểu VN
 */
export const convertCurrency = (currency) => {
        try {
            let currencyString = currency.toLocaleString('vi-VN')

            return currencyString
        } catch (error) {
            // console.log(error);
            return ''
        }
    }
    /**
     * @param {string} arr
     * Author: Anh Quân (09/07/2023)
     * Description: Hàm chuyển chữ tiếng việt có dấu thành k dấu
     */
export const convertDataTable = (arr, columnsTable) => {
    try {
        const dataConvert = arr.map((data) => {
            const convertData = {...data }
            columnsTable.forEach((column) => {
                const value = convertData[column.key]
                if (column.type === 'gender') {
                    convertData[column.key] = convertGender(value)
                }
                if (column.type === 'date') {
                    convertData[column.key] = convertDate(value)
                }
                if (column.type === 'money') {
                    convertData[column.key] = convertCurrency(value)
                }
            })
            return convertData
        })
        return dataConvert
    } catch (error) {
        console.log(error)
    }
}