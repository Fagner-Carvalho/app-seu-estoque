import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Layout from '../../components/layout/Layout';

export default function CreateUsers() {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              Dashboard!!!
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
