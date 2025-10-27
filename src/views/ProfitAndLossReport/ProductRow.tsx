import React from "react";
import { TableCell, TableRow, Grid } from "@mui/material";

type ProductRowProps = {
  styles?: any;
  row?: any;
  index: number;
  tableHeaderCells?: any;
};

const ProductRow = React.memo(({ styles, row, tableHeaderCells }: any) => {
  return (
    <TableRow
      sx={{
        "& td, & th": { border: 0 },
        width: "auto",
      }}
    >
      {row?.map((item: any, index: number) => {
        // console.log("inner row", item, tableHeaderCells, index);
        return (
          <TableCell
            key={index}
            align="left"
            sx={{
              width: "auto",
              minWidth: "75px !important",
              fontWeight: item.isTitle ? "700 !important" : "400",
              fontSize: [
                "Restaurant",
                "Clinic",
                "Expenses",
                "Donation",
                "P & L ",
              ].includes(item.name)
                ? "15px !important"
                : "12px  !important",
            }}
          >
            {/* {Object.values(item)[0]} */}
            {item[tableHeaderCells[index]]}
          </TableCell>
        );
      })}
    </TableRow>
  );
});

export default ProductRow;

// [{ name: "qqq" }];
{
  /* {item.name} */
}
{
  /* {item.value ? item.value : null}
   */
}
{
  /* {Object.values<any>(item)[index]} */
}
