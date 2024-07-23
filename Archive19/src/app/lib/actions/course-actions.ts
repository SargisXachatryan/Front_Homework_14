"use server";

import { createWriteStream } from "fs"
import {
  InputCourse,
  InputModule,
  addCourse,
  addModule,
  getAllCourses,
  updateCourseById,
} from "../api"
import { redirect } from "next/navigation"

export const handleAdd = async (prev: unknown, data: FormData) => {
  const name = (data.get('name') as string).trim()
  const price = (data.get('price') as string).trim()
  const duration = (data.get('duration') as string).trim()

  if (!name && !price && !duration)
    return {
      message: "Please fill all the fields"
    }

  if (!name) {
    return {
      message: "Name is required."
    }
  }

  if (!price) {
    return {
      message: "Price is required."
    }
  }

  if (!duration) {
    return {
      message: "Duration is required."
    }
  }

  if (typeof name !== 'string') {
    return {
      message: "Name must be a text."
    }
  }


  if (isNaN(+price) || +price <= 0) {
    return {
      message: "Price must be a number"
    }
  }

  if (isNaN(+duration) || +duration <= 0 || !Number.isInteger(+duration)) {
    return {
      message: "Duration must be a number"
    }
  }

  const existingCourses = await getAllCourses()
  const isDuplicate = existingCourses.some(course => course.name === name)
  if (isDuplicate) {
    return {
      message: "Course name already exists."
    }
  }

  const photo = data.get("cover") as File;
  if (photo) {
    let extension = photo.type.split("/").at(-1)
    const filename = Date.now() + "." + extension

    const stream = createWriteStream("public/images/" + filename)

    const bufferedImage = await photo.arrayBuffer()

    stream.write(Buffer.from(bufferedImage))

    let course: InputCourse = {
      name: data.get("name") as string,
      price: +(data.get("price") as string),
      duration: +(data.get("duration") as string),
      cover: "images/" + filename,
    }

    addCourse(course);
    redirect("/courses")
  }
}


export const handleUpdate = async (id: number, data: FormData) => {

  const course: Partial<InputCourse> = {
    name: data.get("name") as string,
    price: +(data.get("price") as string),
    duration: +(data.get("duration") as string),
  }

  const photo = data.get("cover") as File
  if (photo.size > 0) {
    let extension = photo.type.split("/").at(-1)
    const filename = Date.now() + "." + extension

    const stream = createWriteStream("public/images/" + filename)

    const bufferedImage = await photo.arrayBuffer()
    course.cover = "images/" + filename
    stream.write(Buffer.from(bufferedImage))
  }

  updateCourseById(id, course)
  redirect("/courses")
}

export const handleAddModule = (data: FormData) => {
  const module: InputModule = {
    title: data.get("title") as string,
    duration: +(data.get("duration") as string),
    courseId: +(data.get("courseId") as string),
  }

  const result = addModule(module)
  redirect("/courses")
}
