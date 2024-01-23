import React, { useState } from 'react'          //importing react, useState
import AddTask from './AddTask';                 //importing AddTask

const Todopage = () => {                                 //creating a functionional component
  
    const [task, setTask] = useState("");                //using useState for task and description
    const [descr, setDescr] = useState("");           //initial value is set to null in both task and desc .


    const submitHandler = async (e) => {               //submitHandler function to submit task
        e.preventDefault();                          // prevent the page from refreshing immediately
       
        try {                                               //posting data to the server using async await method
            
            const body = { task, descr };     //creating body object with task and description
            const result = await fetch("http://localhost:5000/todoapp", {
                method: "POST",                        //using POST method
                headers: { "Content-Type": "application/json" },       
                body: JSON.stringify(body)                   //converting body to string
            });
            window.location = "/";
            if (result.status === 201) {                        //if status code is 201
                alert("Task Added Succcessfully !")
            }
        } catch (error) {
            console.log(error);
        }
        setTask("");
        setDescr("");           //setting task and description to empty after submission
    }
    return (
        <div className='bg-gray-800 font-sans h-full w-full'>

            <h1 className='text-6xl text-lime-600 italic text-center pt-9 pb-3 mb-6'>My To Do List</h1>

            <hr />
            {/* calling submitHandler function on form submit */}
            <form onSubmit={submitHandler}>     
                <div className='flex flex-row justify-center items-center p-6 m-3'>
                    <p className=" text-lime-600 text-2xl py-2 px-2 ">Enter Task :</p>
                    <input className="w-4/12 h-16 me-1 " type="text" value={task} onChange={(e) => {
                        setTask(e.target.value)
                    }} placeholder=" Add Task " required/> 
                     {/* input field for task */}
                    <input className="w-4/12 h-16 ms-1" type="text" value={descr} onChange={(e) => { setDescr(e.target.value) }} placeholder=" Add Description " required/>
                           {/* input field for description */}
                    <button className='text-white bg-lime-600 py-2 px-2 m-2 rounded-lg ' type="submit" value="submit"> Add Task</button>
                </div>
            </form>
            <hr />
                <div className='h-screen w-screen'>   
                    <ul>     
                    {/* rendering AddTask component  */}
                        <AddTask />     
                    </ul>
                </div>
        </div>
    )
}

export default Todopage;     //exporting Todopage
