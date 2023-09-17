import { useState } from "react";

export const useForm = (initialSate = {}, submit = () => {}) => {
  const [formData, setFormData] = useState(initialSate);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  /**
   * Handles updating a form input using the inputs
   * name property and value.
   */
  const handleInputChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  /**
   * Handles form submission. If any errors are thrown, they
   * will be caught and surfaced to the consumer form.
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();

    setFormLoading(true);

    try {
      submit();
    } catch (error) {
      setFormError(error.message);
      setFormLoading(false);
    }
  };

  return {
    formData,
    formError,
    formLoading,
    handleInputChange,
    handleSubmit,
  };
};
