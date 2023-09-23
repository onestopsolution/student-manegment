import React from 'react';

const List = ({info, upcoming}) => {
    
    return (
        <ul >
        {iterate(info, upcoming)}
    </ul>
    );
};

export default List;
function iterate(data, flag){
    // const removePerson = id => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             fetch(`https://intern-first-server-farjanaakterlaila.vercel.app/student/${id._id}`, {
    //                 method: 'DELETE'
    //             })
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     if (data.deletedCount > 0) {
                         
    //                         Swal.fire(
    //                             'Deleted!',
    //                             'Your file has been deleted.',
    //                             'success'
    //                         )
    //             //                           const remaining = studentList.filter(toy => toy._id !== item._id);
    //             //   setStudentList(remaining);
    //                     }
    //                 })
    //         }
    //     })
    // }
    if (!data) return;
    const bgColor = flag ? { backgroundColor : "#ffe66d"} : {};
    return (
        <>
            {
                data.map( (person, index) => {
                   
                    return (
                        <li key={index}>
                            <div className=" flex" style={bgColor}>
                                <img src={person.Image} alt="img" />
                                <div className="title">
                                    <h3 className='name text-xl text-white font-bold'>{person.name}</h3>
                                    <h5 className="age text-white">{Old(person.brithday)} years</h5>
                                </div>
                                
                            </div>
                            
                        </li>
                    )
                })
            }
        </>
    )
}

// how old the person is
function Old(personAge){
    let year = new Date(personAge).getFullYear();
    let currentYear = new Date().getFullYear();
    
    let age = currentYear - year;
   return age;
}