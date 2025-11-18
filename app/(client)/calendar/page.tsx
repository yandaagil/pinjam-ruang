import Navbar from "@/components/layout/navbar"
import { EventCalendar } from "@/components/event-calendar/event-calendar";
import { SearchParams } from "nuqs";
import { searchParamsCache } from "@/lib/searchParams";
import { Suspense } from "react";
import { Events } from "@/types/event";

const dummyEvents: Events[] = [
  {
    id: "1",
    title: "Daily Team Standup",
    description: "Daily sync to discuss progress and blockers.",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "09:00",
    endTime: "09:30",
    isRepeating: true,
    repeatingType: "daily",
    location: "Virtual - Google Meet",
    category: "Work",
    color: "red",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Project Alpha Deadline",
    description: "Final submission for Project Alpha.",
    startDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    startTime: "17:00",
    endTime: "17:30",
    isRepeating: false,
    repeatingType: null,
    location: "Project Management Platform",
    category: "Project",
    color: "blue",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Weekly Review",
    description: "Review of the past week and planning for the next.",
    startDate: new Date(
      new Date().setDate(new Date().getDate() - new Date().getDay() + 5)
    ),
    endDate: new Date(
      new Date().setDate(new Date().getDate() - new Date().getDay() + 5)
    ),
    startTime: "15:00",
    endTime: "16:00",
    isRepeating: true,
    repeatingType: "weekly",
    location: "Conference Room B",
    category: "Work",
    color: "yellow",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Dentist Appointment",
    description: "Annual check-up.",
    startDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    startTime: "11:00",
    endTime: "12:00",
    isRepeating: false,
    repeatingType: null,
    location: "City Dental Clinic",
    category: "Personal",
    color: "purple",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface CalendarPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function CalendarPage(props: CalendarPageProps) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const eventsResponse = {
    events: dummyEvents,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Kalender</h1>
          <p className="text-muted-foreground">Lihat dan kelola peminjaman ruang</p>
        </div>

        <Suspense
          fallback={
            <div className="flex h-[700px] items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
                <p className="text-muted-foreground text-sm">
                  Loading kalender...
                </p>
              </div>
            </div>
          }
        >
          <EventCalendar
            events={eventsResponse.events}
            initialDate={search.date}
          />
        </Suspense>
      </div>
    </div>
  )
}
