import { Button } from "@/components/ui/button";
import EventsWindow from "@/components/windows/Events.window";
import { Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
    const router = useNavigate()
    return (
        <EventsWindow>
            <div className="h-64 flex gap-y-5 flex-col items-center justify-center ">
            <Wrench size={45} />
            <p className="text-2xl font-bold">Features under development { ': }'}</p> 
            <Button onClick={() => router(-1)}>Go Back</Button>
            </div>
        </EventsWindow>
    )
  }

  export default EventsPage;