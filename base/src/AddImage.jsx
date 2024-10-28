import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./utils/axiosIntance.js";

const AddImage = () => {
  const user = useSelector(state => state.user.userData);
  const [response, setResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('image', data.image[0]);
      formData.append('redirectionUrl', data.redirectionUrl || '');
      formData.append('priority', data.priority);

      const res = await axiosInstance.post("/add-image", formData);
      setResponse({
        success: true,
        message: res.data.message
      });
      reset();
    } catch (error) {
      setResponse({
        success: false,
        message: error.response.data
      });
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if(!user.isAdmin && !user.mentor_access?.includes("HOME_IMAGE")){
      navigate("/");
    }
  }, [user.isAdmin, user.mentor_access, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Add Image</h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Image *
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              {...register('image', { required: 'Image is required' })}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Redirection URL */}
          <div>
            <label htmlFor="redirectionUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Redirection URL
            </label>
            <input
              id="redirectionUrl"
              type="text"
              placeholder="/waits"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('redirectionUrl')}
            />
            {errors.redirectionUrl && (
              <p className="mt-1 text-sm text-red-600">
                {errors.redirectionUrl.message}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority *
            </label>
            <input
              id="priority"
              type="number"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('priority', {
                required: 'Priority is required',
                min: {
                  value: 1,
                  message: 'Priority must be at least 1'
                }
              })}
            />
            {errors.priority && (
              <p className="mt-1 text-sm text-red-600">
                {errors.priority.message}
              </p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isSubmitting ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {/* Response Message */}
        {response && (
          <p className={`mt-4 text-sm text-center ${
            response.success ? 'text-green-600' : 'text-red-600'
          }`}>
            {response.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddImage;