import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export interface Values {
  id: string;
  name: string;
  description: string;
  price: string;
  tax: string;
}

interface FormProps {
  values: Values;
  onChange(values: Values): void;
}

export const Form = ({ values, onChange }: FormProps) => {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Referencia"
        variant="outlined"
        disabled
        value={values.id}
        onChange={(e) => onChange({ ...values, id: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Nombre"
        variant="outlined"
        value={values.name}
        onChange={(e) => onChange({ ...values, name: e.target.value })}
      ></TextField>
      <TextField
        id="outlined-basic"
        label="Descripción"
        variant="outlined"
        value={values.description}
        onChange={(e) => onChange({ ...values, description: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Precio sin impuestos"
        variant="outlined"
        value={values.price}
        onChange={(e) => onChange({ ...values, price: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Impuesto aplicable"
        variant="outlined"
        value={values.tax}
        onChange={(e) => onChange({ ...values, tax: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Precio con impuestos"
        variant="outlined"
        disabled
        value={+values.price + +(values.price || 0) * +(values.tax || 0) * 0.01}
      />
    </Box>
  );
};
