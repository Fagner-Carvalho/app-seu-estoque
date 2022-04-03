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
import { AddItems, GetItem, UpdateItem } from 'src/services/items';
import useLayout from 'src/components/layout/useLayout';
import { useSnackBar } from 'src/context/SnackbarContext';
import Autocomplete from '@mui/material/Autocomplete';
import { GetCategories } from 'src/services/categories';
import { GetUnitMeasures } from 'src/services/unitMeasures';
import Layout from '../../../components/layout';
import useItemForm from '../useItemsForm';
import { ITEM_FORM, wrapValidation } from './Form';

export default function FormItems() {
  const history = useHistory();
  const params: any = useParams();
  const snackBar = useSnackBar();
  const { setSelectedIndex } = useLayout();
  const { form } = useItemForm();

  const [categories, setCategories] = useState([] as any);
  const [unitMeasures, setUnitMeasures] = useState([] as any);

  setSelectedIndex(3);

  const showForm = async (Item: any) => {
    let showValues = {};
    showValues = {
      name: Item.name,
      category_id: Item.category_id,
      category_name: Item.category.name,
      unit_measure_id: Item.unit_measure_id,
      unit_measure_name: Item.unitMeasure.name,
      minimum_inventory: Item.minimum_inventory,
      status: Item.status,
    };

    form.setAll((prevState: any) => ({
      ...prevState,
      ...showValues,
    }));
  };

  const getCategories = useCallback(async () => {
    try {
      await GetCategories().then((response: any) => {
        const result = response.map((item: any) => (
          {
            label: item.name,
            value: item.id,
          }
        ));

        setCategories(result);
      });
    } catch (e: any) {
      snackBar.showSnackBar(`erro: ${e}`, 'error');
    }
  }, []);

  const getUnitMeasures = useCallback(async () => {
    try {
      await GetUnitMeasures().then((response: any) => {
        const result = response.map((item: any) => (
          {
            label: item.name,
            value: item.id,
          }
        ));

        setUnitMeasures(result);
      });
    } catch (e: any) {
      snackBar.showSnackBar(`erro: ${e}`, 'error');
    }
  }, []);

  useEffect(() => {
    getCategories();
    getUnitMeasures();
    async function effectGetItem() {
      if (params?.id) {
        const response = await GetItem(params?.id);
        await showForm(response);
      }
    }
    effectGetItem();
  }, []);

  const save = useCallback(
    async (payload) => {
      const validation = wrapValidation(ITEM_FORM.VALIDATION);
      if (await form.validate(validation, payload)) {
        const id = params?.id;
        try {
          if (id) {
            await UpdateItem(id, payload);
          } else {
            await AddItems(payload);
          }

          snackBar.showSnackBar(`Item ${id ? 'atualizado' : 'cadastrado'} com sucesso!`, 'success');
          history.push(AppRoutes.ListItems);
          return;
        } catch (e: any) {
          snackBar.showSnackBar(`Erro ao ${id ? 'atualizado' : 'cadastrado'} Item!`, 'error');
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
        breadcrumbs={['Items', 'Listagem', params.id ? 'Editar' : 'Adicionar']}
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
              <pre>{JSON.stringify(form.values, null, 1)}</pre>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Nome"
                    fullWidth
                    variant="standard"
                    value={form.values.name || ''}
                    onChange={form.setFromChangeEvent}
                    error={!!form.errors.getFirst('name')}
                    helperText={form.errors.getFirst('name')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="minimum_inventory"
                    name="minimum_inventory"
                    label="Estoque Minimo"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={form.values.minimum_inventory || 0}
                    onChange={form.setFromChangeEvent}
                    error={!!form.errors.getFirst('minimum_inventory')}
                    helperText={form.errors.getFirst('minimum_inventory')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    disablePortal
                    id="category"
                    value={{ label: form.values.category_name, value: form.values.category_id }}
                    options={categories}
                    onChange={(event: any, newValue: any) => {
                      form.setValue('category_id', newValue.value);
                      form.setValue('category_name', newValue.label);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="category_id"
                        label="Categoria"
                        variant="standard"
                        required
                        error={!!form.errors.getFirst('category_id')}
                        helperText={form.errors.getFirst('category_id')}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    disablePortal
                    id="unitMeasure"
                    value={{
                      label: form.values.unit_measure_name,
                      value: form.values.unit_measure_id,
                    }}
                    options={unitMeasures}
                    onChange={(event: any, newValue: any) => {
                      form.setValue('unit_measure_id', newValue.value);
                      form.setValue('unit_measure_name', newValue.label);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Unidade de Medida"
                        variant="standard"
                        required
                        error={!!form.errors.getFirst('unit_measure_id')}
                        helperText={form.errors.getFirst('unit_measure_id')}
                      />
                    )}
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
                    onClick={() => history.push(AppRoutes.ListItems)}
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
