import { TextField, Button, Checkbox, Paper, Grid } from "@material-ui/core";

export default function ISBNForm({ onSubmit, setISBN }) {
    return (
      <form
        onSubmit={onSubmit}
        style={{
          backgroundColor: "white",
          width: "50%",
          borderRadius: "10px",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: "10px",
        }}
      >
        <TextField
          label="ISBN"
          type="text"
          name="ISBN"
          onChange={(e) => setISBN(e.target.value)}
        />
        <Button color="primary" type="submit">
          Kitabı Bul
        </Button>
      </form>
    );
  }
  