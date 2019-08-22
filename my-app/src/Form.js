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

            <Field type="text" name="info" placeholder="Enter Info" className="userPw" />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}


            <Field component="select" className="rank" name="rank">
          <option>Please Choose an Option</option>
          <option value="noob">Noob</option>
          <option value="semi-Pro">Semi-Pro</option>
          <option value="pro">Pro</option>
            </Field>

            <Field
          component="textarea"
          type="text"
          name="notes"
          placeholder="Notes"
        />



            <button type="submit">Submit!</button>
          </Form>
    
          {users.map(user => (
            <ul key={user.id}>
              <li>Name: {user.userName}</li>
              <li>Email: {user.email}</li>
              <li>Password: {user.password}</li>
            </ul>
          ))}
        </div>
      );
};

const FormikUserForm = withFormik({
    // object destructuring. We could do values.species but we are destructuring it so we can just put species. You see the same thing in Props a lot so in stead of props.values you would see {values}
    mapPropsToValues({ userName, email, password, termsofService }) {
      return {
          
        termsofService: termsofService || false,
        userName: userName || "",
        email: email || "",
        password: password || ""
      };
    },
  
    validationSchema: Yup.object().shape({
      userName: Yup.string().required("Enter a name, smartypants!"),
      email: Yup.string().required("Add an email"),
      password: Yup.string().required("Require Password!"),

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