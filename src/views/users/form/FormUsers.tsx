import React, { useCallback } from 'react';
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
import { AddUsers } from 'src/services/users';
import useLayout from 'src/components/layout/useLayout';
import Layout from '../../../components/layout';
import useUserForm from '../useUsersForm';

export default function FormUsers() {
  const history = useHistory();
  const params: any = useParams();
  const { setSelectedIndex } = useLayout();
  const { form } = useUserForm();

  setSelectedIndex(1);

  const save = useCallback(
    async (payload) => {
      try {
        await AddUsers(payload);
        history.push(AppRoutes.ListUsers);
      } catch (e: any) {
        console.log('erro:', e);
      }
    },
    [],
  );

  const onSave = () => {
    save(form.values);
  };

  console.log('values', form);
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
                    onChange={form.setFromChangeEvent}
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
                    onChange={form.setFromChangeEvent}
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
