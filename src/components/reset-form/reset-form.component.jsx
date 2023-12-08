import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "../sign-up-form/sign-up-form.styles.scss";
import Button from "../button/button.component";
import { getAuth, updatePassword } from "firebase/auth";

const defaultFormFields = {
  password: "",
  confirmPassword: "",
};

const ResetForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, confirmPassword } = formFields;

  const auth = getAuth();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await updatePassword(auth.currentUser, password);
      // Update the current user state with the obtained user data
      await resetFormFields();
      await console.log("Password reset successful");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Want to reset your password?</h2>
      <span>Reset with the same passwords below</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Submit</Button>

        
      </form>
    </div>
  );
};

export default ResetForm;
