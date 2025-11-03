import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { LuClock3 } from "react-icons/lu";
import { MdOutlineLocationOn } from "react-icons/md";
import "dayjs/locale/mn";
import { CiCalendar } from "react-icons/ci";
import "dayjs/locale/en";

import { IoArrowBack } from "react-icons/io5";
import axios from "axios";

dayjs.locale("mn");

const ScheduleCalendar = ({
  form,
  selectedTime,
  setSelectedTime,
  selectedEndTime,
  setSelectedEndTime,
  selectedDate,
  setSelectedDate,
  setFullDate,
  data,
  setPage,
  existingBooking,
  bookingId,
}) => {
  const [modal, setModal] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [load, setLoad] = useState(false);

  const [currentDate, setCurrentDate] = useState(() => {
    // If there's an existing booking, start at that month
    if (selectedDate) {
      console.log("📆 Setting initial calendar month to:", selectedDate);
      return dayjs(selectedDate);
    }
    return dayjs();
  });
  const [daysData, setDaysData] = useState({});
  const daysInMonth = currentDate.daysInMonth();
  const startDay = (currentDate.startOf("month").day() + 6) % 7;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const modalOverlayRef = useRef(null);
  const isMobile = window.innerWidth <= 480;

  // Debug: Log received props
  useEffect(() => {
    console.log("🎯 Schedules component mounted/updated with props:", {
      existingBooking,
      bookingId,
      selectedDate,
      selectedTime,
      selectedEndTime
    });
  }, [existingBooking, bookingId, selectedDate, selectedTime, selectedEndTime]);

  useEffect(() => {
    console.log("📊 Setting daysData from availability:", data.availability);
    setDaysData(data.availability);
  }, [data]);

  // Load available times for pre-selected date from existing booking or when date changes
  useEffect(() => {
    console.log("🕐 Loading times for selected date:", {
      selectedDate,
      hasDaysData: !!daysData,
      daysDataKeys: Object.keys(daysData || {}),
      isExistingBooking: !!existingBooking
    });

    if (selectedDate && daysData && Object.keys(daysData).length > 0) {
      const availableTimes = daysData[selectedDate] || [];
      console.log("⏰ Available times for selected date:", selectedDate, availableTimes);

      if (availableTimes.length > 0) {
        setSelectedTimes(availableTimes);
      } else {
        console.warn("⚠️ No available times found for date:", selectedDate);
      }
    }
  }, [selectedDate, daysData, existingBooking]);

  const calculateEndTime = () => {
    if (selectedTime && data.duration) {
      const currentDate = selectedDate;

      const fullDateString = `${currentDate}T${selectedTime}`;

      const selectedDates = new Date(fullDateString);

      if (isNaN(selectedDates)) {
        console.error("Invalid date format:", fullDateString);
        return;
      }

      selectedDates.setMinutes(selectedDates.getMinutes() + data.duration);
      console.log("Updated Date", selectedDates);

      const hours = String(selectedDates.getHours()).padStart(2, "0");
      const minutes = String(selectedDates.getMinutes()).padStart(2, "0");

      setSelectedEndTime(`${hours}:${minutes}`);
    }
  };

  useEffect(() => {
    if (selectedTime) {
      calculateEndTime();
    }
  }, [selectedTime, data.duration]);

  const fullDate = dayjs(selectedDate)
    .locale("mn")
    .format(isMobile ? "M сарын D, YYYY" : "dddd, MM/DD/YYYY");
  setFullDate(fullDate);

  const selectedWeekday = dayjs(selectedDate).locale("mn").format("dddd");

  const changeMonth = (direction) => {
    if (direction === "prev" && currentDate.month() === 0) {
      setCurrentDate((prev) => prev.subtract(1, "year").month(11));
      return;
    }
    setCurrentDate((prev) =>
      direction === "next" ? prev.add(1, "month") : prev.subtract(1, "month")
    );
  };

  const handleClickOutside = (e) => {
    if (modalOverlayRef.current && modalOverlayRef.current === e.target) {
      setModal(false);
    }
  };

  useEffect(() => {
    if (modal) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [modal]);

  const createMeeting = () => {
    setLoad(true);

    const datas = {
      calendarId: data.id,
      date: selectedDate,
      startTime: selectedTime.slice(0, 5),
      endTime: selectedEndTime,
      talent: { ...form },
    };

    // Check if updating existing booking or creating new one
    const apiCall = bookingId
      ? axios.put(
          `https://oneplace-hr-326159028339.asia-southeast1.run.app/v1/calendar/meeting/${bookingId}`,
          datas
        )
      : axios.post(
          "https://oneplace-hr-326159028339.asia-southeast1.run.app/v1/calendar/meeting/booking",
          datas
        );

    apiCall
      .then(() => {
        setPage(3);
        setModal(false);
      })
      .catch((error) => {
        console.log(error);
        setLoad(false);
      })
      .finally(() => {
        setLoad(false);
      });
  };

  return (
    <div className="w-full h-screen md:flex md:items-center md:justify-center relative">
      {existingBooking && (
        <div className="fixed top-0 left-0 right-0 bg-blue-100 border-b-2 border-blue-500 px-4 py-3 z-50">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-blue-800 text-sm md:text-base font-medium">
              Та өмнө {dayjs(existingBooking.date).format("YYYY-MM-DD")} өдөр {existingBooking.startTime} цагт цаг авсан байна. Та цагаа өөрчлөх боломжтой.
            </p>
          </div>
        </div>
      )}
      <div className={`md:border md:rounded-3xl flex flex-col sm:flex-col md:flex-row items-start md:h-[600px] md:border-[#000] md:border-opacity-10 overflow-hidden ${existingBooking ? 'mt-16' : ''}`}>
        <div className="py-8 md:px-7 px-5 md:bg-white bg-[#1D7AFF] w-full">
          <div>
            {!isMobile || selectedDate === null ? (
              <div className="flex items-center gap-2 md:block mb-2.5 md:mb-0">
                {data.companyName === "Burger king" && (
                  <img
                    className="mb-2 md:w-[56px] md:h-[56px] h-[40px] w-[40px]"
                    src="/img/burgerking.svg"
                    alt="logo"
                  />
                )}
                <p className="text-[#fff] md:text-[#1A1A1A] text-base md:text-[20px] font-semibold md:mb-6 text-nowrap">
                  {data.companyName} ажлын ярилцлага{" "}
                </p>
              </div>
            ) : (
              <div className="flex justify-center relative">
                <div
                  onClick={() => {
                    setSelectedDate(null);
                  }}
                  className="w-[40px] h-[40px] bg-[#fff] bg-opacity-10 text-[#fff] rounded-full absolute left-0 top-0 flex items-center justify-center cursor-pointer"
                >
                  <IoArrowBack className="text-2xl" />
                </div>
                <div className="text-center">
                  <p className="text-[#FFF] text-lg mb-1">{fullDate}</p>
                  <p className="text-[#fff] mb-2.5 text-opacity-80">
                    {selectedWeekday}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 mb-3">
              <LuClock3 className="text-[#fff] md:text-[#1A1A1A] text-opacity-80 md:text-opacity-60" />
              <p className="text-[#fff] md:text-[#1A1A1A] text-opacity-80 md:text-opacity-60 text-sm">
                {data.duration} минут{" "}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineLocationOn className="text-[#fff] md:text-[#1A1A1A] text-opacity-80 md:text-opacity-60" />
              <p className="text-[#fff] md:text-[#1A1A1A] text-opacity-80 md:text-opacity-60 text-sm">
                {data.address}
              </p>
            </div>
          </div>
        </div>

        {selectedDate === null && (
          <div className="w-[2px] h-full bg-[#000] bg-opacity-10 md:block hidden"></div>
        )}

        {isMobile === false || selectedDate === null ? (
          <div className="md:max-w-full w-full h-full  md:mx-auto bg-[#fff] rounded-lg px-3 mt-8 md:py-8 md:px-7">
            <p className="text-[#1A1A1A] text-[20px] mb-6 font-semibold">
              Боломжтой өдрөө сонгоно уу.
            </p>

            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => changeMonth("prev")}
                disabled={
                  currentDate.year() === dayjs().year() &&
                  currentDate.month() === dayjs().month()
                }
                className={`rounded-full md:w-[40px] md:h-[40px] h-[30px] w-[30px] flex items-center justify-center text-xl hover:bg-opacity-40 ${
                  currentDate.year() === dayjs().year() &&
                  currentDate.month() === dayjs().month()
                    ? "text-[#1A1A1A9C] cursor-not-allowed text-opacity-60"
                    : "bg-[#0069FF] text-[#0069FF] bg-opacity-[8%]"
                }`}
              >
                <IoIosArrowBack />
              </button>
              <p className="text-[#1A1A1A]">
                {currentDate.format("MMMM YYYY")}
              </p>
              <button
                onClick={() => changeMonth("next")}
                className="bg-[#0069FF] bg-opacity-[8%] rounded-full md:w-[40px] md:h-[40px] h-[30px] w-[30px] flex items-center justify-center text-[#0069FF] text-xl hover:bg-opacity-40"
              >
                <IoIosArrowForward />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs md:text-sm font-medium">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className={`${
                    day === "Sun" || day === "Sat"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={i}></div>
              ))}
              {daysArray.map((day) => {
                const clickedDate = currentDate.clone().date(day);
                const formattedDate = clickedDate.format("YYYY-MM-DD");
                const availableTimes = daysData[formattedDate] || [];
                const isAvailable = availableTimes.length > 0;
                const isSelected = selectedDate === formattedDate;
                const isExistingBookingDate = existingBooking && existingBooking.date === formattedDate;

                return (
                  <div
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedDate(formattedDate);
                        setSelectedTimes(availableTimes);
                      }
                    }}
                    key={day}
                    className={`px-3 py-2.5 w-[38px] md:w-[44px] h-[38px] md:h-[44px] flex items-center justify-center rounded-full cursor-pointer relative ${
                      isAvailable
                        ? isSelected
                          ? "bg-[#0069FF] text-[#fff]"
                          : "bg-[#0069FF] text-[#0069FF] bg-opacity-[8%]"
                        : "text-[#1A1A1A] opacity-60 cursor-not-allowed"
                    } ${isExistingBookingDate && !isSelected ? "ring-2 ring-green-500" : ""}`}
                  >
                    <p className="text-center">{day}</p>
                    {isExistingBookingDate && !isSelected && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="pt-10 px-6 w-full">
            <p className="text-[#1A1A1A] text-[20px] mb-8">
              Боломжтой цаг сонгоно уу.
            </p>
            <div className="h-[50vh]  overflow-y-auto ">
              <div className="flex flex-col gap-2">
                {selectedTimes.map((time, index) => (
                  <div className="w-full flex items-center gap-3" key={index}>
                    <button
                      onClick={() => {
                        setSelectedTime(time);
                      }}
                      className={`rounded-lg text-[#0069FF]  text-center py-2 font-semibold hover:bg-[#0069FF] hover:bg-opacity-40 ${
                        selectedTime === time
                          ? "w-[50%] bg-[#F9F9F9]"
                          : "w-full border border-[#0069FF] "
                      }`}
                    >
                      {time.slice(0, 5)}
                    </button>
                    {time === selectedTime ? (
                      <button
                        onClick={() => {
                          setModal(true);
                        }}
                        className="bg-[#0069FF] w-[50%] text-center py-2 text-[#fff] rounded-lg hover:bg-opacity-80"
                      >
                        Сонгох
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedDate !== null && !isMobile && (
          <div className="w-[2px] h-full bg-[#000] bg-opacity-10"></div>
        )}
        {!isMobile && selectedDate && (
          <div className="mt-6 pb-8 pt-[84px] px-7 md:block hidden">
            <p className="text-[#737373] mb-6">
              {dayjs(selectedDate).format("dddd, MM/DD")}
            </p>

            <div className="h-[400px] overflow-y-auto ">
              <div className="flex flex-col gap-2">
                {selectedTimes.map((time, index) => (
                  <div
                    className="w-[200px] flex items-center gap-3"
                    key={index}
                  >
                    <button
                      onClick={() => {
                        setSelectedTime(time);
                      }}
                      className={`rounded-lg text-[#0069FF]  text-center py-2 font-semibold hover:bg-[#0069FF] hover:bg-opacity-40 ${
                        selectedTime === time
                          ? "w-[50%] bg-[#F9F9F9]"
                          : "w-full border border-[#0069FF] "
                      }`}
                    >
                      {time.slice(0, 5)}
                    </button>
                    {time === selectedTime ? (
                      <button
                        onClick={() => {
                          setModal(true);
                        }}
                        className="bg-[#0069FF] w-[50%] text-center py-2 text-[#fff] rounded-lg hover:bg-opacity-80"
                      >
                        Сонгох
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {modal && (
        <div
          ref={modalOverlayRef}
          className="w-full h-screen fixed bg-[#000] bg-opacity-40 flex items-center justify-center top-0 left-0"
        >
          <div className="bg-[#fff] rounded-xl p-6 max-w-[90%]">
            <p className="text-[#1A1A1A] text-[20px] font-semibold mb-2">
              {data.companyName} ажлын ярилцлага{" "}
            </p>
            {existingBooking && (
              <p className="text-[#0069FF] text-sm mb-6">
                Цаг солиход дарж баталгаажуулна уу
              </p>
            )}
            <div className="flex items-center gap-2 mb-2">
              <LuClock3 className="text-[#000] text-opacity-80" />
              <p className="text-[#000] text-opacity-80 text-sm">
                {data.duration} минут{" "}
              </p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <MdOutlineLocationOn className="text-[#000] text-opacity-80" />
              <p className="text-[#000] text-opacity-80 text-sm">
                {data.address}
              </p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <CiCalendar className="text-[#000] text-opacity-80" />
              <p className="text-[#000] text-opacity-80 text-sm">
                {selectedTime} - {selectedEndTime}
                :00 , {fullDate}
              </p>
            </div>
            <div className="w-full flex items-center gap-4 justify-between mt-8">
              <button
                onClick={() => {
                  setModal(false);
                }}
                className="py-2 px-6 flex items-center gap-2 border border-[#E5E6E8] rounded-lg text-[#434343] w-[50%]"
              >
                <IoIosArrowBack />
                Буцах
              </button>
              <button
                onClick={() => {
                  createMeeting();
                }}
                disabled={load}
                className="py-2 px-6 flex items-center gap-2 bg-[#0069FF] text-[#fff] rounded-lg "
              >
                {load ? <div className="loader"></div> : (existingBooking ? "Цаг солих" : "Баталгаажуулах")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleCalendar;
