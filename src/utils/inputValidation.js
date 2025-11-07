export const getValidation = (method, value) => {
    const validations = [
        {
            method: 'name',
            regex: /^[A-Za-z]+( [A-Za-z]+)*$/.test(value),

        },
        {
            method: 'email',
            regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
        },
        {
            method: 'username',
            regex: /[^A-Za-z0-9._]/.test(value),
        },
        {
            method: 'amount',
            regex: /^\d*\.?\d+$/.test(value),
        },
        {
            method: 'none',
            regex: true,
        },
        {
            method: 'alphanumeric',
            regex: /^[a-zA-Z0-9]+$/.test(value),
        },
        {
            method: 'alphanumeric-space',
            regex: /^[A-z\d\-_\s]+$/.test(value),
        },
        {
            method: 'password',
            regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[\w\W_]+$/.test(value),
        },
        {
            method: 'number',
            regex: /^\d+$/.test(value),
        },
        {
            method: 'phone-number',
            regex: /^0\d{10}$/.test(value),
        }
    ];
    if (method) {
        console.log('METHOD', method);
        return validations.filter((el) => {
            if (el.method === 'username') el.regex = !el.regex;
            return method === el.method;
        })[0];
    }
}