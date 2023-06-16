import { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import { Loader } from "./Loader";
import { Message } from "./Message";

let api = helpHttp();
let url = `http://localhost:3001/pokemon_trainer`;

export const CrudApi = () => {
  const [db, setDb] = useState();
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    api.get(url).then((resp) => {
      if (!resp.err) {
        setDb(resp);
        setError(null);
      } else {
        setDb(null);
        setError(resp);
      }
    });
    setLoading(false);
  }, []);

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    data.id = Date.now();
    api.post(url, options).then((resp) => {
      if (!resp.err) {
        setDb([resp, ...db]);
      } else {
        setError(resp);
      }
    });
  };

  const updateData = (data) => {
    const endPoint = `${url}/${data.id}`;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.put(endPoint, options).then((resp) => {
      if (!resp.err) {
        let newData = db.map((element) =>
          element.id === data.id ? data : element
        );
        console.log(newData);
        setDb(newData);
      } else {
        setError(resp);
      }
    });
  };

  const deleteData = (id) => {
    const isDelete = confirm(
      `Are you sure to delete the item with the id: ${id}?`
    );
    if (isDelete) {
      let options = {
        headers: { "content-type": "application/json" },
      };
      const endPoint = `${url}/${id}`;
      api.del(endPoint,options).then(resp =>{
        if (!resp.err) {
          setDb(db.filter((element) => element.id !== id));
        } else {
          setError(resp);
        }
      });
    } else {
      return;
    }
  };
  return (
    <div className="container">
      <h1>CRUD API</h1>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        db={db}
      />

      <hr />
      {loading && <Loader />}
      {error && <Message error={error} />}
      {!error && db && (
        <CrudTable
          data={db}
          deleteData={deleteData}
          setDataToEdit={setDataToEdit}
          dataToEdit={dataToEdit}
        />
      )}
    </div>
  );
};
