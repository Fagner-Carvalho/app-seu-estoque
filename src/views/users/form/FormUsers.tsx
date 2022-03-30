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
import { AddUsers, GetUser, UpdateUser } from 'src/services/users';
import useLayout from 'src/components/layout/useLayout';
import { useSnackBar } from 'src/context/SnackbarContext';
import Layout from '../../../components/layout';
import useUserForm from '../useUsersForm';
import { USER_FORM, wrapValidation } from './Form';

export default function FormUsers() {
  const history = useHistory();
  const params: any = useParams();
  const snackBar = useSnackBar();
  const { setSelectedIndex } = useLayout();
  const { form } = useUserForm();

  setSelectedIndex(1);

  const showForm = async (user: any) => {
    let showValues = {};
    showValues = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    form.setAll((prevState: any) => ({
      ...prevState,
      ...showValues,
    }));
  };

  useEffect(() => {
    async function effectGetUser() {
      if (params?.id) {
        const response = await GetUser(params?.id);
        await showForm(response);
      }
    }
    effectGetUser();
  }, []);

  const save = useCallback(
    async (payload) => {
      const validation = wrapValidation(USER_FORM.VALIDATION);
      if (await form.validate(validation, payload)) {
        const id = params?.id;
        try {
          if (id) {
            await UpdateUser(id, payload);
          } else {
            await AddUsers(payload);
          }

          snackBar.showSnackBar(`Usuário ${id ? 'atualizado' : 'cadastrado'} com sucesso!`, 'success');
          history.push(AppRoutes.ListUsers);
          return;
        } catch (e: any) {
          snackBar.showSnackBar(`Erro ao ${id ? 'atualizado' : 'cadastrado'} usuário!`, 'error');
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
        breadcrumbs={['Usuários', 'Listagem', params.id ? 'Editar' : 'Adicionar']}
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="password"
                    name="password"
                    label="Senha"
                    fullWidth
                    variant="standard"
                    type="Password"
                    value={form.values.password || ''}
                    onChange={form.setFromChangeEvent}
                    error={!!form.errors.getFirst('password')}
                    helperText={form.errors.getFirst('password')}
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
                    onClick={() => history.push(AppRoutes.ListUsers)}
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
