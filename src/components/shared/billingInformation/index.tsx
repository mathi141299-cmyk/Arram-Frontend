import { Grid, IconButton, Typography } from "@mui/material";
import { TextField } from "../../basic";
import { PrintIcon } from "../../../assets/icons";
import { useRef } from "react";
import { useSelector } from "react-redux";

import PrintPage from "../../../views/Print";
import { RootState } from "../../../redux/store";
type BillingInformationProps = {
  titleFond?: string;
  billingInformationFormData?: any;
  handleInputChange?: any;
  createBill?: any;
  handleKeyPress?: any;
  billdetails?: any;
  printRef?: any;
  fieldData?: any;
  onKeyDown?: any;
  autoFocus?: boolean;
  quantityRef?: any;
  isPrintIconDisabled?: boolean;
  // modelQuantityInput?: any;
};

const BillingInformation = ({
  titleFond,
  billingInformationFormData,
  handleInputChange,
  createBill,
  handleKeyPress,
  billdetails,
  printRef,
  fieldData,
  autoFocus,
  quantityRef,
  isPrintIconDisabled = false,
}: // modelQuantityInput,
BillingInformationProps) => {
  const modelQuantityInput: any = useRef();

  // const [branchName, setBranchName] = useState<any>("EVN Road");
  // useEffect(() => {
  //   if (localStorage.getItem("userDetails")) {
  //     const userName = JSON.parse(localStorage?.getItem("userDetails") as any);
  //     setBranchName(userName.branch.name);
  //   }
  // }, [branchName]);
  const { authUser } = useSelector((state: RootState) => state.auth) as any;
  modelQuantityInput?.current?.focus();

  // console.log(
  //   "quantityRef ,modelQuantityInputfrom BillingInformation",
  //   quantityRef,
  //   modelQuantityInput
  // );

  const currentDate = new Date(billdetails?.createdAt);

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const hours = currentDate.getHours();
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const meridiem = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const formattedTime = `${formattedHours}:${minutes}:${seconds} ${meridiem}`;

  return (
    <>
      <Grid container spacing={3} onKeyPress={handleKeyPress} tabIndex={0}>
        <Grid item xl={12} xs={12}>
          <Typography variant="h4" color="primary.main" fontSize={titleFond}>
            Billing Information
          </Typography>
        </Grid>
        <Grid
          item
          xl={12}
          xs={12}
          sx={{
            display: { xs: undefined, md: "flex" },
            flexWrap: { xs: undefined, md: "wrap" },
          }}
        >
          <TextField
            label="Branch"
            placeholder="Enter Branch"
            height="51px"
            value={authUser?.branch?.name}
            disabled={true}
            sx={{
              "& .MuiOutlinedInput-root ": {
                borderColor: "#E5E7EB",
                backgroundColor: "#F4F4F5",
              },
              width: {
                xs: "95vw",
                sm: "360px",
                md: "360px",
                lg: "10.5vw",
                xl: "10.5vw",
              },
              mr: {
                xs: 30,
                lg: 5,
                xl: 5,
              },
              mb: 2,
            }}
          />
          <TextField
            label={
              <span>
                Quantity
                <span style={{ color: "#F43F5E" }}> *</span>
              </span>
            }
            // type="number"
            placeholder="Enter Quantity"
            height="51px"
            value={fieldData?.quantity?.value}
            helperText={fieldData?.quantity?.helperText}
            error={Boolean(fieldData?.quantity?.isError)}
            inputRef={quantityRef ? quantityRef : modelQuantityInput}
            // inputRef={quantityRef}
            name={fieldData.quantity.name}
            onChange={(event) => {
              handleInputChange(event);
              printRef.current.quantity = event.target.value;
            }}
            sx={{
              width: {
                xs: "95vw",
                sm: "360px",
                md: "360px",
                lg: "10.5vw",
                xl: "10.5vw",
              },
              mr: {
                xs: 30,
                lg: 0,
                xl: 0,
              },
            }}
          />
          <Typography
            variant="h1"
            color="initial"
            sx={{
              width: {
                xs: "95vw",
                sm: "360px",
                md: "360px",
                lg: "5.5vw",
                xl: "5.5vw",
              },
              mr: {
                xs: 30,
                lg: 0,
                xl: 0,
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            x
          </Typography>
          <TextField
            label="Price"
            placeholder="Enter Price"
            width="202px"
            height="51px"
            disabled={true}
            name={fieldData?.price?.name}
            value={fieldData?.price?.value}
            sx={{
              "& .MuiOutlinedInput-root ": {
                borderColor: "#E5E7EB",
                backgroundColor: "#F4F4F5",
              },
              width: {
                xs: "95vw",
                sm: "360px",
                md: "360px",
                lg: "11vw",
                xl: "11vw",
              },
              mr: {
                xs: 30,
                lg: 0,
                xl: 0,
              },
            }}
          />
          <Typography
            variant="h1"
            color="initial"
            sx={{
              width: {
                xs: "95vw",
                sm: "360px",
                md: "360px",
                lg: "4vw",
                xl: "4vw",
              },
              mr: {
                xs: 30,
                lg: 0,
                xl: 0,
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            =
          </Typography>
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              label="Net Amount"
              placeholder="Enter Net Amount"
              height="51px"
              disabled={true}
              value={fieldData?.amount?.value}
              name={fieldData?.amount?.name}
              sx={{
                "& .MuiOutlinedInput-root ": {
                  borderColor: "#E5E7EB",
                  backgroundColor: "#F4F4F5",
                },
                width: {
                  xs: "95vw",
                  sm: "360px",
                  md: "360px",
                  lg: "11vw",
                  xl: "11vw",
                },
                mr: {
                  xs: 30,
                  lg: 0,
                  xl: 0,
                },
              }}
            />
            {fieldData?.amount?.amountInLetters !== "zero" && (
              <Typography variant="h6" color="#597F59" sx={{ ml: 2, mt: 1 }}>
                {fieldData?.quantity.value !== "" &&
                  fieldData?.amount?.amountInLetters + "   Rupees Only."}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            width: {
              xs: "100vw",
              sm: "50vw",
              md: "40vw",
              lg: "55vw",
              xl: "54vw",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            disabled={isPrintIconDisabled}
            aria-label=""
            onClick={createBill}
            disableRipple
          >
            <PrintIcon />
          </IconButton>
        </Grid>
      </Grid>
      <div style={{ display: "none" }}>
        <PrintPage
          date={formattedDate}
          time={formattedTime}
          tokenNo={billdetails?.tokenNo}
          area={authUser?.branch?.name}
          quantity={billdetails?.quantity}
          printRef={printRef}
        />
      </div>
    </>
  );
};

export default BillingInformation;
