import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./Form";
import Schedule from "./Schedules";
import EndingPage from "./EndingPage";
import Loading from "../components/Loading";
import axios from "axios";

const Home = () => {
  const { url } = useParams();
  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: null,
    workTime: "",
    address: "",
    phone: "",
    branchId: "",
    currentStatus: "",
    mail: "",
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [fullDate, setFullDate] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get(
          `https://oneplace-hr-326159028339.asia-southeast1.run.app/v1`
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCalendarData();
  }, [url]);

  if (data === null) {
    return <Loading />;
  }

  return (
    <div>
      {/* {console.log(data)} */}
      {page === 1 && (
        <Form form={form} setForm={setForm} setPage={setPage} data={data} />
      )}
      {page === 2 && (
        <Schedule
          form={form}
          selectedTime={selectedTime}
          selectedEndTime={selectedEndTime}
          setSelectedTime={setSelectedTime}
          setSelectedEndTime={setSelectedEndTime}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setFullDate={setFullDate}
          setPage={setPage}
          data={data}
        />
      )}
      {page === 3 && (
        <EndingPage
          selectedTime={selectedTime}
          selectedEndTime={selectedEndTime}
          fullDate={fullDate}
          data={data}
        />
      )}
    </div>
  );
};

export default Home;
