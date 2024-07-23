import { handleAddModule } from "@/app/lib/actions/course-actions";
import { getAllCourses } from "@/app/lib/api";

export default function Page() {
  const courses = getAllCourses();
  return (
    <>
      <h1 className="is-size-4">Add Module</h1>
      <div className="columns">
        <div className="column is-two-fifths">
          <form action={handleAddModule}>
            <div className="field my-4">
              <input
                type="text"
                name="title"
                placeholder="enter a title"
                className="input is-dark"
              />
            </div>

            <div className="field my-4">
              <input
                type="text"
                name="duration"
                placeholder="enter a duration"
                className="input is-dark"
              />
            </div>

            <div className="field my-4">
              <select name="courseId" className="input is-dark">
                <option selected disabled value=""></option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="is-danger button">submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
