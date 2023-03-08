import { useState, useEffect } from "react";
import axios from "axios";
import { getTeacher, getSemester } from "../api"; //import hai hàm API đã được viết sẵn

const CreateCoursePopup = () => {
    const [teachers, setTeachers] = useState([]);
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        // lấy danh sách giảng viên và cập nhật state teachers
        const fetchTeachers = async () => {
            try {
                const response = await getTeacher();
                setTeachers(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTeachers();
    }, []);

    useEffect(() => {
        // lấy danh sách học kỳ và cập nhật state semesters
        const fetchSemesters = async () => {
            try {
                const response = await getSemester();
                setSemesters(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSemesters();
    }, []);

    // handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        // do something with the form data
    };

    return (
        <div>
            <h2>Create Course</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="courseName">Course Name:</label>
                <input type="text" id="courseName" name="courseName" />

                <label htmlFor="subject">Subject:</label>
                <select id="subject" name="subject">
                    <option value="">--Select Subject--</option>
                    <option value="math">Math</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                </select>

                <label htmlFor="teacher">Teacher:</label>
                <select id="teacher" name="teacher">
                    <option value="">--Select Teacher--</option>
                    {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="semester">Semester:</label>
                <select id="semester" name="semester">
                    <option value="">--Select Semester--</option>
                    {semesters.map((semester) => (
                        <option key={semester.id} value={semester.id}>
                            {semester.name}
                        </option>
                    ))}
                </select>

                <button type="submit">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCoursePopup;
