import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import Table from './Table'
import TableFilter from './TableFilter'

import { useFetch } from '../Hooks/useFetch'


export default function ListUsers() {

    const { data: users, loading, err } = useFetch('https://reqres.in/api/users');
    console.log(users);
    
    const navigate = useNavigate()
    // useEffect(() => {
    //     fetch('https://reqres.in/api/users')
    //         .then(res => res.json())
    //         .then(json => {
    //             setData(json);
    //             console.log(json.data);
    //         })


    // }, [data])

    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length
        return (<input value={filterValue || ''} onChange={e => { setFilter(e.target.value || undefined) }} placeholder={`Search ${count} record...`} />)
    }

    const SelectColumnFilter = ({
        column: { filterValue, setFilter, preFilteredRows, id },
    }) => {
        // Calculate the options for filtering
        const options = React.useMemo(() => {
            const options = new Set();
            preFilteredRows.forEach(row => {
                options.add(row.values[id]);
            });
            return [...options.values()];
        }, [id, preFilteredRows]);

        // Render a multi-select box
        return (
            <select
                value={filterValue}
                onChange={e => {
                    setFilter(e.target.value || undefined);
                }}
            >
                <option value="">All</option>
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        );
    };
    const columns = React.useMemo(
        () => [
            {
                Header: 'Số thứ tự',
                id: 'index', // Bắt buộc phải có một id duy nhất cho mỗi cột
                Cell: ({ row }) => <div>{row.index + 1}</div>, // Hiển thị số thứ tự
            },
            {
                Header: 'email',
                accessor: 'email',
                Filter: DefaultColumnFilter,
            },
            {
                Header: 'lastname',
                accessor: 'last_name',
                Filter: SelectColumnFilter,
            },
            {
                Header: 'firstname',
                accessor: 'first_name',
            },
            {
                Header: 'Avatar',
                accessor: 'avatar',
                Cell: ({ cell: { value } }) => (
                    <img src={value} alt="avatar" style={{ height: '50px', borderRadius: '50%' }} />
                ),
                Filter: false
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <button className='btn btn-warning' onClick={() => handleNavigation(row.original.id)}>Xem chi tiết</button>
                ),
            },
        ],
        []
    );


    const handleNavigation = (id) => {
        console.log(id);
        navigate(`/user/${id}`);
    };
    return (
        <div>
            {loading ? <p>Loading...</p> : <p>{JSON.stringify(users)}</p>}
            {/* <button onClick={getUser}>Get</button> */}
            {/* <table class="table">
                <thead>
                    <tr>
                        <th scope="col">lastname</th>
                        <th scope="col">firstname</th>
                        <th scope="col">email</th>
                        <th scope="col">phone</th>
                        <th scope="col">Xem chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).length > 0 ? (
                        data.data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.last_name}</td>
                                <td>{item.first_name}</td>
                                <td>{item.email}</td>
                                <td><img src={item.avatar} alt="" /></td>
                                <td>
                                    <button onClick={() => handleNavigation(item.id)} className='btn'>Go to User</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No data available</td>
                        </tr>
                    )}


                </tbody>
            </table> */}

            <div>
                {users.length > 0 ? <TableFilter columns={columns} data={users} />
                    : null}
            </div>

        </div>
    )
}
