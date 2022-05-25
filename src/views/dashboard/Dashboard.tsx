import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import InventoryValuePerItem from 'src/components/charts/InventoryValuePerItem';
import InventoryQuantity from 'src/components/charts/InventoryQuantity';
import { GetReportInventoryQuantity, GetReportInventoryValuePerItem } from 'src/services/inventories';
import { useSnackBar } from 'src/context/SnackbarContext';
import Layout from '../../components/layout';

export default function Dashboard() {
  const snackBar = useSnackBar();
  const [dataReportInventoryValuePerItem, setDataReportInventoryValuePerItem] = useState([]);
  const [dataReportInventoryQuantity, setDataReportInventoryQuantity] = useState([]);

  const getReportInventoryValuePerItem = React.useCallback(
    async () => {
      await GetReportInventoryValuePerItem()
        .then((response: any) => {
          setDataReportInventoryValuePerItem(response);
        })
        .catch(() => {
          snackBar.showSnackBar('Erro ao listar categorias!', 'error');
        });
    },
    [],
  );

  const getReportInventoryQuantity = React.useCallback(
    async () => {
      await GetReportInventoryQuantity()
        .then((response: any) => {
          setDataReportInventoryQuantity(response);
        })
        .catch(() => {
          snackBar.showSnackBar('Erro ao listar categorias!', 'error');
        });
    },
    [],
  );

  useEffect(() => {
    getReportInventoryValuePerItem();
    getReportInventoryQuantity();
  }, []);

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
              }}
            >
              <InventoryValuePerItem
                data={dataReportInventoryValuePerItem}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 400,
              }}
            >
              <InventoryQuantity
                data={dataReportInventoryQuantity}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
