import React from "react";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-richblack-900/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-richblack-600 bg-richblack-800 p-8 shadow-2xl shadow-black/40">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-richblack-700 text-2xl">
          <span role="img" aria-label="warning">⚠️</span>
        </div>
        <p className="text-xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-2 mb-6 text-sm leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex justify-end gap-x-3">
          <button
            className="rounded-md border border-richblack-600 px-5 py-2 font-semibold text-richblack-100 transition-all duration-200 hover:border-richblack-400 hover:text-richblack-5"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
          <button
            className="rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 transition-all duration-200 hover:scale-95"
            onClick={modalData?.btn1Handler}
          >
            {modalData?.btn1Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
