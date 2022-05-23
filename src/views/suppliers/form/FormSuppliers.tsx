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
import { AddSupplier, GetSupplier, UpdateSupplier } from 'src/services/suppliers';
import Layout from '../../../components/layout';
import useSupplierForm from '../useSuppliersForm';
import { SUPPLIER_FORM, wrapValidation } from './Form';

export default function FormSuppliers() {
  const history = useHistory();
  const params: any = useParams();
  const snackBar = useSnackBar();
  const { setSelectedIndex } = useLayout();
  const { form } = useSupplierForm();

  setSelectedIndex(2);

  const showForm = async (Supplier: any) => {
    let showValues = {};
    showValues = {
      name: Supplier.name,
      cnpj: Supplier.cnpj,
      email: Supplier.email,
      phone: Supplier.phone,
    };

    form.setAll((prevState: any) => ({
      ...prevState,
      ...showValues,
    }));
  };

  useEffect(() => {
    async function effectGetSupplier() {
      if (params?.id) {
        const response = await GetSupplier(params?.id);
        await showForm(response);
      }
    }
    effectGetSupplier();
  }, []);

  const save = useCallback(
    async (payload) => {
      const validation = wrapValidation(SUPPLIER_FORM.VALIDATION);
      if (await form.validate(validation, payload)) {
        const id = params?.id;
        try {
          if (id) {
            await UpdateSupplier(id, payload);
          } else {
            await AddSupplier(payload);
          }

          snackBar.showSnackBar(`Fornecedor ${id ? 'atualizado' : 'cadastrado'} com sucesso!`, 'success');
          history.push(AppRoutes.ListSuppliers);
          return;
        } catch (e: any) {
          snackBar.showSnackBar(`Erro ao ${id ? 'atualizar' : 'cadastrar'} Fornecedor!`, 'error');
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
        breadcrumbs={['Fornecedors', 'Listagem', params.id ? 'Editar' : 'Adicionar']}
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
                    id="cnpj"
                    name="cnpj"
                    label="Cnpj"
                    fullWidth
                    variant="standard"
                    value={form.values.cnpj || ''}
                    onChange={form.setFromChangeEvent}
                    error={!!form.errors.getFirst('cnpj')}
                    helperText={form.errors.getFirst('cnpj')}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    id="email"
                    name="email"
                    label="E-mail"
                    fullWidth
                    variant="standard"
                    value={form.values.email || ''}
                    onChange={form.setFromChangeEvent}
                    error={!!form.errors.getFirst('email')}
                    helperText={form.errors.getFirst('email')}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    id="phone"
                    name="phone"
                    label="Telefone"
                    fullWidth
                    variant="standard"
                    value={form.values.phone || ''}
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
                    onClick={() => history.push(AppRoutes.ListSuppliers)}
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
