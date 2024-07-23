import Link from "next/link";
import { ICourse } from "../api";
import Image from "next/image";

interface IProps {
  courses: ICourse[];
}

export const CourseList = ({ courses }: IProps) => {
  return (
    <>
      <div className="columns is-multiline">
        {courses.map((course) => (
          <div className="column is-one-quarter" key={course.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <Image src={"/" + course.cover} layout="fill" objectFit="cover" alt="Course Cover" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{course.name}</p>
                    <p className="subtitle is-6">for {course.duration} months</p>
                    <p className="subtitle is-6">{course.price} AMD per month</p>
                  </div>
                </div>
                {course.modules?.length && (
                  <div className="content">
                    <strong>Modules:</strong>
                    <ul>
                      {course.modules.map((mod) => (
                        <li key={mod.id}>
                          {mod.title} for {mod.duration} months
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link href={"/courses/edit/" + course.id}>
                  <div className="button is-primary mt-3">Edit</div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
