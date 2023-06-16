/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Card } from "../UI/Card";

const initialForm = {
  id: null,
  trainername: "",
  pokename: "",
};

export const CrudForm = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
  db,
}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.trainername || !form.pokename) {
      return alert("Fill up the form");
    }

    const isDuplicate = db.some(
      (item) =>
        item.trainername === form.trainername && item.pokename === form.pokename
    );

    if (isDuplicate) {
      return alert("Trainer name and pokename can't be duplicated");
    }

    if (form.id != null) {
      updateData(form);
      handleReset();
    } else {
      createData(form);
      handleReset();
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <Card>
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            name="trainername"
            type="text"
            className="form-control"
            id="trainername"
            aria-describedby="nameHelp"
            onChange={handleChange}
            value={form.trainername}
            placeholder="Trainer name"
          />
        </div>
        <div className="mb-3">
          <input
            name="pokename"
            type="text"
            className="form-control"
            id="pokename"
            aria-describedby="pokenameHelp"
            value={form.pokename}
            onChange={handleChange}
            placeholder="Poke name"
          />
        </div>
        <div className="d-flex gap-2">
          <input type="submit" value="Submit" className="btn btn-primary" />
          <input
            type="reset"
            value="Reset"
            onClick={handleReset}
            className="btn btn-secondary"
          />
        </div>
      </form>
    </Card>
  );
};
