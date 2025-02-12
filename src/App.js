import {
  BrowserRouter as Router,
  Route,
  Routes,
  data,
  useNavigate,
} from "react-router-dom";
import Schedule from "./page/Schedules";
import EndingPage from "./page/EndingPage";
import Form from "./page/Form";
import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: null,
    workTime: "",
    address: "",
    phone: "",
    sector: "",
    currentStatus: "",
  });
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [diffs, setDiffs] = useState(0);
  const [fullDate, setFullDate] = useState("");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Form form={form} setForm={setForm} />} />
          <Route
            path="/schedule"
            element={
              <Schedule
                form={form}
                selectedTime={selectedTime}
                selectedEndTime={selectedEndTime}
                setSelectedTime={setSelectedTime}
                setSelectedEndTime={setSelectedEndTime}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setDiffs={setDiffs}
                setFullDate={setFullDate}
              />
            }
          />
          <Route
            path="/ending"
            element={
              <EndingPage
                selectedTime={selectedTime}
                selectedEndTime={selectedEndTime}
                diffs={diffs}
                fullDate={fullDate}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
