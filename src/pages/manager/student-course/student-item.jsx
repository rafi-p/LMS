import React from "react";
import { useParams, useRevalidator } from "react-router-dom";
import Proptypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { deleteStudentsCourse } from "../../../services/courseService";

export default function StudentItem({
  imageUrl = "/assets/images/photos/photo-3.png",
  name = "Angga Risky Setiawan",
  id = 1,
}) {
  const revallidator = useRevalidator();

  const params = useParams();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: () => deleteStudentsCourse({ studentId: id }, params.id),
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
      <div className="relative flex shrink-0 w-20 h-20">
        <div className="rounded-[20px] bg-[#D9D9D9] overflow-hidden">
          <img
            src={imageUrl}
            className="w-full h-full object-cover"
            alt="photo"
          />
        </div>
      </div>
      <div className="w-full">
        <h3 className="font-bold text-xl leading-[30px] line-clamp-1">
          {name}
        </h3>
      </div>
      <div className="flex justify-end items-center gap-3">
        <button
          type="button"
          disabled={isLoading}
          onClick={handleDelete}
          className="w-fit rounded-full p-[14px_20px] bg-[#FF435A] font-semibold text-white text-nowrap"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

StudentItem.propTypes = {
  imageUrl: Proptypes.string,
  name: Proptypes.string,
  totalCourse: Proptypes.number,
  id: Proptypes.string,
};
