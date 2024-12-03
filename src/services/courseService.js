import { apiInstanceAuth } from "../utils/axios";

export const getCourses = async () =>
  apiInstanceAuth.get("/courses").then((res) => res.data);

export const getCourseDetail = async (id, isPreview = false) =>
  apiInstanceAuth
    .get(`/courses/${id}${isPreview ? "?preview=true" : ""}`)
    .then((res) => res.data);

export const getCategories = async () =>
  apiInstanceAuth.get("/categories").then((res) => res.data);

export const createCourse = async (data) => {
  return apiInstanceAuth
    .post("/courses", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const updateCourse = async (data, id) => {
  return apiInstanceAuth
    .put(`/courses/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const deleteCourse = async (id) => {
  return apiInstanceAuth.delete(`/courses/${id}`).then((res) => res.data);
};

export const createContent = async (data) =>
  apiInstanceAuth.post("/courses/contents", data).then((res) => res.data);

export const getDetailContent = async (id) =>
  apiInstanceAuth.get(`/courses/contents/${id}`).then((res) => res.data);

export const updateContent = async (data, id) =>
  apiInstanceAuth.put(`courses/contents/${id}`, data).then((res) => res.data);

export const deleteDetailContent = async (id) =>
  apiInstanceAuth.delete(`/courses/contents/${id}`).then((res) => res.data);
