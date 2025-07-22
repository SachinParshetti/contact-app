// src/components/DeleteButton.jsx
import React from 'react';
import Swal from 'sweetalert2';


  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You can't undo this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
        // Call your delete function here
      }
    });
  };

  return <button onClick={handleDelete}>Delete Item</button>;

  

