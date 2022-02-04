import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import arrayMutators from "final-form-arrays";
import { Paper, Grid, Button, CssBaseline } from "@material-ui/core";
import ItemAddableField from "./ItemAddableField";

function SummaryForm() {
  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    console.log(JSON.stringify(values, 0, 2));
    window.alert(JSON.stringify(values, 0, 2));
  };

  const validate = (values) => {
    const errors = {};

    return errors;
  };

  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <CssBaseline />

      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        initialValues={{ ISBN: "93", authorId: "1093" }}
        validate={validate}
        render={({
          handleSubmit,
          reset,
          submitting,
          form: {
            mutators: { push, pop },
          },
          pristine,
          values,
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="bookName"
                    component={TextField}
                    type="text"
                    label="Kitap Adı"
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="authorName"
                    component={TextField}
                    type="text"
                    label="Yazar Adı"
                    disabled={true}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    multiline
                    name="structure"
                    component={TextField}
                    type="text"
                    label="Yapı"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    multiline
                    name="topic"
                    component={TextField}
                    type="text"
                    label="Konu"
                  />
                </Grid>

                <ItemAddableField
                  buttonText="Soru Ekle"
                  id="questions"
                  push={push}
                  multiline={false}
                  placeholder="Soru İçeriği"
                />
                <ItemAddableField
                  buttonText="Ders Ekle"
                  id="lessons"
                  push={push}
                  multiline={true}
                />

                <ItemAddableField
                  buttonText="Alıntı Ekle"
                  id="quotes"
                  push={push}
                  multiline={false}
                  placeholder="Alıntı İçeriği"
                />

                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}

export default SummaryForm;
