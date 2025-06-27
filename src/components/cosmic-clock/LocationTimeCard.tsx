"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CalendarDays, Clock } from "lucide-react";

type LocationTimeCardProps = {
  now: Date;
};

export function LocationTimeCard({ now }: LocationTimeCardProps) {
  const formatDate = (date: Date, timeZone?: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: timeZone,
    }).format(date);
  };

  const formatTime = (date: Date, timeZone?: string) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: timeZone,
    }).format(date);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent">
          <GlobeIcon className="h-6 w-6" />
          Location & Time
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6 text-accent/80" />
            <div>
              <p className="font-semibold">Varanasi, Uttar Pradesh</p>
              <p className="text-sm text-muted-foreground">India (Location detected)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-accent/80" />
            <div>
              <p className="font-semibold">{formatDate(now)}</p>
              <p className="text-sm text-muted-foreground">Gregorian Calendar</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-accent/80" />
            <div>
              <p className="font-mono font-bold text-xl">{formatTime(now)}</p>
              <p className="text-sm text-muted-foreground">Local Time</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-accent/80" />
            <div>
              <p className="font-mono font-bold text-xl">{formatTime(now, 'Asia/Kolkata')}</p>
              <p className="text-sm text-muted-foreground">Indian Standard Time (IST)</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
