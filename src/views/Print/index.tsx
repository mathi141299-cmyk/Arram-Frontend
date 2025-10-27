import { Box, Typography } from "@mui/material";
import { AramPrintIcon, LogoIcon } from "../../assets/icons";
import { printDesignLogo } from "../../assets/images";

type PrintPageProps = {
  date: string;
  time: string;
  tokenNo: number | string;
  area: string;
  quantity: number | string;
  printRef?: any;
};

const PrintPage = (props: PrintPageProps) => {
  const { date, time, tokenNo, area, quantity, printRef } = props;

  return (
    <Box
      ref={printRef}
      sx={{
        marginTop: "-15px",
        marginLeft: "12px",
        marginRight: "12px",
        fontFamily: "SanSerif",
      }}
    >
      <Box>
        <Box
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            margin: "30px 0",
          }}
        >
          <img src={printDesignLogo} alt="logo" />
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "-20px",
          }}
        >
          <Box
            style={{
              width: "10px",
              height: "10px",
              background: "#131313",
              borderRadius: "50%",
            }}
          />
          <Box
            style={{ width: "100%", height: "2px", background: "#131313" }}
          />
          <Box
            style={{
              width: "10px",
              height: "10px",
              background: "#131313",
              borderRadius: "50%",
            }}
          />
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          fontWeight: "400",
          fontSize: "7px",
          lineHeight: "10px",
          fontFamily: "SanSerif",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexGrow: 1,
            fontFamily: "SanSerif",
          }}
        >
          <Typography style={{ fontFamily: "SanSerif" }}>Date</Typography>
          <Typography>:</Typography>
          <Typography style={{ marginRight: "5px", fontFamily: "SanSerif" }}>
            {date}
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            fontFamily: "SanSerif",
          }}
        >
          <Typography style={{ fontFamily: "SanSerif" }}>Time</Typography>
          <Typography>:</Typography>
          <Typography style={{ marginRight: "5px", fontFamily: "SanSerif" }}>
            {time}
          </Typography>
        </Box>
      </Box>
      <Box
        style={{
          display: "flex",
          fontWeight: "400",
          fontSize: "7px",
          lineHeight: "10px",
          fontFamily: "SanSerif",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexGrow: 1,
            marginBottom: "10px",
          }}
        >
          <Typography style={{ fontFamily: "SanSerif" }}>Token No</Typography>
          <Typography>:</Typography>
          <Typography style={{ marginRight: "5px", fontFamily: "SanSerif" }}>
            {tokenNo}
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Typography style={{ fontFamily: "SanSerif" }}>Area</Typography>
          <Typography>:</Typography>
          <Typography style={{ marginRight: "5px", fontFamily: "SanSerif" }}>
            {area}
          </Typography>
        </Box>
      </Box>
      <Box style={{ marginTop: "-22px" }}>
        <Typography
          variant="h1"
          color="initial"
          sx={{
            textAlign: "center",
            alignItems: "center",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "40px",
            fontFamily: "SanSerif",
            marginRight: "15px",
          }}
        >
          Bill Amount
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "5px",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "400",
            // fontSize: "7px",
            lineHeight: "10px",
          }}
        >
          <Typography
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "25px",
              fontFamily: "SanSerif",
              marginRight: "10px",
            }}
          >
            {quantity || 0}
          </Typography>
          <Typography
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "10px",
              fontFamily: "SanSerif",
              marginRight: "10px",
            }}
          >
            x
          </Typography>
          <Typography
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "25px",
              fontFamily: "SanSerif",
              marginRight: "10px",
            }}
          >
            20
          </Typography>
          <Typography
            style={{
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "25px",
              fontFamily: "SanSerif",
              marginRight: "10px",
            }}
          >
            =
          </Typography>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Typography
              style={{
                fontWeight: "700",
                fontSize: "25px",
                lineHeight: "25px",
                fontFamily: "SanSerif",
                marginRight: "5px",
              }}
            >
              {20 * Number(quantity) || 0}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                fontWeight: "500",
                fontSize: "13px",
                // lineHeight: "10px",
                fontFamily: "SanSerif",
                // marginRight: "10px",
                // textAlign: "bottom",
                // justifyContent: "bottom",
              }}
            >
              Rs
            </Typography>
          </Box>
        </Box>

        {/* </Box> */}
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "SanSerif",
        }}
      >
        <Typography
          style={{ fontFamily: "SanSerif" }}
          sx={
            {
              // MarginTop: "18px",
            }
          }
        >
          Thank You! Visit Again!
        </Typography>
      </Box>
    </Box>
  );
};

export default PrintPage;
