import { redirect } from "next/navigation";

export default function NewTutorPage() {
  redirect("/dashboard/tutors/new");
}
