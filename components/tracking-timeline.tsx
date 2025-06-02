import { CheckCircle, Circle, Clock } from "lucide-react"

interface TimelineEvent {
  date: string
  time?: string
  location: string
  activity: string
  status: "completed" | "current" | "upcoming"
}

interface TrackingTimelineProps {
  events: TimelineEvent[]
}

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex">
          <div className="mr-4 flex flex-col items-center">
            {event.status === "completed" ? (
              <div className="rounded-full bg-primary/20 p-1">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
            ) : event.status === "current" ? (
              <div className="rounded-full bg-blue-100 p-1">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            ) : (
              <div className="rounded-full border-2 border-gray-200 p-1">
                <Circle className="h-5 w-5 text-gray-300" />
              </div>
            )}
            {index < events.length - 1 && (
              <div className={`h-full w-0.5 ${event.status === "completed" ? "bg-primary/20" : "bg-gray-200"}`}></div>
            )}
          </div>
          <div className="pb-8 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
              <p
                className={`font-medium ${
                  event.status === "completed"
                    ? "text-gray-900"
                    : event.status === "current"
                      ? "text-blue-600"
                      : "text-gray-500"
                }`}
              >
                {event.activity}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{event.date}</span>
                {event.time && <span className="ml-1">• {event.time}</span>}
              </div>
            </div>
            <p className="text-sm text-gray-600">{event.location}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
