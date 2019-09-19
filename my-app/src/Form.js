import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const NewUserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    console.log("this is touched", touched);
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);
 
    return (
        <div className="User-form">


          <h1>User Form</h1>
          <Form>
<div className="formholder">

<div className="formpart1">
            <Field type="text" name="userName" placeholder="Enter Name" className="user"/>
            {touched.userName && errors.userName && (
              <p className="error">{errors.userName}</p>
            )}
    
            <Field type="text" name="email" placeholder="Enter Email" className="userEmail"/>
            {touched.email && errors.email && <p className="error">{errors.email}</p>}

            <Field type="text" name="password" placeholder="Enter Password" className="userPw" />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}
            
    
            <label className="checkbox-container">
              Terms of Service
              <Field
                type="checkbox"
                name="termsofService"
                checked={values.termsofService}
              />
              <span className="checkmark" />
            </label>
 
            </div>
            
            <div className="formpart1">

            <Field type="text" name="age" placeholder="Enter Age" className="age" />
            {touched.age && errors.age && <p className="error">{errors.age}</p>}
             


            <Field component="select" className="rank" name="rank">
          <option>Please Choose your skill rank</option>
          <option value="noob">Noob</option>
          <option value="semi-Pro">Semi-Pro</option>
          <option value="pro">Pro</option>
            </Field>

            <Field className="note"
          component="textarea"
          type="text"
          name="note"
          placeholder="Notes"/>
          
            



            <button type="submit">Submit!</button>
            
            </div>

            </div>  

          </Form>

    

{users.map(user => (
<div className="notemade">
    <ul key={user.id}>
      <li>Name: {user.userName}</li>
      <li>Email: {user.email}</li>
      <li>Password: {user.password}</li>
      
      <li>Age: {user.age}</li>
      <li>Gamer Skill: {user.rank}</li>
      {/* p tag for notes */}
      <li>Notes: {user.note}</li>
    </ul>
    </div>
  ))}

    
          
        </div>
      );
};

const FormikUserForm = withFormik({
   
    mapPropsToValues({ userName, email, password, termsofService, info, rank, age}) {
      return {
          
        termsofService: termsofService || false,
        userName: userName || "",
        email: email || "",
        password: password || "",
        info: info || "",
        rank: rank || "",
        age: age || "",

      };
    },
  
    validationSchema: Yup.object().shape({
      userName: Yup.string().required("Enter a name, smartypants!"),
      email: Yup.string().required("Add an email"),
      password: Yup.string().required("Require Password!"),
      age: Yup.string().required("Tell me your age!"),
      
      
    }),
  
    handleSubmit(values, { setStatus }) {
      axios
        // values is our object with all our data on it.
        .post("https://reqres.in/api/users/", values)
        .then(res =>  {
          setStatus(res.data);
          
          
        })
        .catch(err => console.log(err.response));
    }
  })(NewUserForm);

  export default FormikUserForm;