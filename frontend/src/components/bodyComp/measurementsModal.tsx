import React, { useState, useEffect } from 'react';
import { uploadMeasurements } from '../../api';
import { itemsToMeasure } from '../../constants';

const MeasurementsModal = ({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formValues = {} as { [key: string]: number };
    
    // Iterate over the form elements
    Array.from(e.currentTarget.elements).forEach((element) => {
      if (element instanceof HTMLInputElement) formValues[element.name] = parseFloat(element.value);
    });
  
    // Log the form values to the console
    console.log(formValues);
    
    // Upload the measurements to the server
    try {
      await uploadMeasurements(formValues);
    } catch (error) {
      console.error('Error uploading measurements:', error);
      alert('An error occurred while uploading the measurements.');
    }
  };

  return (
    <div className="modal-parent">
      <div className="modal">
        <h2 className="text-center font-extrabold text-xl">Add Today's Measurements</h2>

        <form className="mt-8 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {itemsToMeasure.map((item, index) => (
            <div key={index}>
              <label className="ml-1" htmlFor={item.name}>{item.name}:</label>
              <input 
                className="measurement-input" 
                type="number" 
                id={item.name} 
                name={item.name} 
                step="0.01" 
              />
            </div>
          ))}

          <button className="bg-green-700 text-white font-extrabold p-2 rounded-md text-lg w-full col-span-2" type="submit">
            <i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;Add Measurements
          </button>
        </form>

        <button className="bg-red-700 text-white font-extrabold p-2 rounded-md text-lg w-full mt-4" onClick={() => setModal(false)}>
          <i className="fa-solid fa-xmark"></i>&nbsp;&nbsp;Close
        </button>
      </div>
    </div> 
  );
}

export default MeasurementsModal;