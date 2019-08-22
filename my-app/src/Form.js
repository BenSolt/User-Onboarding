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
          <h1>Animal Form</h1>
          <Form>
            <Field type="text" name="species" placeholder="Species" />
            {touched.species && errors.species && (
              <p className="error">{errors.species}</p>
            )}
    
            <Field type="text" name="size" placeholder="Size" />
            {touched.size && errors.size && <p className="error">{errors.size}</p>}
    
            <Field component="select" className="food-select" name="food">
              <option>Please Choose an Option</option>
              <option value="herbivore">Herbivore</option>
              <option value="carnivore">Carnivore</option>
              <option value="omnivore">Omnivore</option>
            </Field>
    
            <label className="checkbox-container">
              Vaccinations
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
    
          {animals.map(animal => (
            <ul key={animal.id}>
              <li>Species: {animal.species}</li>
              <li>Size: {animal.size}</li>
              <li>Food: {animal.food}</li>
            </ul>
          ))}
        </div>
      );
};
