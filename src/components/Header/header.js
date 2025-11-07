import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderStyles from "./header.styles";
import { Popover, Typography } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import TopbarDropdownWrapper from "./headerDropdown.styles";
import MenuList from "components/MenuList/menuList";
import texts from "utils/texts.json";
import authAction from "../../redux/auth/actions.js";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { logout } = authAction;

export default function CustomHeader() {
  const { idToken, loginData, loginSuccess, kickedOut } = useSelector(
    (state) => state.Auth
  );
  const navigate = useNavigate();

  const [visible, setVisibility] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loginSuccess && kickedOut) {
      navigate("/signin");
    }
  }, [loginSuccess, navigate, kickedOut]);

  function handleVisibleChange() {
    setVisibility((visible) => !visible);
  }

  const clearTime = () => {
    dispatch(logout({ token: idToken }));
  };

  const content = (
    <TopbarDropdownWrapper
      className="isoUserDropdown"
      onClick={() => setVisibility(false)}
    >
      <div className="userBanner">
        <Text strong>{loginData?.user.name || "Unknown User"}</Text>
      </div>
      <MenuList
        title={texts.topbar_menu_list_logout}
        leftIcon={<LogoutOutlined />}
        size="large"
        onClick={() => clearTime()}
      />
    </TopbarDropdownWrapper>
  );

  const firstName = loginData?.user?.name?.split(" ")[0] || "";

  return (
    <HeaderStyles>
      <div className="header-left">
        <div className="logo" onClick={() => navigate("/")}>
          TaskTracker
        </div>
      </div>

      <div className="header-right">
        <li className="identityLi">
          <div className="identityHeader">
            <div className="user">{firstName || "Unknown User"}</div>
            <div className="roles">{loginData?.user?.role || "Member"}</div>
          </div>
        </li>
        <li className="isoUser">
          <Popover
            content={content}
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
            arrowPointAtCenter={true}
            placement="bottomRight"
          >
            <div className="isoImgWrapper">
              <UserOutlined />
            </div>
          </Popover>
        </li>
      </div>
    </HeaderStyles>
  );
}
