import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import moment from "moment";

interface ExpandedComponentProps {
  data: any;
  fields: {
    label: string;
    children?: any;
  }[];
  ActionsComponent?: React.ComponentType<{ row: any }>;
}

const ExpandedComponent: React.FC<ExpandedComponentProps> = ({
  data,
  fields,
  ActionsComponent,
}) => {
  //   const getNestedProperty = (obj: any, path: string) => {
  //     return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  //   };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: "5px 60px",
        gap: 3,
      }}
    >
      {fields.map((field, index) => (
        <Box sx={{ display: "flex", gap: 1 }} key={index}>
          <Typography variant="h4" color="initial" sx={{ width: "150px" }}>
            {field.label}
          </Typography>
          :{" "}
          {
            field.children && field.children(data) // Render custom component if children function is provided
          }
        </Box>
      ))}
      {ActionsComponent && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4" color="initial" sx={{ width: "150px" }}>
            Actions
          </Typography>
          :
          <Box sx={{ display: "flex", alignItems: "center", mt: 0 }}>
            <ActionsComponent row={data} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ExpandedComponent;
