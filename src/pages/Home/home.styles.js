import styled from "styled-components";
import colors from "../../utils/colors.json";

const HomePageStyles = styled.div`
  font-family: "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  color: ${colors.text_primary};
  background-color: ${colors.background_color};

  .layoutHeader {
    background: linear-gradient(
      90deg,
      ${colors.accent_color} 0%,
      ${colors.company_color} 100%
    );
    padding: 20px 40px;
    margin-bottom: 32px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    color: ${colors.text_inverse};
    font-family: "Inter", sans-serif;
  }

  .layoutHeader .ant-typography {
    font-weight: 700;
    font-size: 1.5rem;
  }

  .cardStyle {
    border-radius: 16px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    padding: 24px;
    font-family: "Inter", sans-serif;
  }

  .customRow:hover {
    background-color: #e8f0ff !important;
  }

  .ant-table-thead > tr > th {
    background-color: #f0f4ff;
    font-weight: 600;
    border-bottom: none;
    color: ${colors.text_primary};
    font-family: "Inter", sans-serif;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #d9e1f2;
    padding: 16px;
    color: ${colors.text_primary};
    font-family: "Inter", sans-serif;
  }

  .statusSelect .ant-select-selector {
    border-radius: 8px !important;
    padding: 4px 12px !important;
    text-align: center;
    font-weight: 600 !important;
    font-family: "Inter", sans-serif;
  }

  .ant-btn-primary {
    background-color: ${colors.accent_color};
    border-color: ${colors.accent_color};
    font-weight: 600;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    color: ${colors.text_inverse};
    font-family: "Inter", sans-serif;
  }

  .ant-btn-primary:hover {
    background-color: ${colors.active_menu_color};
    border-color: ${colors.active_menu_color};
  }

  .ant-btn-danger {
    background-color: #f56c6c;
    border-color: #f56c6c;
    color: ${colors.text_inverse};
    font-family: "Inter", sans-serif;
  }

  .ant-btn-danger:hover {
    background-color: #e84e4e;
    border-color: #e84e4e;
  }

  .addTaskForm {
    display: grid;
    grid-template-columns: 500px 1fr 160px 120px;
    gap: 16px;
    align-items: center;
  }

  .addTaskForm .ant-form-item {
    margin-bottom: 0;
  }

  .addTaskForm .ant-select,
  .addTaskForm .ant-input,
  .addTaskButton {
    height: 40px;
  }

  .addTaskForm .ant-select {
    display: flex;
    align-items: center;
  }

  .addTaskForm .ant-select-selector {
    height: 40px !important;
    display: flex !important;
    align-items: center !important;
    padding: 0 12px !important;
    border-radius: 8px !important;
    font-family: "Inter", sans-serif;
    box-sizing: border-box;
  }

  .addTaskForm .ant-input {
    height: 40px;
    display: flex;
    align-items: center;
  }

  .addTaskButton {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    .addTaskForm {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }

  @media (max-width: 768px) {
    .layoutHeader {
      flex-direction: column;
      align-items: flex-start;
    }

    .cardStyle {
      padding: 16px;
    }

    .ant-table-tbody > tr > td {
      padding: 12px;
    }
  }
`;

export default HomePageStyles;
