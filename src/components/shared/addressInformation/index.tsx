import { useState, useEffect } from "react";
import { AccordionSummary, Grid, Typography } from "@mui/material";
import { Select, TextField } from "../../basic";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { cityDetails, talukDetails } from "../../../services/masterService";

type AddressInformationProps = {
  isToggleEnabled?: boolean;
  freeSolo?: boolean;
  handleInputChange?: any;
  handleAutoCompleteChange?: any;
  customersName?: any;
  handleAutoCompleteInputChange?: any;
  handleDateChange?: any;
  addressInformationFormData?: any;
  formError?: any;
  fieldData?: any;
  disabled?: boolean;
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  minHeight: "0px",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({}));

const AddressInformation = ({
  isToggleEnabled = false,
  handleInputChange,
  fieldData,
  disabled,
}: AddressInformationProps) => {
  const [cityOptions, setCityOptions] = useState<any>([]);
  const [talukOptions, setTalukOptions] = useState<any>([]);

  return (
    <Grid container spacing={2}>
      {isToggleEnabled ? (
        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary
            className="accordion-summary"
            expandIcon={
              <KeyboardArrowDownIcon
                sx={{
                  color: "primary.main",
                  width: "24px",
                  height: "26px",
                }}
              />
            }
            sx={{
              borderRadius: "5px",
              width: "220px",
              mb: 2,
            }}
          >
            <Grid item xl={12} xs={12} sx={{}}>
              <Typography variant="h4" color="primary.main">
                Address Information
              </Typography>
            </Grid>
          </AccordionSummary>

          <AccordionDetails className="accordion-detail">
            <Grid container spacing={2}>
              <Grid
                item
                sx={{
                  mr: {
                    xl: "100px",
                    lg: "75px",
                    md: "0",
                    sm: "0px",
                    xs: "100px",
                  },
                }}
              >
                <TextField
                  label="Address"
                  placeholder="Enter Address"
                  height="51px"
                  name={fieldData?.address?.name}
                  value={fieldData?.address?.value}
                  onChange={handleInputChange}
                  sx={{
                    width: {
                      xl: "431px",
                      lg: "30vw",
                      md: "31.5vw",
                      sm: "45vw",
                      xs: "95vw",
                    },
                  }}
                  helperText={fieldData?.address?.helperText}
                  error={Boolean(fieldData?.address?.isError)}
                  disabled={disabled}
                />
              </Grid>
              <Grid
                item
                sx={{
                  mr: {
                    xl: "100px",
                    lg: "75px",
                    md: "0",
                    sm: "0px",
                    xs: "100px",
                  },
                }}
              >
                <TextField
                  label="Pincode"
                  placeholder="Enter Pincode"
                  height="51px"
                  name={fieldData?.pinCode?.name}
                  value={fieldData?.pinCode?.value}
                  onChange={handleInputChange}
                  sx={{
                    width: {
                      xl: "431px",
                      lg: "30vw",
                      md: "31vw",
                      sm: "45vw",
                      xs: "95vw",
                    },
                  }}
                  helperText={fieldData?.pinCode?.helperText}
                  error={Boolean(fieldData?.pinCode?.isError)}
                  disabled={disabled}
                />
              </Grid>
              <Grid
                item
                sx={{
                  mr: {
                    xl: "100px",
                    lg: "75px",
                    md: "0",
                    sm: "0px",
                    xs: "100px",
                  },
                }}
              >
                <TextField
                  label="Taluk"
                  value={fieldData?.talukId?.value}
                  name={fieldData?.talukId?.name}
                  height="51px"
                  disabled={true}
                  sx={{
                    width: {
                      xl: "431px",
                      lg: "30vw",
                      md: "31.5vw",
                      sm: "45vw",
                      xs: "95vw",
                    },
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{
                  mr: {
                    xl: "100px",
                    lg: "75px",
                    md: "0",
                    sm: "0px",
                    xs: "100px",
                  },
                }}
              >
                <TextField
                  label="City/District/Town"
                  value={fieldData?.cityId?.value}
                  name={fieldData?.cityId?.name}
                  height="51px"
                  disabled={true}
                  sx={{
                    width: {
                      xl: "431px",
                      lg: "30vw",
                      md: "31vw",
                      sm: "45vw",
                      xs: "95vw",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : (
        <>
          <Grid item xl={12} xs={12} sx={{ mb: 1 }}>
            <Typography variant="h4" color="primary.main" sx={{ mb: 2 }}>
              Address Information
            </Typography>
          </Grid>
          <Grid item xl={12} xs={12}>
            <Grid container spacing={2}>
              <Grid
                item
                sx={{
                  mr: {
                    xl: "100px",
                    lg: "75px",
                    md: "0",
                    sm: "0px",
                    xs: "100px",
                  },
                }}
              >
                <TextField
                  label="Address"
                  placeholder="Enter Address"
                  height="51px"
                  name={fieldData?.address?.name}
                  value={fieldData?.address?.value}
                  onChange={handleInputChange}
                  sx={{
                    width: {
                      xl: "431px",
                      lg: "30vw",
                      md: "31.5vw",
                      sm: "45vw",
                      xs: "95vw",
                    },
                  }}
                  helperText={fieldData?.address?.helperText}
                  error={Boolean(fieldData?.address?.isError)}
                  disabled={disabled}
                />
              </Grid>
              <Grid
                item
                sx={{
                  mr: {
                    xl: "100px",
                    lg: "75px",
                    md: "0",
                    sm: "0px",
                    xs: "100px",
                  },
                }}
              >
                <TextField
                  label="Pincode"
                  placeholder="Enter Pincode"
                  height="51px"
                  name={fieldData?.pinCode?.name}
                  value={fieldData?.pinCode?.value}
                  onChange={handleInputChange}
                  sx={{
                    width: {
                      xl: "431px",
                      lg: "30vw",
                      md: "31vw",
                      sm: "45vw",
                      xs: "95vw",
                    },
                  }}
                  helperText={fieldData?.pinCode?.helperText}
                  error={Boolean(fieldData?.pinCode?.isError)}
                  disabled={disabled}
                />
              </Grid>
              <Grid
                item
                sx={{
                  mr: {
                    xl: "100px",
                    lg: "75px",
                    md: "0",
                    sm: "0px",
                    xs: "100px",
                  },
                }}
              >
                <TextField
                  label="Taluk"
                  value={fieldData?.talukId?.value}
                  name={fieldData?.talukId?.name}
                  height="51px"
                  disabled={true}
                  sx={{
                    width: {
                      xl: "431px",
                      lg: "30vw",
                      md: "31.5vw",
                      sm: "45vw",
                      xs: "95vw",
                    },
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{
                  mr: {
                    xl: "100px",
                    lg: "75px",
                    md: "0",
                    sm: "0px",
                    xs: "100px",
                  },
                }}
              >
                <TextField
                  label="City/District/Town"
                  value={fieldData?.cityId?.value}
                  name={fieldData?.cityId?.name}
                  height="51px"
                  disabled={true}
                  sx={{
                    width: {
                      xl: "431px",
                      lg: "30vw",
                      md: "31vw",
                      sm: "45vw",
                      xs: "95vw",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default AddressInformation;
