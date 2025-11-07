import React from "react";
import { Select } from "antd";
import StatusSelectStyles from "./statusSelect.styles.js";
import colors from "utils/colors.json";

const { Option } = Select;

// Default status colors
const statusColor = {
  Pending: colors.pending_color,
  Ongoing: colors.ongoing_color,
  Completed: colors.completed_color,
};

const StatusSelect = ({ value, onChange, options = ["Pending", "Ongoing", "Completed"], colors = statusColor }) => {
  return (
    <StatusSelectStyles>
      <Select
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          fontWeight: "bold",
          borderRadius: 20,
          color: "#fff",
          backgroundColor: colors[value],
        }}
        bordered={false}
        dropdownStyle={{ borderRadius: 6 }}
        className="statusSelect"
      >
        {options.map((status) => (
          <Option
            key={status}
            value={status}
            style={{
              backgroundColor: colors[status],
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {status}
          </Option>
        ))}
      </Select>
    </StatusSelectStyles>
  );
};

export default StatusSelect;
