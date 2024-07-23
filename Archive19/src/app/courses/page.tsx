import { getAllCourses } from "../lib/api"
import { CourseList } from "../lib/components/course-list"

export default function Page(){
    const list = getAllCourses()
    return <>
        <h1 className="is-size-2">Courses</h1>
        <p>Choose the best courses in the world!!!</p>
        <CourseList courses={list}/>
    </>
}