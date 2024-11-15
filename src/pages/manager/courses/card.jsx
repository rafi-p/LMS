import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import Proptypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { deleteCourse } from "../../../services/courseService";

export default function CardCourse({
  id = 1,
  imageUrl = "/assets/images/thumbnails/th-1.png",
  name = "Responsive Design Triclorem Lorem, ipsum dolor.",
  totalStudents = 554,
  category = "Programming",
}) {
  const revallidator = useRevalidator();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => deleteCourse(id),
  });

  const handleDelete = async () => {
    try {
      await mutateAsync();
      revallidator.revalidate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card flex items-center gap-5">
      <div className="flex shrink-0 w-[140px] h-[110px] rounded-[20px] bg-[#D9D9D9] overflow-hidden">
        <img
          src={imageUrl}
          className="w-full h-full object-cover"
          alt="thumbnail"
        />
      </div>
      <div className="w-full">
        <h3 className="font-bold text-xl leading-[30px] line-clamp-1">
          {name}
        </h3>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-[6px] mt-[6px]">
            <img
              src="/assets/images/icons/profile-2user-purple.svg"
              className="w-5 h-5"
              alt="icon"
            />
            <p className="text-[#838C9D]">{totalStudents} Students</p>
          </div>
          <div className="flex items-center gap-[6px] mt-[6px]">
            <img
              src="/assets/images/icons/crown-purple.svg"
              className="w-5 h-5"
              alt="icon"
            />
            <p className="text-[#838C9D]">{category}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-3">
        <button
          onClick={handleDelete}
          disabled={isLoading}
          type="button"
          className="w-fit rounded-full bg-red-500 text-white p-[14px_20px] font-semibold text-nowrap"
        >
          Delete
        </button>
        <Link
          to={`/manager/courses/${id}`}
          className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
        >
          Manage
        </Link>
      </div>
    </div>
  );
}

CardCourse.propTypes = {
  id: Proptypes.number,
  imageUrl: Proptypes.string,
  name: Proptypes.string,
  totalStudents: Proptypes.number,
  category: Proptypes.string,
};
