import React, { useEffect, useState } from 'react';
import { getStravaActivities } from '../api';
import { scheduleActivities } from '../constants';

import BodyComp from '../components/bodyComp/'
import SimpleLineChart from '../components/charts/line';

const Training = () => {
  const [activities, setActivities] = useState([] as any);
  const [chartData, setChartData] = useState([] as any);
  const [tab, setTab] = useState("Schedule" as "Schedule" | "Activity" | "Analysis" | "Body Composition");
  const [totalMetrics, setTotalMetrics] = useState({
    distance: 0,
    time: 0,
    power: 0,
    cadence: 0,
    heartRate: 0,
    calories: 0,
    speed: 0,
  });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getStravaActivities();

        console.log(data);

        const activitiesHolder = [] as any;
        const chartDataTemp = [] as any;
        const metrics = {
          distance: 0,
          time: 0,
          power: 0,
          cadence: 0,
          heartRate: 0,
          hasCadence: 0,
          hasHeartrate: 0,
          calories: 0,
          speed: 0,
        }

        for (const activity of data) {
          if (activity.sport_type !== "VirtualRide" && activity.sport_type !== "Ride") continue;

          const dateOfWorkout = activity.start_date.split('T')[0];
          metrics.distance += activity.distance;
          metrics.time += activity.moving_time;
          metrics.power += activity.average_watts;
          metrics.calories += activity.kilojoules;
          metrics.speed += activity.average_speed;
          
          if (activity.average_cadence) {
            metrics.hasCadence++;
            metrics.cadence += activity.average_cadence;
          }
          if (activity.has_heartrate) {
            metrics.hasHeartrate++;
            metrics.heartRate += activity.average_heartrate;
          }

          activitiesHolder.push(activity);
          
          // If there is no object in powers with name == date of the workout, create one
          if (!chartDataTemp.find((data: any) => data.name === dateOfWorkout)) {
            chartDataTemp.push({
              name: dateOfWorkout,
              Power: activity.average_watts,
              Heartrate: activity.average_heartrate,
              Cadence: activity.average_cadence,
              Exertion: activity.suffer_score,
              Distance: activity.distance / 1000,
              Speed: activity.average_speed * 3.6,
            });
          }
        }

        setChartData(chartDataTemp.reverse());

        setTotalMetrics({
          distance: metrics.distance,
          time: metrics.time,
          power: metrics.power  / activitiesHolder.length,
          cadence: metrics.cadence  / metrics.hasCadence,
          heartRate: metrics.heartRate  / metrics.hasHeartrate,
          calories: metrics.calories,
          speed: metrics.speed  / activitiesHolder.length,
        });

        console.log(activitiesHolder);
        setActivities(activitiesHolder);
      } catch (error: any) {
        if (error.response && error.response.data.msg === 'Auth Timed Out.') {
          window.location.href = error.response.data.url
        }
        console.error('Error fetching activities:', error);
      }
    }

    fetchActivities();
  }, []);

  function formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  const tabElement = (tabLabel: string) => {
    return (
      <div 
        className={`${tabLabel === tab ? "border-[#443f3c]" : "border-white"} border-b-4 pb-1 px-2 cursor-pointer hover:border-[#443f3c]`}
        onClick={() => setTab(tabLabel as any)}
      >
        <h2 className="text-lg font-extrabold">{tabLabel}</h2>
      </div>
    )
  }

  const getDayOfWeek = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    return daysOfWeek[today.getDay()];
  };
  
  const dayOfWeek = getDayOfWeek();

  return (
    <div>
      <div className="bg-white w-full">
        <div className="container pt-12 mx-auto">
          <div className="flex gap-6">
            <img src="/me.png" alt="Me." className="h-36 w-40 object-cover rounded-2xl boxShadow" />

            <div className="flex flex-col gap-4 mt-auto">
              <h1 className="text-4xl font-extrabold">Daniel</h1>

              <div className="flex gap-4">
                <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                  <i className="fa-solid fa-road"></i><span>{(totalMetrics.distance / 1000).toFixed(1)}km</span>
                </div>

                <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                  <i className="fa-solid fa-stopwatch"></i><span>{formatTime(totalMetrics.time)}</span>
                </div>

                <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                  <i className="fa-solid fa-gauge-high"></i><span>{(totalMetrics.speed * 3.6).toFixed(1)}&nbsp;km/h</span>
                </div>

                <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                  <i className="fa-solid fa-dumbbell"></i><span>{totalMetrics.power.toFixed(0)}&nbsp;W</span>
                </div>

                <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                  <i className="fa-solid fa-clock-rotate-left"></i><span>{totalMetrics.cadence.toFixed(0)}&nbsp;RPM</span>
                </div>

                <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                  <i className="fa-solid fa-heart-pulse"></i><span>{totalMetrics.heartRate.toFixed(0)}&nbsp;BPM</span>
                </div>

                <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                  <i className="fa-solid fa-fire"></i><span>{totalMetrics.calories.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            {["Schedule", "Activity", "Analysis", "Body Composition"].map(tabElement)}
          </div>

        </div>
      </div>

      {tab === "Schedule" && (
        <div className="container my-8 mx-auto grid grid-cols-7 gap-4">
          {scheduleActivities.map((day: any) => (
            <div key={day.day} className="bg-white boxShadow">
              <div className={`${dayOfWeek === day.day ? "bg-green-700" : "bg-[#443f3c]"} text-white p-2`}>
                <h2 className="text-2xl font-extrabold text-center mb-2">{day.day}</h2>
              </div>
              <div className="activityRows">
                {day.activities.map((activity: any) => (
                  <div key={activity.name} className="p-2 border-b border-black">
                    <h3 className="font-bold">{activity.name}</h3>
                    <p className="text-sm">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>    
      )}

      {tab === "Analysis" && (
        <div className="container my-8 mx-auto grid grid-cols-2 gap-4">
          <div className="bg-white pb-4 pt-6 pr-6 boxShadow">
            <h2 className="text-2xl font-extrabold text-center mb-2">Power</h2>
            <SimpleLineChart chartData={chartData} keys={["Power"]} />
          </div>

          <div className="bg-white pb-4 pt-6 pr-6 boxShadow">
            <h2 className="text-2xl font-extrabold text-center mb-2">Speed (km/s)</h2>
            <SimpleLineChart chartData={chartData} keys={["Speed"]} />
          </div>

          <div className="bg-white pb-4 pt-6 pr-6 boxShadow">
            <h2 className="text-2xl font-extrabold text-center mb-2">Cadence</h2>
            <SimpleLineChart chartData={chartData.filter((data: any) => data.Cadence)} keys={["Cadence"]} />
          </div>

          <div className="bg-white pb-4 pt-6 pr-6 boxShadow">
            <h2 className="text-2xl font-extrabold text-center mb-2">Distance (km)</h2>
            <SimpleLineChart chartData={chartData} keys={["Distance"]} />
          </div>
        

          <div className="bg-white pb-4 pt-6 pr-6 boxShadow">
            <h2 className="text-2xl font-extrabold text-center mb-2">Heartrate</h2>
            <SimpleLineChart chartData={chartData.filter((data: any) => data.Heartrate)} keys={["Heartrate"]} />
          </div>

          <div className="bg-white pb-4 pt-6 pr-6 boxShadow">
            <h2 className="text-2xl font-extrabold text-center mb-2">Exertion</h2>
            <SimpleLineChart chartData={chartData.filter((data: any) => data.Exertion)} keys={["Exertion"]} />
          </div>
        </div>
      )}
      
      {tab === "Activity" && (
        <div className="container my-8 mx-auto flex flex-col bg-white boxShadow activityRows">
          {activities.map((activity: any) => (
            <div key={activity.id} className="flex items-center gap-6 border-b border-black p-4">
              <div>
                <i className="fa-solid fa-person-biking text-2xl"></i>
              </div>
              <div className="flex flex-col">
                <h2 className="font-extrabold text-xl">{activity.name}</h2>
                <div className="flex gap-2 mt-2">
                  <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                    <i className="fa-solid fa-road"></i><span>{(activity.distance / 1000).toFixed(1)}&nbsp;km</span>
                  </div>

                  <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                    <i className="fa-solid fa-stopwatch"></i><span>{formatTime(activity.moving_time)}</span>
                  </div>

                  <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                    <i className="fa-solid fa-gauge-high"></i><span>{(activity.average_speed * 3.6).toFixed(1)}&nbsp;km/h</span>
                  </div>

                  <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                    <i className="fa-solid fa-dumbbell"></i><span>{activity.average_watts.toFixed(0)}&nbsp;W</span>
                  </div>

                  {activity.average_cadence && (
                    <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                      <i className="fa-solid fa-clock-rotate-left"></i><span>{activity.average_cadence}&nbsp;RPM</span>
                    </div>
                  )}

                  {activity.has_heartrate && (
                    <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                      <i className="fa-solid fa-heart-pulse"></i><span>{activity.average_heartrate}&nbsp;BPM</span>
                    </div>
                  )}

                  <div className="bg-[#443f3c] text-white font-extrabold p-2 rounded-md text-sm text-center flex gap-2 items-center">
                    <i className="fa-solid fa-fire"></i><span>{activity.kilojoules.toFixed(0)}</span>
                  </div>
                </div>
              </div>
              <a href={`https://www.strava.com/activities/${activity.id}/analysis`} target="_blank" className="ml-auto text-white bg-[#fc5200] font-extrabold p-2 rounded-md text-sm">Strava&nbsp;&nbsp;<i className="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
          ))}
        </div>
      )}

      {tab === "Body Composition" && <BodyComp />}

    </div>
  );
}

export default Training;