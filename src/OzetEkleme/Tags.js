import { TextField, Button } from "@material-ui/core";

export default function TagContainer({ tagVal, setTagVal, addTag, tags }) {
  return (
    <div className="FieldContainerAdd">
      <h3> Etiketler </h3>
      {tags.length > 0 && (
        <div className="TagContainerAdd">
          {tags.map((tag) => (
            <div className="TagContainerItem">
              <span> {tag} </span>
              <Button variant="contained" type="button" onClick={addTag}>
                -
              </Button>
            </div>
          ))}
        </div>
      )}
      <TextField
        label="Etiket"
        type="text"
        value={tagVal}
        onChange={(e) => setTagVal(e.target.value)}
      />
      <Button variant="contained" color="dark" type="button" onClick={addTag}>
        +
      </Button>
    </div>
  );
}
