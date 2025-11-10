export const getValidation = (method, value) => {
    const validations = [
        {
            method: 'email',
            regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
        },
        {
            method: 'username',
            regex: /[^A-Za-z0-9._]/.test(value),
        },
    ];
    if (method) {
        console.log('METHOD', method);
        return validations.filter((el) => {
            if (el.method === 'username') el.regex = !el.regex;
            return method === el.method;
        })[0];
    }
}