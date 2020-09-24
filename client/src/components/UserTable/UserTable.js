import React from 'react';
import { Table, Button } from 'reactstrap';

function UserTable({ columns, rows, fetchProducts }) {
  return (
    <Table>
      <thead>
        <tr>
          {columns.map((col, i) => <th key={i}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows && rows.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>
              <Button onClick={() => fetchProducts(user)}>Show Products</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UserTable;