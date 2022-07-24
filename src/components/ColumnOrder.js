import React, { useMemo } from 'react';
import { useColumnOrder, useTable } from 'react-table';
import { COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';
import './table.css';
 
const ColumnOrder = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    
    
    const tableInstance = useTable({
        columns,
        data
    }, 
    useColumnOrder);
    
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        setColumnOrder
    } = tableInstance;

    const changeOrder = () => {
        setColumnOrder([
            'id',
            'first_name',
            'last_name',
            'email',
            'gender'
        ])
    }

    return (
        <>
        <button onClick={changeOrder}>Change Column Order</button>
        <table {...getTableProps()} >
            <thead> 
              {headerGroups.map((headerGroup) => (
               <tr {...headerGroup.getFooterGroupProps()}>
                   {headerGroup.headers.map((column) => (
                       <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                   ))}
                   <th></th>
               </tr>
            ))}
            </thead>
            
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                {
                    footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map(column => (
                                    <td {...column.getFooterGroupProps}>
                                        {
                                            column.render('Footer')
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tfoot>
        </table>
        </>
    );
};

export default ColumnOrder;