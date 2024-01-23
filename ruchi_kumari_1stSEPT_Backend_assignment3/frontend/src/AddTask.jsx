import React, { useEffect, useState } from 'react'   //importing react, useEffect, useState
import axios from 'axios'                          //importing axios

const AddTask = () => {                                 //creating a functionional component
    const [rendertask, setRendertask] = useState([]);

    const getData = async () => {                             //fetching data from server using async await method 
        try {
            const result = await fetch("http://localhost:5000/todoapp");
            const data = await result.json();        //converting result to json and saving it in data
            setRendertask(data);                     //setting data to rendertask using setRendertask useState function
        } catch (error) {
            console.log(error);        //if error occurs then log it
        }
    };
    useEffect(() => {                                         //fetching data
        getData();                     //calling getData function
    }, []);

    const deleteHandler = async (id) => {                            //creating a function for deleting data
        try {
            await axios.delete(`http://localhost:5000/todoapp/` + id)          // deleting data from server
            window.location.reload()                             //reloading the page
        } catch (err) {
            console.log(err);                                 //if error occurs then log it
        }
    }

    if (rendertask.length > 0) {                            // conditionally rendering task
        return (
            <>
                <ul>
                    {rendertask.map((t, i) => {                   //mapping task
                        return (
                            <li>
                                <div key={i} className=' my-20 mx-20 flex justify-between items-center bg-lime-600 rounded-sm'>
                                    <h2 className='text-white text-4xl m-4 text-bold '>{t.task}</h2>
                                    <p className='text-white italic text-lg m-4'>{t.descr}</p>
                                    {/* deleteHandler function is called when delete button is clicked */}
                                    <svg onClick={e => deleteHandler(t.id)} className='m-4' xmlns="http://www.w3.org/2000/svg" fill='maroon' height="34" width="34" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" /></svg>
                                </div>
                            </li>
                        )
                    })
                    }
                </ul>
            </>
        )
    }
    else {                     //if no task is added
        return (
            <div>
                <h2 className='text-lime-600 text-2xl m-20 flex justify-center p-4 text-center text-bold border-2 rounded-sm border-lime-600'>No Task Added yet 🙃</h2>
            </div>
        )
    }

}
export default AddTask            //exporting AddTask
