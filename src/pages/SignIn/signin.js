import React, { useEffect } from "react";
import Styles from "./signin.styles";
import { Layout, Form, Button } from "antd";
import FormItemInput from "../../components/Input/formItemInput";
import texts from "../../utils/texts.json";
import Logo from "../../assets/task-management-logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authAction from "../../redux/auth/actions.js";

const { Content } = Layout;
const { login } = authAction;

export default function SigninPage( ) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginSuccess, isLoggingIn, loginErrorMessage } = useSelector(
    (state) => state.Auth
  );

  useEffect(() => {
    if (loginSuccess) {
      navigate("/");
    }

    // if (localStorage.getItem("idToken")) {
    //   navigate("/");
    // }
  }, [loginSuccess, navigate]);

  const handleSubmit = (values) => {
    const data = {
      request_id: `TSKMNGMNT_${Date.now()}`,
      emailOrUsername: values.emailOrUsername,
      password: values.password,
    };

    console.log("Submitting login data:", data);

    dispatch(login(data));
  };

  return (
    <Styles>
      <div className="content-page">
        <Layout>
          <Content className="signin-content">
            <div>
              <Form
                form={form}
                name="signin"
                onFinish={handleSubmit}
                scrollToFirstError
              >
                <div className="form-header-container">
                  <img src={Logo} alt="Company Logo" className="company-logo" />
                  <div className="signin-header">{texts.signin_header}</div>
                </div>

                <div
                  className={
                    loginErrorMessage
                      ? "signin-failed-header-content"
                      : "signin-header-content"
                  }
                >
                  {loginErrorMessage
                    ? loginErrorMessage
                    : texts.signin_header_content1}
                </div>

                <div className="signin-label-username">
                  {texts.signin_label_email_username}
                </div>
                <FormItemInput
                  required={true}
                  name="emailOrUsername"
                  reqMessage={
                    texts.signin_label_email_username_required_message
                  }
                  placeholder={texts.signin_label_email_username}
                  validateStatus={loginErrorMessage ? "error" : ""}
                  hasFeedback={true}
                />

                <div className="signin-label-password">
                  {texts.signin_label_password}
                </div>
                <FormItemInput
                  inputType="password"
                  required={true}
                  name="password"
                  reqMessage={texts.signin_label_password_required_message}
                  placeholder={texts.signin_label_password}
                  validateStatus={loginErrorMessage ? "error" : ""}
                  hasFeedback={true}
                />

                <Button
                  className="signin-btn"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={isLoggingIn}
                  style={{ width: "100%", marginTop: 20 }}
                >
                  <div>{texts.signin_label_button}</div>
                </Button>

                <div
                  style={{
                    textAlign: "center",
                    marginTop: 15,
                    cursor: "pointer",
                    color: "#1677FF",
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Don’t have an account? Sign up
                </div>
              </Form>
            </div>
          </Content>
        </Layout>
      </div>
    </Styles>
  );
}
