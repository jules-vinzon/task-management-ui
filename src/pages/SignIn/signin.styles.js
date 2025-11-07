import styled from "styled-components";
import colors from "utils/colors.json";

const SigninStyles = styled.div`
  .content-page {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.login_background};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 20px;
  }

  .ant-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent !important;
    width: 100%;
    max-width: 480px;
    min-height: auto;
  }

  .ant-form {
    min-width: 100%;
  }

  .signin-header {
    font-weight: 700;
    font-size: 32px;
    text-align: center;
    color: ${colors.company_color};
    margin-bottom: 8px;
    letter-spacing: -0.5px;
  }

  .signin-header-content,
  .signin-description {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.6;
    margin-top: 10px;
    text-align: center;
    color: ${colors.text_primary};
    opacity: 0.9;
    letter-spacing: 0.2px;
  }

  .signin-failed-header-content {
    font-size: 19px;
    font-weight: 500;
    line-height: 1.6;
    margin-top: 10px;
    text-align: center;
    color: red;
    letter-spacing: 0.2px;
  }

  .signin-content {
    border-radius: 20px;
    padding: 32px 28px;
    background: #f9fafb;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: auto;
    max-width: 450px;
    opacity: 0.9;
  }

  .signin-input {
    min-width: 100%;
    height: 48px;
    border-radius: 10px;
    border: 1px solid ${colors.company_color};
    margin-bottom: 16px;
    padding: 12px 14px;
    transition: all 0.2s ease;
  }

  .signin-input:focus {
    border-color: ${colors.active_menu_color};
    outline: none;
    box-shadow: 0 0 6px ${colors.active_menu_color};
  }

  .signin-label-username {
    font-size: 14px;
    font-weight: 600;
    margin: 18px 0 6px;
    color: ${colors.text_primary};
  }

  .signin-label-password {
    font-size: 14px;
    font-weight: 600;
    margin: 5px 0 6px;
    color: ${colors.text_primary};
  }

  .signin-label-username:first-child {
    margin-top: 10px;
  }

  .signin-btn {
    width: 100%;
    height: 50px;
    margin-top: 22px;
    background-color: ${colors.company_color};
    border-color: ${colors.company_color} !important;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transition: all 0.3s ease;
  }

  .signin-btn:hover {
    background-color: ${colors.active_menu_color};
    color: ${colors.company_color} !important;
    border-color: ${colors.company_color} !important;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  .company-logo {
    max-width: 100px;
    margin-bottom: 12px;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
  }

  .form-header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 18px;
  }

  .ant-btn-link {
    font-size: 14px;
    font-weight: 500;
    color: ${colors.company_color};
    transition: color 0.3s ease;
  }

  .ant-btn-link:hover {
    color: ${colors.accent_color};
  }

  @media (max-width: 576px) {
    .signin-header {
      font-size: 26px;
    }

    .signin-content {
      padding: 24px 20px;
    }

    .company-logo {
      max-width: 80px;
    }
  }
`;

export default SigninStyles;
