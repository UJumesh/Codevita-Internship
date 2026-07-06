import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

function UserForm({ onUserAdded }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });


  const addUser = async () => {

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }


    try {

      const response = await fetch(
        "http://localhost:5000/api/users",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );


      const data = await response.json();


      console.log(data);


      setFormData({
        name: "",
        email: "",
        password: ""
      });


      if(onUserAdded){
        onUserAdded();
      }


      alert("User added successfully!");

    } 
    catch(error){

      console.error(error);
      alert("Backend connection failed");

    }

  };


  return (

    <div className="user-form">


      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e)=>
          setFormData({
            ...formData,
            name:e.target.value
          })
        }
      />


      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e)=>
          setFormData({
            ...formData,
            email:e.target.value
          })
        }
      />


      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e)=>
          setFormData({
            ...formData,
            password:e.target.value
          })
        }
      />


      <button onClick={addUser}>
        <FaPlusCircle/>
        <span>Add User</span>
      </button>


    </div>

  );
}


export default UserForm;