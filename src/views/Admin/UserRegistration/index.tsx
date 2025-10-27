import { Grid, Typography } from "@mui/material";
import React from "react";
import { Button, Select, TextField } from "../../../components/basic";
import { AddressInformation } from "../../../components/shared";

const UserRegistration = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xl={12} xs={12}>
        <Typography variant="h2" color="textPrimary.main">
          User Registration
        </Typography>
      </Grid>
      <Grid item xl={12} xs={12}>
        <Typography variant="h4" color="primary.main">
          Personal Information
        </Typography>
      </Grid>
      <Grid item xl={4.5} xs={12}>
        <TextField
          label={
            <span>
              User Name
              <span style={{ color: "#F43F5E" }}> *</span>
            </span>
          }
          placeholder="Enter User Name"
          height="51px"
          sx={{
            width: {
              xl: "431px",
              xs: "340px",
            },
          }}
        />
      </Grid>
      <Grid item xl={4.5} xs={12}>
        <TextField
          label="Mobile"
          placeholder="Enter Mobile No"
          height="51px"
          sx={{
            width: {
              xl: "431px",
              xs: "340px",
            },
          }}
        />
      </Grid>
      <Grid item xl={4.5} xs={12}>
        <TextField
          label="Aadhaar No"
          placeholder="Enter Aadhaar No"
          height="51px"
          sx={{
            width: {
              xl: "431px",
              xs: "340px",
            },
          }}
        />
      </Grid>
      <Grid item xl={4.5} xs={12}>
        <TextField
          label={
            <span>
              Role
              <span style={{ color: "#F43F5E" }}> *</span>
            </span>
          }
          placeholder="Enter Role"
          height="51px"
          sx={{
            width: {
              xl: "431px",
              xs: "340px",
            },
          }}
        />
      </Grid>
      <Grid item xl={4.5} xs={12}>
        <TextField
          label={
            <span>
              Password
              <span style={{ color: "#F43F5E" }}> *</span>
            </span>
          }
          placeholder="Enter Password"
          height="51px"
          sx={{
            width: {
              xl: "431px",
              xs: "340px",
            },
          }}
        />
      </Grid>{" "}
      <Grid item xl={4.5} xs={12}>
        <Select
          label={
            <span>
              Branch
              <span style={{ color: "#F43F5E" }}> *</span>
            </span>
          }
          placeholder="Enter Branch"
          sx={{
            width: {
              xl: "431px",
              xs: "340px",
            },
          }}
          width="431px"
        />
      </Grid>
      <Grid item xl={12} xs={12}>
        <AddressInformation />
      </Grid>
      <Grid item xl={4.5} xs={12} sx={{ display: "flex", gap: 3.5 }}>
        <Button
          buttonText="Submit"
          sx={{
            width: "218px",
            height: "51px",
            mt: 3.5,
            mb: 2,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default UserRegistration;
