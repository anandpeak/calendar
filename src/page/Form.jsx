import React, { useState } from "react";
import { MdOutlinePhone } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Form = ({ form, setForm }) => {
  const navigate = useNavigate();

  const isFormValid = () => {
    return Object.values(form).every((value) => value !== "");
  };

  const submit = () => {
    navigate("schedule");
  };

  return (
    <div className="md:flex items-center justify-center min-h-[calc(var(--vh,1vh)*100)] relative">
      <div className="w-full md:w-[600px] md:h-[600px] overflow-y-scroll md:rounded-xl md:border ">
        <div className="px-5 pt-6 pb-3 bg-[#845D50] flex items-center gap-3 mb-10">
          <img
            className="w-[40px] h-[40px]"
            src="/img/burgerking.svg"
            alt="logo"
          />
          <p className="text-[#fff]">Burger King ажлын ярилцлага </p>
        </div>
        <div className="px-5">
          <form>
            <p className="text-[#1A1A1A] font-semibold mb-8">
              Та доорх мэдээллийг бөглөнө үү.
            </p>
            <div className="flex flex-wrap justify-between gap-2">
              <div className="mb-4 w-full md:w-[45%]">
                <p className="text-[#1E293B] text-sm mb-1">
                  Ажиллах боломжтой салбар{" "}
                  {!form.sector && <span className="text-[#FF5F6E]">*</span>}
                </p>
                <select
                  onChange={(e) => {
                    setForm({ ...form, sector: e.target.value });
                  }}
                  className="w-full text-[#1E293B] text-sm p-3 border border-[#CECFD3] rounded-lg"
                  defaultValue=""
                  value={form.sector}
                >
                  <option value="" disabled>
                    Эндээс сонгоно уу.
                  </option>
                  <option value="1">
                    3.4 хороолол, Макс төв ахуй үйлчилгээ, Билэг их дэлгүүрийн
                    урд байрлалтай.
                  </option>
                  <option value="2">
                    Багшийн дээд, Монгол Улсын Багшийн их сургуулийн автобусны
                    буудлын чанх ард байрлалтай.
                  </option>
                  <option value="3">
                    Берлин , Чингэлтэй дүүрэг автобусны буудал чанх урд
                    байрлалтай.
                  </option>
                  <option value="4">
                    Шинэ нисэх , Төв аймаг, Шинэ нисэх онгоцны буудал 1 давхарт
                  </option>
                  <option value="5">
                    Макс молл, Макс молл худалдааны төвийн 5 давхарт.
                  </option>
                  <option value="6">
                    Чингис И-Март, Токиогийн гудамж 23, Имарт Чингис.
                  </option>
                  <option value="7">
                    Цамбагарав, Цамбагарав худалдааны төв давхар
                  </option>
                  <option value="8">
                    Зайсан, ХУД 11-р хороо Зайсангын гудамж Миний дэлгүүр 1-р
                    давхар
                  </option>
                  <option value="9">
                    Хүннү молл, Хүннү молл худалдааны төвийн B1 давхарт
                  </option>
                  <option value="10">
                    Нарны зам, Нарны зам Миний хайпермаркет дотор
                  </option>
                  <option value="11">
                    Морьтон, 19-р хороололын урд талын автобусны буудлын баруун
                    урд талд байрлалтай
                  </option>
                  <option value="12">
                    Хан-Уул И-Март , Стадион Оргил, Имарт худалдааны төвийн 1
                    давхарт
                  </option>
                  <option value="13">
                    10-р хороололлын И-Март, Имарт худалдааны төв 3-р давхарт
                  </option>
                  <option value="14">
                    Драгон, Үйлдвэрчний эвлэлийн гудамж Шинэ Драгон терминэл
                  </option>
                </select>
              </div>
              <div className="mb-4 w-full md:w-[45%]">
                <p className="text-[#1E293B] text-sm mb-1">
                  Нас {!form.age && <span className="text-[#FF5F6E]">*</span>}
                </p>
                <input
                  className="w-full text-[#1E293B] text-sm p-3 border border-[#CECFD3] rounded-lg"
                  value={form.age}
                  type="number"
                  onChange={(e) => {
                    setForm({ ...form, age: Number(e.target.value) });
                  }}
                  placeholder="Насаа оруулна уу"
                />
              </div>
              <div className="mb-4 w-full md:w-[45%]">
                <p className="text-[#1E293B] text-sm mb-1">
                  Овог{" "}
                  {!form.lastName && <span className="text-[#FF5F6E]">*</span>}
                </p>
                <input
                  className="w-full text-[#1E293B] text-sm p-3 border border-[#CECFD3] rounded-lg"
                  value={form.lastName}
                  type="text"
                  onChange={(e) => {
                    setForm({ ...form, lastName: e.target.value });
                  }}
                  placeholder="Энд бичнэ үү."
                />
              </div>
              <div className="mb-4 w-full md:w-[45%]">
                <p className="text-[#1E293B] text-sm mb-1">
                  Нэр{" "}
                  {!form.firstName && <span className="text-[#FF5F6E]">*</span>}
                </p>
                <input
                  className="w-full text-[#1E293B] text-sm p-3 border border-[#CECFD3] rounded-lg"
                  value={form.firstName}
                  type="text"
                  onChange={(e) => {
                    setForm({ ...form, firstName: e.target.value });
                  }}
                  placeholder="Энд бичнэ үү."
                />
              </div>
              <div className="mb-4 w-full md:w-[45%]">
                <p className="text-[#1E293B] text-sm mb-1">
                  Холбоо барих утасны дугаар{" "}
                  {!form.phone && <span className="text-[#FF5F6E]">*</span>}
                </p>
                <div className="flex items-center justify-start relative">
                  <MdOutlinePhone className="absolute left-3 text-[#575763]" />
                  <input
                    className="w-full text-[#1E293B] text-sm py-3 pe-3 ps-8 border border-[#CECFD3] rounded-lg"
                    value={form.phone}
                    type="number"
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                    }}
                    placeholder="Энд бичнэ үү."
                  />
                </div>
              </div>
              <div className="mb-4 w-full ">
                <p className="text-[#1E293B] text-sm mb-1">
                  Гэрийн хаяг{" "}
                  {!form.address && <span className="text-[#FF5F6E]">*</span>}
                </p>
                <textarea
                  className="w-full h-[72px] text-[#1E293B] text-sm p-3 border border-[#CECFD3] rounded-lg"
                  value={form.address}
                  type="text"
                  onChange={(e) => {
                    setForm({ ...form, address: e.target.value });
                  }}
                  placeholder="Энд бичнэ үү."
                ></textarea>
              </div>
              <div className="mb-4 w-full">
                <p className="text-[#1E293B] text-sm mb-1">
                  Би бүтэн цагаар ажиллах{" "}
                  {form.workTime === "" ? (
                    <span className="text-[#FF5F6E]">*</span>
                  ) : (
                    ""
                  )}
                </p>
                <div className="flex items-center gap-3 justify-between">
                  <div
                    onClick={() => {
                      setForm({ ...form, workTime: "fulltime" });
                    }}
                    className="w-[50%] px-4 py-3 flex items-center gap-3 border border-[#E5E6E8] text-[#1E293B] rounded-lg cursor-pointer"
                  >
                    {form.workTime === "fulltime" ? (
                      <div className="border-2 border-[#324D72] w-[14px] h-[14px] rounded-full flex items-center justify-center">
                        <div className="bg-[#324d72] h-[7px] w-[7px] rounded-full"></div>
                      </div>
                    ) : (
                      <div className="border-2 border-[#1A1A1A] w-[14px] h-[14px] rounded-full border-opacity-10"></div>
                    )}
                    Боломжтой
                  </div>
                  <div
                    onClick={() => {
                      setForm({ ...form, workTime: "parttime" });
                    }}
                    className="w-[50%] px-4 py-3 flex items-center gap-3 border border-[#E5E6E8] text-[#1E293B] rounded-lg cursor-pointer"
                  >
                    {form.workTime === "parttime" ? (
                      <div className="border-2 border-[#324D72] w-[14px] h-[14px] rounded-full flex items-center justify-center">
                        <div className="bg-[#324d72] h-[7px] w-[7px] rounded-full"></div>
                      </div>
                    ) : (
                      <div className="border-2 border-[#1A1A1A] w-[14px] h-[14px] rounded-full border-opacity-10"></div>
                    )}
                    Боломжгүй
                  </div>
                </div>
              </div>
              <div className="mb-20 w-full">
                <p className="text-[#1E293B] text-sm mb-1">
                  Миний одоогийн статус{" "}
                  {!form.currentStatus && (
                    <span className="text-[#FF5F6E]">*</span>
                  )}
                </p>
                <select
                  onChange={(e) => {
                    setForm({ ...form, currentStatus: e.target.value });
                  }}
                  className="w-full text-[#1E293B] text-sm p-3 border border-[#CECFD3] rounded-lg"
                  defaultValue=""
                  value={form.currentStatus}
                >
                  <option value="" disabled>
                    Эндээс сонгоно уу.
                  </option>
                  <option value="university student">Оюутан</option>
                  <option value="working">Ажилладаг</option>
                  <option value="unemployed">Ажилгүй</option>
                  <option value="Student">Сурагч</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="fixed -bottom-8 px-6 w-full md:w-[500px]">
        <button
          disabled={!isFormValid()}
          onClick={submit}
          className={`w-full flex items-center gap-3 p-3  rounded-xl justify-center text-[#fff] mb-10
              ${isFormValid() ? "bg-[#324d72]" : "bg-[#CECFD3] "}`}
        >
          Үргэлжлүүлэх
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Form;
