import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Paper, Grid, Button, CssBaseline } from "@material-ui/core";
import axios from "axios";
import arrayMutators from "final-form-arrays";
import ItemAddableField from "../components/ItemAddableField";

let catUrl = "https://biozetapi.herokuapp.com/category?sort=category_id&asc";

const confCatData = (setter, response) => {
  setter(
    response.data.result.map((cat) => {
      return {
        key: cat.category_id,
        name: cat.name,
        id: cat.category_id,
      };
    })
  );
};

function BookForm({ authorData, ISBN, setBookInfo, setFormState }) {
  const [categories, setCat] = useState([]);
  useEffect(() => {
    axios
      .get(catUrl)
      .then((response) => {
        confCatData(setCat, response);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  const sendPost = async (values) => {
    axios
      .post("https://biozetapi.herokuapp.com/book", values, {})
      .then((response) => {
        console.log(response);
        setFormState(3);
        setBookInfo(response.data.result.data);
      })
      .catch((err) => console.error(err));
  };

  const onSubmit = async (values) => {
    values.category_id = values.category_id[0];
    await sendPost(values);
    window.alert(JSON.stringify(values, 0, 2));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Boş bırakılamaz!";
    } else if (values.name.trim().length < 3) {
      errors.name = "Böyle Olmaz!";
    }

    var expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!values.image_url) errors.image_url = "Boş bırakılamaz! ";
    else if (!values.image_url.match(regex)) errors.image_url = "format yanlış";
    /*if (catArr.length < 1)
      errors.category = "Çok az kategori (+ butonuna basmayı unutma!)";
    else if (catArr.length > 4)
      errors.category = "Çok fazla kategori (yeniden dene)";*/

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
        initialValues={{ isbn: ISBN, author_id: authorData.author_id }}
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
                    name="isbn"
                    component={TextField}
                    type="text"
                    label="ISBN"
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="author_id"
                    component={TextField}
                    type="text"
                    label="Yazar ID"
                    disabled={true}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    name="name"
                    component={TextField}
                    type="text"
                    label="Kitap Adı"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="image_url"
                    fullWidth
                    required
                    component={TextField}
                    type="url"
                    label="Kitap Kapak Görseli URL"
                  />
                </Grid>

                <ItemAddableField
                  buttonText="Kategori Ekle"
                  id="category_id"
                  push={push}
                  multiline={false}
                  categories={categories}
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

export default BookForm;
