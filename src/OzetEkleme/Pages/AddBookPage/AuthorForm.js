import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Paper, Grid, Button, CssBaseline } from "@material-ui/core";
import axios from "axios";
import arrayMutators from "final-form-arrays";
import ItemAddableField from "./ItemAddableField";

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

function AuthorForm() {
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

  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    console.log(JSON.stringify(values, 0, 2));
    window.alert(JSON.stringify(values, 0, 2));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.authorName) {
      errors.authorName = "Boş bırakılamaz!";
    } else if (values.authorName.trim().length < 3) {
      errors.authorName = "Böyle Olmaz!";
    }

    var expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!values.cover_img) errors.cover_img = "Boş bırakılamaz! ";
    else if (!values.cover_img.match(regex)) errors.cover_img = "format yanlış";
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
                    name="authorId"
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
                    name="authorName"
                    component={TextField}
                    type="text"
                    label="Yazar Adı"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="cover_img"
                    fullWidth
                    required
                    component={TextField}
                    type="url"
                    label="Yazar Görseli URL"
                  />
                </Grid>

                <ItemAddableField
                  buttonText="Kategori Ekle"
                  id="categories"
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
                    Ekle
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

export default AuthorForm;
