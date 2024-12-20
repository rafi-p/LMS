import { createBrowserRouter, redirect } from "react-router-dom";
import ManagerHomePage from "../pages/manager/home";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import SuccessCheckoutPage from "../pages/SuccessCheckout";
import LayoutDashboard from "../components/layout";
import ManageCoursesPage from "../pages/manager/courses";
import ManageCreateCoursePage from "../pages/manager/create-courses";
import ManageCourseDetailPage from "../pages/manager/course-detail";
import ManageContentCreatePage from "../pages/manager/course-content-create";
import ManageCoursePreviewPage from "../pages/manager/course-preview";
import ManageStudentsPage from "../pages/manager/students";
import StudentPage from "../pages/student/StudentOverview";
import secureLocalStorage from "react-secure-storage";
import { MANAGER_SESSION, STORAGE_KEY } from "../utils/const";
import {
  getCategories,
  getCourseDetail,
  getCourses,
  getDetailContent,
  getStudentsCourse,
} from "../services/courseService";
import ManageStudentCreatePage from "../pages/manager/students-create";
import { getDetailStudent, getStudents } from "../services/studentService";
import StudentCourseList from "../pages/manager/student-course";
import StudentForm from "../pages/manager/student-course/student-form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ManagerHomePage />,
  },
  {
    path: "/manager/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/manager/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/success-checkout",
    element: <SuccessCheckoutPage />,
  },
  {
    path: "/manager",
    id: MANAGER_SESSION,
    loader: async () => {
      const session = secureLocalStorage.getItem(STORAGE_KEY);

      if (!session || session.role !== "manager") {
        throw redirect("/manager/sign-in");
      }

      return session;
    },
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: <ManagerHomePage />,
      },
      {
        path: "/manager/courses",
        loader: async () => {
          const data = await getCourses();

          console.log(data);

          return data;
        },
        element: <ManageCoursesPage />,
      },
      {
        path: "/manager/courses/create",
        loader: async () => {
          const categories = await getCategories();

          return { categories, course: null };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: "/manager/courses/edit/:id",
        loader: async ({ params }) => {
          const categories = await getCategories();
          const course = await getCourseDetail(params.id);

          return { categories, course: course?.data };
        },
        element: <ManageCreateCoursePage />,
      },
      {
        path: "/manager/courses/:id",
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id);

          return course?.data;
        },
        element: <ManageCourseDetailPage />,
      },
      {
        path: "/manager/courses/:id/create",
        element: <ManageContentCreatePage />,
      },
      {
        path: "/manager/courses/:id/edit/:contentId",
        loader: async ({ params }) => {
          const content = await getDetailContent(params.contentId);

          return content?.data;
        },
        element: <ManageContentCreatePage />,
      },
      {
        path: "/manager/courses/:id/preview",
        loader: async ({ params }) => {
          const course = await getCourseDetail(params.id, true);

          return course?.data;
        },
        element: <ManageCoursePreviewPage />,
      },
      {
        path: "/manager/students",
        loader: async () => {
          const students = await getStudents();

          return students?.data;
        },
        element: <ManageStudentsPage />,
      },
      {
        path: "/manager/students/create",
        element: <ManageStudentCreatePage />,
      },
      {
        path: "/manager/students/edit/:id",
        loader: async ({ params }) => {
          const student = await getDetailStudent(params.id);

          return student?.data;
        },
        element: <ManageStudentCreatePage />,
      },
      {
        path: "/manager/courses/students/:id",
        loader: async ({ params }) => {
          const course = await getStudentsCourse(params.id);

          return course?.data;
        },
        element: <StudentCourseList />,
      },
      {
        path: "/manager/courses/students/:id/add",
        loader: async () => {
          const students = await getStudents();

          return students?.data;
        },
        element: <StudentForm />,
      },
    ],
  },
  {
    path: "/student",
    element: <LayoutDashboard isAdmin={false} />,
    children: [
      {
        index: true,
        element: <StudentPage />,
      },
      {
        path: "/student/detail-course/:id",
        element: <ManageCoursePreviewPage />,
      },
    ],
  },
]);

export default router;
