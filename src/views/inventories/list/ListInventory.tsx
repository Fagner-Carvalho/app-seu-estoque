import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
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
import { DeleteInventory, GetInventories } from 'src/services/inventories';
import useLayout from 'src/components/layout/useLayout';
import { useSnackBar } from 'src/context/SnackbarContext';
import Layout from '../../../components/layout';

export default function ListInventories() {
  const history = useHistory();
  const snackBar = useSnackBar();
  const { setSelectedIndex } = useLayout();
  const [rows, setRows] = useState([]);

  setSelectedIndex(4);

  const getInventories = React.useCallback(
    async () => {
      await GetInventories()
        .then((response: any) => {
          setRows(response);
        })
        .catch(() => {
          snackBar.showSnackBar('Erro ao listar itens!', 'error');
        });
    },
    [],
  );

  useEffect(() => {
    getInventories();
  }, []);

  const deleteInventory = React.useCallback(
    (id: string) => async () => {
      try {
        await DeleteInventory(id);
        snackBar.showSnackBar('Movimentação do estoque deletado com sucesso!', 'success');
        getInventories();
        return;
      } catch (error) {
        snackBar.showSnackBar('Erro ao deletar movimentação do estoque!', 'error');
      }
    },
    [],
  );

  const showEdit = React.useCallback(
    (id: GridRowId) => () => {
      history.push(`/inventoryMovements/update/${id}`);
    },
    [],
  );

  const columns: GridColDef[] = React.useMemo(
    () => [
      {
        field: 'type_Moviment',
        headerName: 'Tipo',
        type: 'string',
        width: 150,
        valueFormatter: ({ value }: any) => (value === 'entry' ? 'Entrada' : 'Saida'),
      },
      {
        field: 'created_at',
        headerName: 'Data',
        type: 'date',
        width: 150,
        valueFormatter: ({ value }: any) => (value ? (new Date(value)).toLocaleDateString() : ''),
      },
      {
        field: 'item',
        headerName: 'Item',
        type: 'string',
        width: 350,
        valueFormatter: ({ value }: any) => value.name,
      },
      {
        field: 'quantity',
        headerName: 'Quantidade',
        type: 'number',
        width: 100,
      },
      {
        field: 'unit_price',
        headerName: 'Preço',
        type: 'number',
        width: 100,
      },
      {
        field: 'total_price',
        headerName: 'Total',
        type: 'number',
        width: 100,
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
            onClick={deleteInventory(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteInventory],
  );

  return (
    <Layout>
      <Breadcrumb
        breadcrumbs={['Movimentações do Estoque', 'Listagem']}
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
                  onClick={() => history.push(AppRoutes.CreateInventoryMovements)}
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
