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
        <div className="animal-form">
          <h1>User Form</h1>
          <Form>
            <Field type="text" name="userName" placeholder="Enter Name" />
            {touched.userName && errors.userName && (
              <p className="error">{errors.userName}</p>
            )}
    
            <Field type="text" name="Email" placeholder="Enter Email" />
            {touched.email && errors.email && <p className="error">{errors.email}</p>}

            <Field type="text" name="Password" placeholder="Enter Password" />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}
            
    
            {/* <Field component="select" className="food-select" name="food">
              <option>Please Choose an Option</option>
              <option value="herbivore">Herbivore</option>
              <option value="carnivore">Carnivore</option>
              <option value="omnivore">Omnivore</option>
            </Field> */}
    
            <label className="checkbox-container">
              Terms of Service
              <Field
                type="checkbox"
                name="vaccinations"
                checked={values.vaccinations}
              />
              <span className="checkmark" />
            </label>
    
            <Field
              component="textarea"
              type="text"
              name="notes"
              placeholder="Notes"
            />
            {touched.notes && errors.notes && (
              <p className="error">{errors.notes}</p>
            )}
    
            <button type="submit">Submit!</button>
          </Form>
    
          {animals.map(user => (
            <ul key={user.id}>
              <li>Name: {user.name}</li>
              <li>Email: {user.email}</li>
              <li>Password: {user.password}</li>
            </ul>
          ))}
        </div>
      );
};

const FormikUserForm = withFormik({
    // object destructuring. We could do values.species but we are destructuring it so we can just put species. You see the same thing in Props a lot so in stead of props.values you would see {values}
    mapPropsToValues({ name, email, password, vaccinations }) {
      return {
          
        vaccinations: vaccinations || false,
        name: name || "",
        email: email || "",
        password: password || ""
      };
    },
  
    validationSchema: Yup.object().shape({
      name: Yup.string().required("You silly!!!"),
      email: Yup.string().required(),
      password: Yup.string()

    }),
  
    handleSubmit(values, { setStatus }) {
      axios
        // values is our object with all our data on it.
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          setStatus(res.data);
        })
        .catch(err => console.log(err.response));
    }
  })(AnimalForm); // currying functions in Javascript
  // console.log("This is the HOC", FormikAnimalForm)
  export default FormikUserForm;