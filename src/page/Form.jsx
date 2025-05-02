import React from "react";
import { MdOutlinePhone } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const Form = ({ form, setForm, setPage, data }) => {
  const isFormValid = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return (
      Object.values(form).every((value) => value !== "") &&
      emailPattern.test(form.mail)
    );
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const submit = () => {
    setPage(2);
  };

  return (
    <div className="md:flex items-center justify-center min-h-[calc(var(--vh,1vh)*100)] relative">
      {console.log(form)}
      <div className="w-full md:w-[600px] md:h-[600px] overflow-y-scroll md:rounded-xl md:border ">
        <div className="px-5 pt-6 pb-3 bg-[#845D50] flex items-center gap-3 mb-6">
          {data.companyName === "Burger king" && (
            <img
              className="w-[40px] h-[40px]"
              src="/img/burgerking.svg"
              alt="logo"
            />
          )}
          <p className="text-[#fff]">{data.companyName} ажлын ярилцлага </p>
        </div>
        <div className="mb-4 px-5">
          <p className="text-[#1A1A1A] font-semibold mb-2">Уулзалтын хаяг</p>
          <p className="text-[#1E293B] text-sm">{data.address}</p>
        </div>
        <div className="px-5">
          <form>
            <p className="text-[#1A1A1A] font-semibold mb-8">
              Та доорх мэдээллийг бөглөнө үү.
            </p>
            <div className="flex flex-wrap justify-between gap-2">
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
              <div className="mb-4 w-full md:w-[45%]">
                <p className="text-[#1E293B] text-sm mb-1">
                  Мейл хаяг{" "}
                  {(!form.mail || !isValidEmail(form.mail)) && (
                    <span className="text-[#FF5F6E]">*</span>
                  )}{" "}
                </p>
                <div className="flex items-center justify-start relative">
                  <input
                    className="w-full text-[#1E293B] text-sm p-3  border border-[#CECFD3] rounded-lg"
                    value={form.mail}
                    type="text"
                    onChange={(e) => {
                      setForm({ ...form, mail: e.target.value });
                    }}
                    placeholder="Энд бичнэ үү."
                  />
                </div>
              </div>
              <div className="mb-4 w-full">
                <p className="text-[#1E293B] text-sm mb-1">
                  Аль салбарт ажилллах боломжтой вэ ?{" "}
                  {!form.branchId && <span className="text-[#FF5F6E]">*</span>}
                </p>
                <select
                  onChange={(e) => {
                    setForm({ ...form, branchId: Number(e.target.value) });
                  }}
                  className="w-full text-[#1E293B] text-sm p-3 border border-[#CECFD3] rounded-lg"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Эндээс сонгоно уу.
                  </option>

                  {data.branches.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}: {item.address}
                    </option>
                  ))}
                </select>
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
