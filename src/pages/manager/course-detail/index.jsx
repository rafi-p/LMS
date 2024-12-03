import React from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import TableContent from "./table-content";

export default function ManageCourseDetailPage() {
  const { id } = useParams();

  const course = useLoaderData();

  return (
    <>
      <div
        id="Breadcrumb"
        className="flex items-center gap-5 *:after:content-['/'] *:after:ml-5"
      >
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Dashboard
        </span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Manage Course
        </span>
        <span className="last-of-type:after:content-[''] last-of-type:font-semibold">
          Details
        </span>
      </div>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">
            {course?.name}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={`/manager/courses/edit/${id}`}
            className="w-fit rounded-full border border-[#060A23] p-[14px_20px] font-semibold text-nowrap"
          >
            Edit Course
          </Link>
          <Link
            to={`/manager/courses/${id}/preview`}
            className="w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap"
          >
            Preview
          </Link>
        </div>
      </header>
      <section id="CourseInfo" className="flex gap-[50px]">
        <div
          id="Thumbnail"
          className="flex shrink-0 w-[480px] h-[250px] rounded-[20px] bg-[#D9D9D9] overflow-hidden"
        >
          <img
            src={course?.thumbnail_url}
            className="w-full h-full object-cover"
            alt="thumbnail"
          />
        </div>
        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
            <img
              src="/assets/images/icons/profile-2user-purple.svg"
              className="w-8 h-8"
              alt="icon"
            />
            <p className="font-semibold">{course?.students.length} Students</p>
          </div>
          <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
            <img
              src="/assets/images/icons/crown-purple.svg"
              className="w-8 h-8"
              alt="icon"
            />
            <p className="font-semibold">{course?.category?.name}</p>
          </div>
          <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
            <img
              src="/assets/images/icons/note-favorite-purple.svg"
              className="w-8 h-8"
              alt="icon"
            />
            <p className="font-semibold">{course?.details.length} Contents</p>
          </div>
          <div className="flex flex-col rounded-[20px] border border-[#CFDBEF] p-5 gap-4">
            <img
              src="/assets/images/icons/cup-purple.svg"
              className="w-8 h-8"
              alt="icon"
            />
            <p className="font-semibold">Certificate</p>
          </div>
        </div>
      </section>
      <TableContent details={course?.details ?? []} courseId={course._id} />
    </>
  );
}
