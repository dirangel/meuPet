import { useState, useEffect } from "react";
import { Paper, Typography, TextField, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function Clientes() {
  let carregaApi = true;

  const [estadoDaModal, setNovoEstadoDaModal] = useState(false);
  const [registroSelecionado, setRegistroSelecionado] = useState({});
  const [editarForm, setEditarForm] = useState(false);

  const [clientes, setClientes] = useState([]);

  const loadClients = async function () {
    if (carregaApi == false) {
      return false;
    }
    const { data } = await axios.get("https://reqres.in/api/users?page=2");
    setClientes(data.data);
    carregaApi = false;
  };

  useEffect(loadClients);

  const fecharModal = function () {
    setNovoEstadoDaModal(false);
  };
  const fecharEditarForm = function () {
    setEditarForm(false);
  };

  return (
    <Paper>
      <Typography component="h1" variant="h4" align="center">
        Clientes
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {clientes.map(function (element) {
            return (
              <TableRow key={element.id}>
                <TableCell>{element.id}</TableCell>
                <TableCell>
                  {element.first_name} {element.last_name}
                </TableCell>
                <TableCell>{element.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="success"
                    style={{ margin: "5px" }}
                  >
                    Abrir
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ margin: "5px" }}
                    onClick={function () {
                      setEditarForm(true);
                      setRegistroSelecionado(element);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ margin: "5px" }}
                    onClick={function () {
                      setRegistroSelecionado(element);
                      setNovoEstadoDaModal(true);
                    }}
                  >
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Deletar
        abrir={estadoDaModal}
        fechar={fecharModal}
        registro={registroSelecionado}
      />
      <Cadastro
        abrir={editarForm}
        fechar={fecharEditarForm}
        registro={registroSelecionado}
      />
    </Paper>
  );
}

function Deletar(props) {
  const { abrir, fechar, registro } = props;
  return (
    <Dialog
      open={abrir}
      onClose={fechar}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Aviso!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Essa ação não poderá ser desfeita, deseja deletar o usuário{" "}
          {registro.firstName} {registro.lastName}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={fechar}>
          Sim
        </Button>
        <Button autoFocus onClick={fechar}>
          Não
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Cadastro(props) {
  const { abrir, fechar, registro } = props;
  return (
    <Dialog
      open={abrir}
      onClose={fechar}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Alterar Registro</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ margin: "10px" }}
        >
          Edição de Registro
        </DialogContentText>
        <Grid container>
          <Grid item xs={4}>
            <TextField
              style={{ margin: "10px" }}
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              id="firstName"
              value={registro.firstName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              style={{ margin: "10px" }}
              id="outlined-basic"
              label="Sobrenome"
              variant="outlined"
              id="lastName"
              value={registro.lastName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              style={{ margin: "10px" }}
              id="outlined-basic"
              label="Idade"
              variant="outlined"
              id="age"
              value={registro.age}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="error">Sim</Button>
        <Button autoFocus>Não</Button>
      </DialogActions>
    </Dialog>
  );
}
