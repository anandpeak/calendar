import React from "react";
import { FaCheck } from "react-icons/fa6";
import { LuClock3 } from "react-icons/lu";
import { MdOutlineLocationOn } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";

const EndingPage = ({ selectedTime, selectedEndTime, data, fullDate }) => {
  const isMobile = window.innerWidth <= 480;

  return (
    <div>
      {isMobile ? (
        <div className="relative min-h-[calc(var(--vh,1vh)*100)]">
          <div className="relative flex justify-center">
            <img src="/img/endingBg.png" alt="bg" />
            <div className="w-[124px] h-[124px] flex items-center justify-center p-8 absolute -bottom-16 bg-[#fff] rounded-full">
              <div className="w-[60px] h-[60px] flex items-center justify-center p-3 bg-[#F0FDF4] rounded-full">
                <FaCheck className="text-[#16A34A] text-3xl" />
              </div>
            </div>
          </div>
          <div className="mt-20">
            <div className="text-center mb-4">
              <p className="text-lg text-[#000] font-semibold mb-2">
                Уулзалт амжилттай товлогдлоо!
              </p>
              <p className="text-[#777985]">Удахгүй уулзацгаая. Баярлалаа.</p>
            </div>
            <div className="px-8">
              <div className="flex items-center gap-2 mb-2 text-[#575763]">
                <LuClock3 />
                <p className="text-sm">{data.duration} минут </p>
              </div>
              <div className="flex items-center gap-2 mb-2 text-[#575763]">
                <MdOutlineLocationOn />
                <p className="text-sm">{data.address}</p>
              </div>
              <div className="flex items-center gap-2 mb-2 text-[#575763]">
                <CiCalendar />
                <p className="text-sm">
                  {selectedTime.slice(0, 5)} {selectedEndTime} {fullDate}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen w-full">
          <div className="px-20 py-10 border border-[#1A1A1A] border-opacity-10 rounded-2xl">
            <div className="flex justify-center mb-7">
              <img src="/img/burgerking.svg" alt="logo" />
            </div>
            <div className="text-center mb-7">
              <div className="flex items-center justify-center gap-2 mb-2">
                <img src="/img/check.svg" alt="checked" />
                <p className="text-lg text-[#000]">
                  Уулзалт амжилттай товлогдлоо!
                </p>
              </div>
              <p className="text-[#777985]">Удахгүй уулзацгаая. Баярлалаа.</p>
            </div>
            <div className="border border-[#1A1A1A] border-opacity-10 rounded-xl py-4 px-6 w-[450px]">
              <div>
                <p className="text-lg text-[#1A1A1A] mb-2">
                  Уулзалтын мэдээлэл
                </p>
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#575763]">
                    <LuClock3 />
                    <p className="text-sm">{data.duration} минут </p>
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-[#575763]">
                    <MdOutlineLocationOn />
                    <p className="text-sm">{data.address}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-[#575763]">
                    <CiCalendar />
                    <p className="text-sm">
                      {selectedTime.slice(0, 5)} {selectedEndTime} {fullDate}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndingPage;
