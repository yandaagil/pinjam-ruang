import CalendarPage from "@/features/(client)/calendar";
import { requireUser } from "@/hooks/useSession";

export default async function Calendar() {
  await requireUser()

  return <CalendarPage />
}
