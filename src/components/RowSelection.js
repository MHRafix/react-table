import React, { useMemo } from 'react';
import { useRowSelect, useTable } from 'react-table';
import { CheckBox } from './CheckBox';
import { COLUMNS } from './columns';
import MOCK_DATA from './MOCK_DATA.json';
import './table.css';
 
const RowSelection = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    
    
    const tableInstance = useTable({
        columns,
        data
    }, 
    useRowSelect, (hooks) => {
        hooks.visibleColumns.push((column) => {
            return [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps}) => (
                        <CheckBox  {...getToggleAllRowsSelectedProps} />
                    ),
                    Cell: ({row}) => (
                        <CheckBox {...row.getToggleAllRowsSelectedProps} />
                    )
                },
                ...columns
            ]
        })
    });
    
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        selectedFlatRows,
        prepareRow,
    } = tableInstance;

    const firstPageRows = rows.slice(0, 10);

    return (
        <>
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
                {firstPageRows.map(row => {
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
        <pre>
            <code>
                {JSON.stringify(
                    {
                        selectedFlatRows: selectedFlatRows.map((row) => row.original),
                    },
                    null,
                    2
                )}
            </code>
        </pre>
        </>
    );
};

export default RowSelection;