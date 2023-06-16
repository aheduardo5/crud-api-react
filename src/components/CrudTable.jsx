/* eslint-disable react/prop-types */
import { CrudTableRow } from "./CrudTableRow";

export const CrudTable = ({ data, deleteData, setDataToEdit, dataToEdit }) => {
  return (
    <div className="bg-light">
      <h3>Data Table</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Trainer</th>
            <th>Pokemon</th>
            <th className="d-flex justify-content-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((element) => (
              <CrudTableRow
                key={element.id}
                element={element}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
                dataToEdit={dataToEdit}
              />
            ))
          ) : (
            <tr>
              <td>No information</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
