import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Form from "./Form";
import Schedule from "./Schedules";
import EndingPage from "./EndingPage";
import Loading from "../components/Loading";
import axios from "axios";

const Home = () => {
  const { url } = useParams();
  const [searchParams] = useSearchParams();
  const calendarToken = searchParams.get("token");

  const [page, setPage] = useState(1);
  const [isLoadingCandidate, setIsLoadingCandidate] = useState(false);
  const [tokenError, setTokenError] = useState(null);

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
  const [existingBooking, setExistingBooking] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get(
          `https://oneplace-hr-326159028339.asia-southeast1.run.app/v1/calendar/url/${url}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCalendarData();
  }, [url]);

  // Fetch candidate data if coming from interview invitation
  useEffect(() => {
    const fetchCandidateData = async () => {
      if (calendarToken && data) {
        setIsLoadingCandidate(true);
        try {
          const response = await axios.get(
            `https://oneplace-hr-326159028339.asia-southeast1.run.app/v1/assessment/player/by-token/${calendarToken}`
          );
          const candidateData = response.data;

          // Pre-fill form with candidate data
          setForm({
            firstName: candidateData.firstName || "",
            lastName: candidateData.lastName || "",
            age: candidateData.age || null,
            workTime: candidateData.workTime || "",
            address: candidateData.address || "",
            phone: candidateData.player?.phoneNumber || candidateData.phone || "",
            branchId: "",
            currentStatus: candidateData.currentStatus || "",
            mail: candidateData.player?.email || candidateData.email || "",
          });

          // Skip to schedule page (page 2)
          setPage(2);
        } catch (err) {
          console.error("Failed to fetch candidate data:", err);
          console.error("Error response:", err.response);
          console.error("Error status:", err.response?.status);
          console.error("Error data:", err.response?.data);
          console.error("Token used:", calendarToken);

          // Set error message based on response status
          if (err.response) {
            if (err.response.status === 404) {
              setTokenError("Invalid invitation link. Please contact HR for a new invitation.");
            } else if (err.response.status === 400) {
              setTokenError("Invalid invitation link format. Please use the link provided in your invitation.");
            } else {
              setTokenError(`Unable to load invitation details (${err.response.status}). Please try again or contact HR. Error: ${err.response?.data?.message || err.message}`);
            }
          } else {
            setTokenError("Connection error. Please check your internet connection and try again.");
          }
          // Stay on page 1 (form page) so user can enter manually
        } finally {
          setIsLoadingCandidate(false);
        }
      }
    };

    if (data) {
      fetchCandidateData();
    }
  }, [calendarToken, data]);

  // Check for existing booking
  useEffect(() => {
    const checkExistingBooking = async () => {
      if (calendarToken && data) {
        try {
          const response = await axios.get(
            `https://oneplace-hr-326159028339.asia-southeast1.run.app/v1/calendar/meeting/by-token/${calendarToken}`
          );

          if (response.data) {
            const booking = response.data;
            setExistingBooking(booking);
            setBookingId(booking.id);

            // Pre-populate the booking details
            setSelectedDate(booking.date);
            setSelectedTime(booking.startTime);
            setSelectedEndTime(booking.endTime);
          }
        } catch (err) {
          // No existing booking found or error - this is fine, user can create new booking
          console.log("No existing booking found or error fetching booking:", err);
        }
      }
    };

    if (data && calendarToken) {
      checkExistingBooking();
    }
  }, [calendarToken, data]);

  if (data === null || isLoadingCandidate) {
    return <Loading />;
  }

  return (
    <div>
      {/* Display error message if token validation failed */}
      {tokenError && (
        <div style={{
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          padding: '16px',
          margin: '20px',
          color: '#c33',
          textAlign: 'center'
        }}>
          <strong>⚠️ Error:</strong> {tokenError}
        </div>
      )}
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
          existingBooking={existingBooking}
          bookingId={bookingId}
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
