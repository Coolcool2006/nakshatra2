"use client"

import React, { useState, useMemo } from 'react';
import type { NakshatraTime } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { formatDuration } from '@/lib/astrology';

type UpcomingNakshatrasListProps = {
  upcomingNakshatras: NakshatraTime[];
  now: Date;
};

export function UpcomingNakshatrasList({ upcomingNakshatras, now }: UpcomingNakshatrasListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNakshatras = useMemo(() => {
    return upcomingNakshatras.filter(n =>
      n.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.sanskritName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, upcomingNakshatras]);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10 h-full">
      <CardHeader>
        <CardTitle className="text-accent">Upcoming Nakshatras</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search Nakshatras..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <Accordion type="single" collapsible className="w-full">
            {filteredNakshatras.map((nakshatra) => (
              <AccordionItem value={nakshatra.id.toString()} key={nakshatra.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col items-start text-left">
                    <p className="font-semibold text-base text-foreground">{nakshatra.englishName}</p>
                    <p className="font-sanskrit text-sm text-muted-foreground">{nakshatra.sanskritName}</p>
                    <p className="text-xs text-accent font-mono mt-1">
                      Starts in: {formatDuration(nakshatra.startTime.getTime() - now.getTime())}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 text-muted-foreground">
                    <p><span className="font-semibold text-foreground/80">Deity:</span> {nakshatra.deity}</p>
                    <p><span className="font-semibold text-foreground/80">Planet:</span> {nakshatra.rulingPlanet}</p>
                    <p><span className="font-semibold text-foreground/80">Symbol:</span> {nakshatra.symbol}</p>
                    <p className="italic">"{nakshatra.characteristics}"</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
