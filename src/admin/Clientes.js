import {
  Paper,
  Typography,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  TextField,
  Grid,
  Box,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
//import TableContainer from '@mui/material/TableContainer';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import { useState, useEffect, createRef } from "react";

import {
  listar as listarClientes,
  deletar as modelDeletar,
  criar,
  editar,
} from "../model/clientes";

// MVC
// CRUD

export default function Clientes() {
  const [carregando, setCarregando] = useState(false);

  const [deletarOpen, setDeletarOpen] = useState(false);
  const [registroSelecionado, setRegistroSelecionado] = useState({});
  const [editarForm, setEditarForm] = useState(false);

  const [clientes, setClientes] = useState([]);

  const novoRegistro = function () {
    setEditarForm(true);
    setRegistroSelecionado({});
  };

  const loadClients = async function () {
    if (carregando === true) {
      return;
    }

    setCarregando(true);
    const data = await listarClientes();

    setClientes(data);
  };

  // hook executado ao renderizar
  useEffect(loadClients);

  const fecharDeletar = function () {
    setDeletarOpen(false);
  };

  const fecharEditarForm = () => setEditarForm(false);

  return (
    <Paper>
      <Typography component="h1" variant="h4" align="center">
        Clientes
      </Typography>

      <Button
        variant="contained"
        sx={{ float: "right", mr: 2 }}
        onClick={novoRegistro}
      >
        Novo Cliente
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>email</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {clientes.map(function (elem) {
            return (
              <TableRow key={elem.id}>
                <TableCell>{elem.id}</TableCell>
                <TableCell>
                  {elem.first_name} {elem.last_name}
                </TableCell>
                <TableCell>{elem.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 2 }}
                    onClick={function () {
                      setEditarForm(true);
                      setRegistroSelecionado(elem);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={function () {
                      setRegistroSelecionado(elem);
                      setDeletarOpen(true);
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
        open={deletarOpen}
        onFechar={fecharDeletar}
        registro={registroSelecionado}
        clientes={clientes}
        modificador={setClientes}
      />
      <Cadastro
        open={editarForm}
        registro={registroSelecionado}
        onFechar={fecharEditarForm}
        modificador={setClientes}
        clientes={clientes}
      />
    </Paper>
  );
}

function Deletar(props) {
  const { open, onFechar, registro, clientes, modificador } = props;

  const deletarCliente = async function () {
    await modelDeletar(registro.id);

    const novo = [];

    clientes.forEach(function (item) {
      if (item.id !== registro.id) {
        novo.push(item);
      }
    });

    modificador(novo);
    onFechar();
  };

  return (
    <Dialog
      open={open}
      onClose={onFechar}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Deletar"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Você Deseja realmente deletar o usuário: {registro.first_name}?
          <br />
          Essa ação não poderá ser desfeita
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={deletarCliente}>
          Sim
        </Button>
        <Button autoFocus onClick={onFechar}>
          Não
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Cadastro(props) {
  const { open, onFechar, registro, modificador, clientes } = props;

  // faz uma referencia a um elemento html como o getElementById
  let formRef = createRef();

  let salvaRegistro = async function () {
    const formDados = new FormData(formRef.current);

    let dados = {
      first_name: formDados.get("firstName"),
      last_name: formDados.get("lastName"),
      email: formDados.get("email"),
    };

    if (!registro.first_name) {
      const doc = await criar(dados);

      dados.id = doc.id;
      clientes.push(dados);
      modificador(clientes);
    } else {
      const doc = await editar(registro.id, dados);
      const novo = clientes.map(function (item) {
        if (item.id === registro.id) {
          dados.id = registro.id;
          return dados;
        }
      });

      modificador(novo);
    }

    onFechar();
  };

  return (
    <Dialog
      open={open}
      onClose={onFechar}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {registro.first_name ? "Edição do Registro" : "Novo registro"}
      </DialogTitle>
      <DialogContent>
        <Box component="form" ref={formRef} noValidate sx={{ mt: 1 }}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label="Nome"
                variant="outlined"
                name="firstName"
                value={registro.first_name}
                sx={{ m: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Sobrenome"
                variant="outlined"
                name="lastName"
                value={registro.last_name}
                sx={{ m: 1 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={registro.email}
                sx={{ m: 1 }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={salvaRegistro}>Sim</Button>
        <Button onClick={onFechar}>Não</Button>
      </DialogActions>
    </Dialog>
  );
}
