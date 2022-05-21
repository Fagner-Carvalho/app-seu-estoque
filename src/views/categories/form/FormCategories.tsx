/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useEffect } from 'react';
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
import useLayout from 'src/components/layout/useLayout';
import { useSnackBar } from 'src/context/SnackbarContext';
import { AddCategory, GetCategory, UpdateCategory } from 'src/services/categories';
import Layout from '../../../components/layout';
import useCategoryForm from '../useCategoriesForm';
import { CATEGORY_FORM, wrapValidation } from './Form';

export default function FormCategories() {
  const history = useHistory();
  const params: any = useParams();
  const snackBar = useSnackBar();
  const { setSelectedIndex } = useLayout();
  const { form } = useCategoryForm();

  setSelectedIndex(6);

  const showForm = async (Category: any) => {
    let showValues = {};
    showValues = {
      name: Category.name,
      description: Category.description,
    };

    form.setAll((prevState: any) => ({
      ...prevState,
      ...showValues,
    }));
  };

  useEffect(() => {
    async function effectGetCategory() {
      if (params?.id) {
        const response = await GetCategory(params?.id);
        await showForm(response);
      }
    }
    effectGetCategory();
  }, []);

  const save = useCallback(
    async (payload) => {
      const validation = wrapValidation(CATEGORY_FORM.VALIDATION);
      if (await form.validate(validation, payload)) {
        const id = params?.id;
        try {
          if (id) {
            await UpdateCategory(id, payload);
          } else {
            await AddCategory(payload);
          }

          snackBar.showSnackBar(`Categoria ${id ? 'atualizada' : 'cadastrada'} com sucesso!`, 'success');
          history.push(AppRoutes.ListCategories);
          return;
        } catch (e: any) {
          snackBar.showSnackBar(`Erro ao ${id ? 'atualizar' : 'cadastrar'} Categoria!`, 'error');
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
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="description"
                    name="description"
                    label="Descricação"
                    fullWidth
                    variant="standard"
                    value={form.values.description || ''}
                    onChange={form.setFromChangeEvent}
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
                    onClick={() => history.push(AppRoutes.ListCategories)}
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
