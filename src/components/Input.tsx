import React from "react";

export default function Input({
  name,
  placeholder,
  type,
  className,
}: {
  name: string;
  placeholder: string;
  type: string;
  className?: string;
}) {
  return (
    <div className={"form-control w-full " + className}>
      <div className="input-group w-full">
        <input
          type={type}
          placeholder={placeholder}
          className="input w-full input-bordered"
          name={name}
        />
        <button className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
