import { Button, Grid, Container, Paper, styled } from "@mui/material";

const OptionsContainer = styled(Container)(({ theme }) => ({
  width: "580px",
  margin: "35px 0",
  padding: 0,
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const OptionsPaper = styled(Paper)(({ theme }) => ({
  padding: "10px 20px",
  border: "2px solid black",
}));

const OptionsForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const OptionsGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("xs")]: {
    flexDirection: "column",
  },
}));

const OptionsButton = styled(Button)(({ theme }) => ({
  marginTop: 20,
}));

const PaddedGrid = styled(Grid)(({ theme }) => ({
  padding: 10,
}));

export {
  OptionsContainer,
  OptionsPaper,
  OptionsForm,
  OptionsGrid,
  OptionsButton,
  PaddedGrid,
};
