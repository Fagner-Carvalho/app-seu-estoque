import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { useHistory } from 'react-router-dom';
import AppRoutes from 'src/routes/routes';
import useLayout from './useLayout';

export default function NestedList() {
  const history = useHistory();
  const { selectedIndex, setSelectedIndex } = useLayout();

  const [open, setOpen] = React.useState(false);
  // const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event: any, index: number) => {
    const { innerText } = event.target;
    if (innerText === 'Configurações') {
      setOpen(!open);
    }
    setSelectedIndex(index);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event) => {
          handleListItemClick(event, 0);
          history.push(AppRoutes.Dashboard);
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event) => {
          handleListItemClick(event, 1);
          history.push(AppRoutes.ListUsers);
        }}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <LocalShippingIcon />
        </ListItemIcon>
        <ListItemText primary="Fornecedores" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => {
          handleListItemClick(event, 3);
          history.push(AppRoutes.ListItems);
        }}
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Itens" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Estoque" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 5}
        onClick={(event) => handleListItemClick(event, 5)}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Configurações" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            selected={selectedIndex === 6}
            onClick={(event) => {
              handleListItemClick(event, 6);
              history.push(AppRoutes.ListCategories);
            }}
          >
            <ListItemIcon>
              <LocalOfferIcon />
            </ListItemIcon>
            <ListItemText primary="Categorias" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            selected={selectedIndex === 7}
            onClick={(event) => {
              handleListItemClick(event, 7);
              history.push(AppRoutes.ListUnitMeasures);
            }}
          >
            <ListItemIcon>
              <SquareFootIcon />
            </ListItemIcon>
            <ListItemText primary="Unidades" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
