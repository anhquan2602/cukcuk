export const Validator = (value, rules = []) => {
    let errorMessage = '';
    if (rules && rules.length > 0) {
        for (let i = 0; i < rules.length; i++) {
            errorMessage = rules[i].test(value);
            if (errorMessage) {
                return errorMessage;
            }
        }
    }
    return '';
};

/**
 * Author: Anh Quân
 * Date: 1/8/2023
 * Description: Hàm kiểm tra bắt buộc nhập
 * @param {*} message 
 * @returns 
 */
Validator.isRequired = (message) => {
    return {
        test: (value) => {
            if (Array.isArray(value)) {
                return value.length ? '' : message || 'Vui lòng nhập trường này';
            } else {
                return value ? '' : message || 'Vui lòng nhập trường này';
            }
        },
    };
};

/**
 * 
 * @param {*} message 
 * @returns 
 */


/**
 * Author: Anh Quân
 * Date: 1/8/2023
 * Description: Hàm validate email
 * @param {*} message 
 * @returns 
 */
Validator.isEmail = (message) => {
    return {
        test: (value) => {
            var regex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập email';
        },
    };
};

// hàm validate số điện thoại 
Validator.isPhoneNumber = (message) => {
    return {
        test: (value) => {
            var regex = /^\d{10,}$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập số điện thoại';
        },
    };
};

// /**
//  * Author: Anh Quân
//  * Date: 1/8/2023
//  * Description: Hàm validate max length
//  * @param {*} message 
//  * @returns 
//  */
// Validator.minLength = (min, message) => {
//     return {
//         test: (value) => {
//             return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
//         },
//     };
// };