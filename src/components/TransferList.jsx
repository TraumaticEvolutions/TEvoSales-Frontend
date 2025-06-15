import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

/**
 * Filtra los elementos de `a` que no están en `b` del MuiComponent.
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 */
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

/**
 * Encuentra la intersección entre dos arrays.
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 */
function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

/**
 * Componente MUI TransferList que permite transferir elementos entre dos listas.
 * @param {Object} props
 * @param {Array} props.left - Lista de elementos disponibles.
 * @param {Array} props.right - Lista de elementos asignados.
 * @param {Function} props.setLeft - Función para actualizar la lista de elementos disponibles.
 * @param {Function} props.setRight - Función para actualizar la lista de elementos asignados.
 * @param {string} [props.leftTitle="Disponibles"] - Título de la lista de elementos disponibles.
 * @param {string} [props.rightTitle="Asignados"] - Título de la lista de elementos asignados.
 * @param {Function} [props.renderItem] - Función para renderizar cada elemento de la lista.
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
export default function TransferList({
  left,
  right,
  setLeft,
  setRight,
  leftTitle = "Disponibles",
  rightTitle = "Asignados",
  renderItem = (item) => item,
}) {
  const [checked, setChecked] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    setChecked(not(checked, left));
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    setChecked(not(checked, right));
  };

  const customList = (title, items) => (
    <Box
      sx={{
        width: { xs: "100%", sm: 200 },
        maxWidth: 280,
        minWidth: 0,
        height: { xs: 180, sm: 260 },
        bgcolor: "#f8fafc",
        borderRadius: 2,
        boxShadow: 1,
        p: 1,
        overflow: "auto",
        mb: { xs: 2, sm: 0 },
        mx: "auto",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, fontWeight: "bold", color: "#0891b2" }}
      >
        {title}
      </Typography>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={renderItem(value)} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center", // siempre centrado
        gap: 2,
        width: "100%",
      }}
    >
      {customList(leftTitle, left)}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          gap: 1,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{ minWidth: 0 }}
          variant="outlined"
          size="small"
          onClick={handleAllRight}
          disabled={left.length === 0}
        >
          ≫
        </Button>
        <Button
          sx={{ minWidth: 0 }}
          variant="outlined"
          size="small"
          onClick={handleCheckedRight}
          disabled={leftChecked.length === 0}
        >
          &gt;
        </Button>
        <Button
          sx={{ minWidth: 0 }}
          variant="outlined"
          size="small"
          onClick={handleCheckedLeft}
          disabled={rightChecked.length === 0}
        >
          &lt;
        </Button>
        <Button
          sx={{ minWidth: 0 }}
          variant="outlined"
          size="small"
          onClick={handleAllLeft}
          disabled={right.length === 0}
        >
          ≪
        </Button>
      </Box>
      {customList(rightTitle, right)}
    </Box>
  );
}
