"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CalendarDays, Clock } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

type LocationTimeCardProps = {
  now: Date;
};

type LocationInfo = {
  city: string;
  country: string;
  timezone: string;
  subtitle: string;
};

export function LocationTimeCard({ now }: LocationTimeCardProps) {
  const [location, setLocation] = useState<LocationInfo | null>(null);

  useEffect(() => {
    const fetchLocationData = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`);
        if (!response.ok) throw new Error("API call failed");
        const data = await response.json();
        
        const city = data.address.city || data.address.town || data.address.village || 'Unknown Area';
        const country = data.address.country || 'Unknown Country';
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        setLocation({
          city,
          country,
          timezone,
          subtitle: "Based on your browser location",
        });
      } catch (e) {
        setLocation({
          city: "Varanasi",
          country: "India",
          timezone: "Asia/Kolkata",
          subtitle: "Could not detect location",
        });
      }
    };
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchLocationData(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setLocation({
            city: "Varanasi",
            country: "India",
            timezone: "Asia/Kolkata",
            subtitle: "Location access denied",
          });
        }
      );
    } else {
      setLocation({
        city: "Varanasi",
        country: "India",
        timezone: "Asia/Kolkata",
        subtitle: "Geolocation not supported",
      });
    }
  }, []);

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
              {!location ? (
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ) : (
                <>
                  <p className="font-semibold">{location.city}, {location.country}</p>
                  <p className="text-sm text-muted-foreground">{location.subtitle}</p>
                </>
              )}
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
              {!location ? (
                 <div className="space-y-2">
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-4 w-40" />
                </div>
              ) : (
                <>
                  <p className="font-mono font-bold text-xl">{formatTime(now, location.timezone)}</p>
                  <p className="text-sm text-muted-foreground">{location.timezone.replace(/_/g, ' ')}</p>
                </>
              )}
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
