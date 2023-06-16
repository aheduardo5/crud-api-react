import classes from "./Loader.module.css";

export const Loader = () => {
  const numRows = 5;
  const numColumns = 8;

  const generateTableRows = () =>
    Array.from({ length: numRows }, (_, rowIndex) => (
      <tr key={rowIndex}>
        {Array.from({ length: numColumns }, (_, colIndex) => (
          <td key={colIndex} className={classes.tgcly1}>
            <div className={classes.line}></div>
          </td>
        ))}
      </tr>
    ));

  return (
    <table className={`${classes.tg} d-flex justify-content-center`}>
      <tbody>
        <table className={`${classes.tg} d-flex justify-content-center`}>
          <tbody>{generateTableRows()}</tbody>
        </table>
      </tbody>
    </table>
  );
};
