import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import arrayMutators from "final-form-arrays";
import { Paper, Grid, Button, CssBaseline } from "@material-ui/core";
import ItemAddableField from "../components/ItemAddableField";
import { FlashOnOutlined } from "@material-ui/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SummaryForm({ authorData, bookInfo }) {
  const history = useHistory();

  const sendPost = async (values) => {
    axios
      .post("https://biozetapi.herokuapp.com/summary", values, {})
      .then((response) => {
        console.log(response);
        history.push("/ozet/" + response.data.result.data.summary_id);
      })
      .catch((err) => console.error(err));
  };
  const onSubmit = async (values) => {
    const data = {
      book: bookInfo.isbn,
      summary_id: bookInfo.summary_id,
      writer_id: "not-found",
      content: values,
    };

    sendPost(data);
    window.alert(JSON.stringify(data, 0, 2));
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
        initialValues={{}}
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
                <GridTextField
                  name="structure"
                  label="Yapı"
                  fullWidth={true}
                  multiline={true}
                />

                <GridTextField
                  name="topic"
                  label="Konu"
                  fullWidth={true}
                  multiline={true}
                />

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

function GridTextField({
  name,
  label,
  fullWidth = false,
  disabled = false,
  multiline = false,
}) {
  return (
    <Grid item xs={12}>
      <Field
        fullWidth={fullWidth}
        multiline={multiline}
        required
        name={name}
        component={TextField}
        type="text"
        label={label}
        disabled={disabled}
      />
    </Grid>
  );
}

export default SummaryForm;
