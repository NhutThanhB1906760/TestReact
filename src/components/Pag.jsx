import React, { useState, useEffect } from 'react';

const Pag = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async (n) => {
      const response = await fetch(`https://reqres.in/api/users?page=${n}`);
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.total_pages);
      console.log(data);
    };

    fetchData(page);
  }, [page]);

  // Get the current page data
//   const currentPageData = data.slice((page - 1) * perPage, page * perPage);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);

    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <h1>Pagination Example</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <img src={user.avatar} alt="avatar" style={{ height: '50px', borderRadius: '50%' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pag;
