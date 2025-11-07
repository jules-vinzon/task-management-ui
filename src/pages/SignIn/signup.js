import React, { useEffect } from "react";
import Styles from "./signin.styles"; // reuse same styles for consistency
import { Layout, Form, Button } from "antd";
import FormItemInput from "components/Input/formItemInput";
import texts from "utils/texts.json";
import Logo from "assets/task-management-logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authAction from "../../redux/auth/actions.js";

const { Content } = Layout;
const { signup } = authAction;

export default function SignupPage() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupSuccess, isSigningUp, signupErrorMessage } = useSelector(
    (state) => state.Auth
  );

  useEffect(() => {
    if (signupSuccess) {
      navigate("/signin");
    }
  }, [signupSuccess, navigate]);

  const handleSubmit = (values) => {
    const data = {
      request_id: `TSKMNGMNT_${Date.now()}`,
      name: values.name,
      email: values.email,
      username: values.username,
      password: values.password,
    };

    console.log("Submitting signup data:", data);
    dispatch(signup(data));
  };

  return (
    <Styles>
      <div className="content-page">
        <Layout>
          <Content className="signin-content">
            <div>
              <Form
                form={form}
                name="signup"
                onFinish={handleSubmit}
                scrollToFirstError
              >
                <div className="form-header-container">
                  <img src={Logo} alt="Company Logo" className="company-logo" />
                  <div className="signin-header">Create an Account</div>
                </div>

                <div
                  className={
                    signupErrorMessage
                      ? "signin-failed-header-content"
                      : "signin-header-content"
                  }
                >
                  {signupErrorMessage
                    ? signupErrorMessage
                    : "Please fill in your details to sign up and start managing your tasks efficiently."}
                </div>

                <div className="signin-label-username">Full Name</div>
                <FormItemInput
                  required={true}
                  name="name"
                  reqMessage="Full name is required"
                  placeholder="Enter your full name"
                />

                <div className="signin-label-username">Username</div>
                <FormItemInput
                  required={true}
                  name="username"
                  reqMessage="Username is required"
                  validation="username"
                  placeholder={"Username"}
                  validateStatus={signupErrorMessage ? "error" : ""}
                  messageValidation={
                    texts.signin_label_username_invalid_message
                  }
                  hasFeedback={true}
                />

                <div className="signin-label-username">Email</div>
                <FormItemInput
                  required={true}
                  name="email"
                  reqMessage="Email is required"
                  placeholder={"Email"}
                  validation="email"
                  validateStatus={signupErrorMessage ? "error" : ""}
                  messageValidation={
                    texts.signin_label_email_invalid_message
                  }
                  hasFeedback={true}
                />

                <div className="signin-label-password">
                  {texts.signin_label_password}
                </div>
                <FormItemInput
                  inputType="password"
                  required={true}
                  name="password"
                  reqMessage="Password is required"
                  placeholder={texts.signin_label_password}
                />

                <div className="signin-label-password">Confirm Password</div>
                <FormItemInput
                  inputType="password"
                  required={true}
                  name="confirmPassword"
                  dependencies={["password"]}
                  reqMessage="Please confirm your password"
                  placeholder="Confirm password"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match")
                        );
                      },
                    }),
                  ]}
                />

                <Button
                  className="signin-btn"
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={isSigningUp}
                  style={{ width: "100%", marginTop: 20 }}
                >
                  <div>Sign Up</div>
                </Button>

                <div
                  style={{
                    textAlign: "center",
                    marginTop: 15,
                    cursor: "pointer",
                    color: "#1677FF",
                  }}
                  onClick={() => navigate("/signin")}
                >
                  Already have an account? Sign in
                </div>
              </Form>
            </div>
          </Content>
        </Layout>
      </div>
    </Styles>
  );
}
