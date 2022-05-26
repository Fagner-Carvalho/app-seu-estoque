/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import Breadcrumb from 'src/components/breadcrumbs/Breadcrumbs';
import { useParams, useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import AppRoutes from 'src/routes/routes';
import { AddInventory, GetInventory, UpdateInventory } from 'src/services/inventories';
import useLayout from 'src/components/layout/useLayout';
import { useSnackBar } from 'src/context/SnackbarContext';
import Autocomplete from '@mui/material/Autocomplete';
import { GetItems } from 'src/services/items';
import { GetSuppliers } from 'src/services/suppliers';
import Layout from '../../../components/layout';
import useInventoryForm from '../useInventoryForm';
import { INVENTORY_MOVEMENTS_FORM, wrapValidation } from './Form';

export default function FormInventories() {
  const history = useHistory();
  const params: any = useParams();
  const snackBar = useSnackBar();
  const { setSelectedIndex } = useLayout();
  const { form } = useInventoryForm();

  const [items, setItems] = useState([] as any);
  const [suppliers, setSuppliers] = useState([] as any);

  setSelectedIndex(4);

  const showForm = async (Inventory: any) => {
    let showValues = {};
    showValues = {
      item_id: Inventory.item_id,
      item_name: Inventory.item.name,
      supplier_id: Inventory.supplier_id,
      supplier_name: Inventory.supplier.name,
      type_Moviment: Inventory.type_Moviment,
      quantity: Inventory.quantity,
      unit_price: Inventory.unit_price,
      total_price: Inventory.total_price,
    };

    form.setAll((prevState: any) => ({
      ...prevState,
      ...showValues,
    }));
  };

  const getItems = useCallback(async () => {
    try {
      await GetItems().then((response: any) => {
        const result = response.map((item: any) => (
          {
            label: item.name,
            value: item.id,
          }
        ));

        setItems(result);
      });
    } catch (e: any) {
      snackBar.showSnackBar(`erro: ${e}`, 'error');
    }
  }, []);

  const getSuppliers = useCallback(async () => {
    try {
      await GetSuppliers().then((response: any) => {
        const result = response.map((supplier: any) => (
          {
            label: supplier.name,
            value: supplier.id,
          }
        ));

        setSuppliers(result);
      });
    } catch (e: any) {
      snackBar.showSnackBar(`erro: ${e}`, 'error');
    }
  }, []);

  useEffect(() => {
    getItems();
    getSuppliers();
    async function effectGetInventory() {
      if (params?.id) {
        const response = await GetInventory(params?.id);
        await showForm(response);
      }
    }
    effectGetInventory();
  }, []);

  const save = useCallback(
    async (payload) => {
      const validation = wrapValidation(INVENTORY_MOVEMENTS_FORM.VALIDATION);
      if (await form.validate(validation, payload)) {
        const id = params?.id;
        payload.total_price = (payload.quantity * payload.unit_price);
        try {
          if (id) {
            await UpdateInventory(id, payload);
          } else {
            await AddInventory(payload);
          }

          snackBar.showSnackBar(`Movimentação ${id ? 'atualizado' : 'cadastrado'} com sucesso!`, 'success');
          history.push(AppRoutes.ListInventoryMovements);
          return;
        } catch (e: any) {
          snackBar.showSnackBar(`Erro ao ${id ? 'atualizado' : 'cadastrado'} Inventory!`, 'error');
          return;
        }
      }

      snackBar.showSnackBar('Existem campos obrigatórios pendentes!', 'error');
      window.scrollTo(0, 0);
    },
    [],
  );

  const onSave = () => {
    save(form.values);
  };

  return (
    <Layout>
      <Breadcrumb
        breadcrumbs={['Movimentações do Estoque', 'Listagem', params.id ? 'Editar' : 'Adicionar']}
      />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
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
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    disablePortal
                    id="type"
                    value={{
                      // eslint-disable-next-line no-nested-ternary
                      label: form.values.type_Moviment !== ''
                        ? (form.values.type_Moviment === 'entry' ? 'Entrada' : 'Saída')
                        : '',
                      value: form.values.type_Moviment,
                    }}
                    options={[
                      {
                        label: 'Entrada',
                        value: 'entry',
                      },
                      {
                        label: 'Saída',
                        value: 'output',
                      },
                    ]}
                    onChange={(event: any, newValue: any) => {
                      form.setValue('type_Moviment', newValue.value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="type_Moviment"
                        label="Tipo de Movimentação"
                        variant="standard"
                        required
                        error={!!form.errors.getFirst('type_Moviment')}
                        helperText={form.errors.getFirst('type_Moviment')}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Autocomplete
                    disablePortal
                    id="item"
                    value={{ label: form.values.item_name, value: form.values.item_id }}
                    options={items}
                    onChange={(event: any, newValue: any) => {
                      form.setValue('item_id', newValue.value);
                      form.setValue('item_name', newValue.label);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="item_id"
                        label="Item"
                        variant="standard"
                        required
                        error={!!form.errors.getFirst('item_id')}
                        helperText={form.errors.getFirst('item_id')}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    disablePortal
                    id="supplier"
                    value={{
                      label: form.values.supplier_name,
                      value: form.values.supplier_id,
                    }}
                    options={suppliers}
                    onChange={(event: any, newValue: any) => {
                      form.setValue('supplier_id', newValue.value);
                      form.setValue('supplier_name', newValue.label);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Fornecedor"
                        variant="standard"
                        required
                        error={!!form.errors.getFirst('supplier_id')}
                        helperText={form.errors.getFirst('supplier_id')}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="quantity"
                    name="quantity"
                    label="Quantidade"
                    fullWidth
                    variant="standard"
                    value={form.values.quantity || ''}
                    onChange={form.setFromChangeEvent}
                    error={!!form.errors.getFirst('quantity')}
                    helperText={form.errors.getFirst('quantity')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="unit_price"
                    name="unit_price"
                    label="Preço Unitário"
                    fullWidth
                    variant="standard"
                    value={form.values.unit_price || ''}
                    onChange={form.setFromChangeEvent}
                    error={!!form.errors.getFirst('unit_price')}
                    helperText={form.errors.getFirst('unit_price')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    disabled
                    id="total_price"
                    name="total_price"
                    label="Total"
                    fullWidth
                    variant="standard"
                    value={form.values.quantity * form.values.unit_price || 0}
                  />
                </Grid>
                <Grid
                  container
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  sx={{ mt: 6 }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    color="error"
                    sx={{ mr: 3 }}
                    onClick={() => history.push(AppRoutes.ListInventoryMovements)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveAltIcon />}
                    onClick={() => onSave()}
                  >
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
