import { Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Grid, Button, MenuItem } from "@material-ui/core";
import { TextField, Select } from "final-form-material-ui";

export default function ItemAddableField(props) {
  return (
    <Grid item xs={12} style={{ marginTop: 16 }}>
      <Grid item style={{ marginTop: 16 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.push(props.id, undefined)}
        >
          {props.buttonText}
        </Button>
      </Grid>

      <FieldArray name={props.id}>
        {({ fields }) =>
          fields.map((name, index) => (
            <Grid
              item
              xs={12}
              style={{
                marginTop: 16,
                borderLeft: "solid 3px #00f",
                padding: "5px",
                margin: "5px 0",
              }}
            >
              {props.multiline ? (
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name={`${name}.title`}
                    component={TextField}
                    placeholder="Ders Başlığı"
                  />
                  <Field
                    multiline
                    fullWidth
                    name={`${name}.body`}
                    component={TextField}
                    placeholder="Ders İçeriği"
                  />
                </Grid>
              ) : props.categories ? (
                <Field
                  required
                  key={index}
                  name={`${name}`}
                  component={Select}
                  label="Kategori seç"
                  formControlProps={{ fullWidth: true }}
                >
                  {props.categories.map((category) => (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                  ))}
                </Field>
              ) : (
                <Field
                  multiline
                  fullWidth
                  name={`${name}`}
                  type="text"
                  required
                  component={TextField}
                  placeholder={props.placeholder}
                />
              )}

              <Button
                variant="contained"
                color="secondary"
                onClick={() => fields.remove(index)}
                style={{ cursor: "pointer" }}
              >
                x
              </Button>
            </Grid>
          ))
        }
      </FieldArray>
    </Grid>
  );
}
