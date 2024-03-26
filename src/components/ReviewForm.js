import React, { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

export default function ReviewForm({
  className = "",
  initialValues = INITIAL_VALUES,
  initialPreview,
  onCancel,
  onSubmit,
  onSubmitSuccess,
}) {
  const t = useTranslate();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    let result = await onSubmitAsync(formData);
    if (!result) return;

    const { review } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(review);
  };

  return (
    <form className={`ReviewForm ${className}`} onSubmit={handleSubmit}>
      <FileInput
        name='imgFile'
        className='ReviewForm-preview'
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <div className='ReviewForm-rows'>
        <div className='ReviewForm-title-rating'>
          <input
            name='title'
            className='ReviewForm-title'
            value={values.title}
            onChange={handleInputChange}
            placeholder={t("title placeholder")}
          />
          <RatingInput
            name='rating'
            className='ReviewForm-rating'
            value={values.rating}
            onChange={handleChange}
          />
        </div>
        <textarea
          name='content'
          className='ReviewForm-content'
          value={values.content}
          onChange={handleInputChange}
          placeholder={t("content placeholder")}
        />
        <div className='ReviewForm-error-buttons'>
          <div className='ReviewForm-error'>
            {submittingError?.message && <div>{submittingError.message}</div>}
          </div>
          <div className='ReviewForm-buttons'>
            {onCancel && (
              <button className='ReviewForm-cancel-button' onClick={onCancel}>
                {t("cancel button")}
              </button>
            )}
            <button
              type='submit'
              className='ReviewForm-submit-button'
              disabled={isSubmitting}
            >
              {t("confirm button")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
