import React from "react";
import { AutoComplete, DatePicker } from "../../../components/basic";

const Permissions = () => {
  return (
    <div>
      Permissions
      <DatePicker />
      <AutoComplete
        options={[{ id: 1, name: "Ganapathipalayam" }]}
        sx={{
          width: {
            xs: "220px",
            sm: "330px",
            md: "330px",
          },
        }}
      />
    </div>
  );
};

export default Permissions;
