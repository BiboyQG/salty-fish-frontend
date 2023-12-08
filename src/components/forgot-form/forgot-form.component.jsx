import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "../sign-up-form/sign-up-form.styles.scss";
import Button from "../button/button.component";
import { forgotPassword } from "../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
};

const ForgotForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await forgotPassword(email);
      // Update the current user state with the obtained user data
      await resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Can not create user, email already in use");
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Forgot your password?</h2>
      <span>Fill in your email and we can send you the reset link</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ForgotForm;
