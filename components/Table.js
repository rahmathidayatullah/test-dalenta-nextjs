import React from "react";

export default function Table() {
  return (
    <table className="border">
      <thead>
        <tr className="border">
          <th>No</th>
          <th>Head 1</th>
          <th>Head 2</th>
          <th>Head 3</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border">
          <td>1</td>
          <td>body 1</td>
          <td>body 2</td>
          <td>body 3</td>
        </tr>
        <tr className="border">
          <td>1</td>
          <td>body 1</td>
          <td>body 2</td>
          <td>body 3</td>
        </tr>
        <tr className="border">
          <td>1</td>
          <td>body 1</td>
          <td>body 2</td>
          <td>body 3</td>
        </tr>
      </tbody>
    </table>
  );
}
