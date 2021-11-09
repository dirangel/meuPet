import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import PetsIcon from "@mui/icons-material/Pets";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { login } from "../model/login";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const theme = createTheme();

export default function SignIn() {
  const [erro, setErro] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //criando o objeto form com os dados do form que enviou o evento
    const data = new FormData(event.currentTarget);
    setErro(false);

    try {
      const token = await login(data.get("email"), data.get("password"));
      console.log("Token: ", token);
    } catch (error) {
      setErro(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#000000" }}>
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            .meupet
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembre-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              entrar
            </Button>
            {erro === true ? (
              <Alert severity="error">Usuário ou senha incorreto!</Alert>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
