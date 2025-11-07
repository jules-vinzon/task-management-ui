import styled from 'styled-components';

const InputStyle = styled.div`
    .label-style, .ant-form-item-required {
        font-family: 'DM Sans' !important;
        font-weight: 700 !important;
        margin: 0 0 8px 0;
    }

    .form-item {
        border-radius: 35px;
    }

    .form-input {
        height: 50px;
        width: 100%;
    }

    .ant-form-item-explain-error {
        font-size: small;
    }
`;

export default InputStyle;
