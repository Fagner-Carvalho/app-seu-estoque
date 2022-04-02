import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  ptBR,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import Breadcrumb from 'src/components/breadcrumbs/Breadcrumbs';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import AppRoutes from 'src/routes/routes';
import { DeleteUser, GetUsers } from 'src/services/users';
import useLayout from 'src/components/layout/useLayout';
import { useSnackBar } from 'src/context/SnackbarContext';
import Layout from '../../../components/layout';

export default function ListUsers() {
  const history = useHistory();
  const snackBar = useSnackBar();
  const { setSelectedIndex } = useLayout();
  const [rows, setRows] = useState([]);

  setSelectedIndex(1);

  const getUsers = React.useCallback(
    async () => {
      await GetUsers()
        .then((response: any) => {
          setRows(response);
        })
        .catch(() => {
          console.log('erro');
        });
    },
    [],
  );

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = React.useCallback(
    (id: string) => async () => {
      try {
        await DeleteUser(id);
        snackBar.showSnackBar('Usuário deletado com sucesso!', 'success');
        getUsers();
        return;
      } catch (error) {
        snackBar.showSnackBar('Erro ao deletar usuário!', 'error');
      }
    },
    [],
  );

  const showEdit = React.useCallback(
    (id: GridRowId) => () => {
      history.push(`/users/update/${id}`);
    },
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        field: 'name', headerName: 'Nome', type: 'string', width: 400,
      },
      {
        field: 'email', headerName: 'E-mail', type: 'string', width: 400,
      },
      {
        field: 'actions',
        headerName: 'Ações',
        type: 'actions',
        width: 80,
        flex: 0.3,
        getActions: (params: any) => [
          <GridActionsCellItem
            key={1}
            icon={<EditIcon />}
            label="Editar"
            onClick={showEdit(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            key={3}
            icon={<DeleteIcon />}
            label="Remover"
            onClick={deleteUser(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser],
  );

  return (
    <Layout>
      <Breadcrumb
        breadcrumbs={['Usuários', 'Listagem']}
      />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
              }}
            >
              <Grid
                container
                justifyContent="flex-end"
                alignItems="flex-end"
                sx={{ mb: 3 }}
              >
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => history.push(AppRoutes.CreateUsers)}
                >
                  Adiconar
                </Button>
              </Grid>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  columns={columns}
                  rows={rows}
                  localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
