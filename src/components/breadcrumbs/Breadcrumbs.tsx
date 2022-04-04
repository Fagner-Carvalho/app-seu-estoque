import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';

interface IBreadcrumb {
  breadcrumbs: any[];
}

export default function Breadcrumb(props: IBreadcrumb) {
  const { breadcrumbs } = props;
  return (
    <Breadcrumbs
      sx={{ mt: 4, mb: 4, ml: 3 }}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {
        breadcrumbs.map((breadcrumb) => (
          <Typography key="3" color="text.primary">
            {breadcrumb}
          </Typography>
        ))
      }
    </Breadcrumbs>
  );
}
