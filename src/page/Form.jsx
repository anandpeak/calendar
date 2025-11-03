import React from "react";
import { MdOutlinePhone } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const Form = ({ form, setForm, setPage, data }) => {
  // Simplified validation - only phone number required
  const isFormValid = () => {
    return form.phone && form.phone.length >= 8;
  };

  const submit = () => {
    setPage(2);
  };

  return (
    <div className="md:flex items-center justify-center min-h-[calc(var(--vh,1vh)*100)] relative">
      <div className="w-full md:w-[600px] md:rounded-xl md:border md:shadow-lg">
        <div className="px-5 pt-6 pb-3 bg-[#845D50] flex items-center gap-3 mb-6 md:rounded-t-xl">
          {data.companyName === "Burger king" && (
            <img
              className="w-[40px] h-[40px]"
              src="/img/burgerking.svg"
              alt="logo"
            />
          )}
          <p className="text-[#fff]">{data.companyName} ажлын ярилцлага</p>
        </div>
        <div className="mb-4 px-5">
          <p className="text-[#1A1A1A] font-semibold mb-2">Уулзалтын хаяг</p>
          <p className="text-[#1E293B] text-sm">{data.address}</p>
        </div>
        <div className="px-5 pb-8">
          <form>
            <p className="text-[#1A1A1A] font-semibold mb-4">
              Холбогдох утасны дугаараа оруулна уу
            </p>
            <p className="text-[#64748B] text-sm mb-6">
              Бид таньд ярилцлагын мэдээллийг илгээхийн тулд утасны дугаар шаардлагатай
            </p>
            <div className="mb-8">
              <p className="text-[#1E293B] text-sm mb-2">
                Холбоо барих утасны дугаар{" "}
                {!form.phone && <span className="text-[#FF5F6E]">*</span>}
              </p>
              <div className="flex items-center justify-start relative">
                <MdOutlinePhone className="absolute left-3 text-[#575763] text-xl" />
                <input
                  className="w-full text-[#1E293B] text-base py-3 pe-3 ps-10 border border-[#CECFD3] rounded-lg focus:outline-none focus:border-[#324D72] focus:ring-1 focus:ring-[#324D72]"
                  value={form.phone}
                  type="tel"
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value });
                  }}
                  placeholder="99001234"
                  maxLength="8"
                />
              </div>
              {form.phone && form.phone.length < 8 && (
                <p className="text-[#FF5F6E] text-xs mt-1">
                  Утасны дугаар 8 оронтой байх ёстой
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="fixed bottom-0 px-6 py-4 w-full md:w-[500px] bg-white md:bg-transparent border-t md:border-t-0">
        <button
          disabled={!isFormValid()}
          onClick={submit}
          className={`w-full flex items-center gap-3 p-3 rounded-xl justify-center text-[#fff] transition-all
              ${isFormValid() ? "bg-[#324d72] hover:bg-[#2a3f5f]" : "bg-[#CECFD3] cursor-not-allowed"}`}
        >
          Үргэлжлүүлэх
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Form;
