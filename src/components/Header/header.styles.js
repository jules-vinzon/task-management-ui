import styled from "styled-components";
import colors from "../../utils/colors.json";

const HeaderStyles = styled.header`
  background: ${colors.company_color};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 64px;
  color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .logo {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #fff;
      cursor: pointer;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;

    .identityLi {
      color: #fff;
      text-align: right;

      .identityHeader {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .user {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .roles {
          font-size: 11px;
          opacity: 0.8;
        }
      }
    }

    .isoUser {
      position: relative;

      .isoImgWrapper {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1.5px solid rgba(255, 255, 255, 0.2);

        &:hover {
          background-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-1px);
        }

        svg {
          color: #fff;
          font-size: 20px;
        }
      }
    }
  }

  /* Popover styles */
  .ant-popover {
    .ant-popover-inner {
      border-radius: 10px;
    }
  }
`;

export default HeaderStyles;
