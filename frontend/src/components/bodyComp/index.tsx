import React, { useState, useEffect } from 'react';
import { getMeasurements } from '../../api';
import { itemsToMeasure } from '../../constants';

import MeasurementsModal from './measurementsModal';
import SimpleLineChart from '../charts/line';

interface Measurement {[key: string]: number | string}

const BodyComp = () => {
  const [measurementsModal, setMeasurementsModal] = useState(false);
  const [measurements, setMeasurements] = useState<Measurement[] | null>(null);
  const [valuesSetForToday , setValuesSetForToday] = useState(false);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const measurements = await getMeasurements();
        console.log(measurements)

        const today = formatDate(new Date());
        const measurementsForToday = measurements.filter((measurement: Measurement) => measurement.name === today);
        if (measurementsForToday.length === 0) {
          setValuesSetForToday(false);
        } else {
          setValuesSetForToday(true);
        }

        setMeasurements(measurements);
      } catch (error) {
        console.error('Error fetching measurements:', error);
      }
    };
    fetchMeasurements();
  }, []);

  return (
  <>
    {measurementsModal && <MeasurementsModal setModal={setMeasurementsModal} />}
    <div className="container my-8 mx-auto">
      {!valuesSetForToday && (
        <button 
          className="bg-green-700 text-white font-extrabold p-2 rounded-md text-lg w-full mb-4"
          onClick={() => setMeasurementsModal(true)}
        >
          <i className="fa-solid fa-circle-plus"></i>&nbsp;&nbsp;Add Today's Measurements
        </button>
      )}

      <div className="grid grid-cols-2 gap-6">
        {measurements && itemsToMeasure.map((item, index) => (
          <div className="bg-white pb-4 pt-6 pr-6 boxShadow">
            <h2 className="text-2xl font-extrabold ml-6 mb-2">{item.name}:&nbsp;{measurements[measurements.length - 1][item.name]}{item.unit}</h2>
            <SimpleLineChart chartData={measurements} keys={[item.name]} target={item.target} domain={item.domain} />
          </div>
        ))}
      </div>
    </div> 
  </>
  );
}

export default BodyComp;