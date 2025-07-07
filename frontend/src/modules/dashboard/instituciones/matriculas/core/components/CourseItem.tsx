import { capitalize } from '@/modules/core/lib/utils';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/core/ui/accordion';
import { Badge } from '@/modules/core/ui/badge';
import { Checkbox } from '@/modules/core/ui/checkbox';
import { Skeleton } from '@/modules/core/ui/skeleton';
import { CourseItemProvider } from '@/modules/dashboard/instituciones/matriculas/core/components/CourseItemContext';
import { Sections } from '@/modules/dashboard/instituciones/matriculas/core/components/Sections';
import { isAvailableSection } from '@/modules/dashboard/instituciones/matriculas/core/lib/sections';
import { useSections } from '@/modules/dashboard/instituciones/matriculas/core/services/useSection';
import type { EnrollmentCourse } from '@/modules/dashboard/instituciones/matriculas/core/types/courses';
import type { EnrollmentSection } from '@/modules/dashboard/instituciones/matriculas/core/types/process';
import { CalendarRangeIcon, ScaleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

function CourseItem({
  course,
  values,
}: {
  course: EnrollmentCourse;
  values: string[];
}) {
  const [isSectionsLoaded, setIsSectionsLoaded] = useState(
    values.includes(course.id.toString()),
  );
  const [wantToSelect, setWantToSelect] = useState(false);
  const { sections, isLoading } = useSections(
    { courseId: course.id },
    { enabled: isSectionsLoaded },
  );

  useEffect(() => {
    setIsSectionsLoaded(
      (prev) => prev || values.includes(course.id.toString()),
    );
  }, [values]);

  const [selected, setSelected] = useState<EnrollmentSection | null>(null);

  useEffect(() => {
    if (isSectionsLoaded && sections && wantToSelect) {
      if (selected) {
        setSelected(null);
      } else {
        const inferSelected = sections?.find((section) =>
          isAvailableSection(section),
        );
        setSelected(inferSelected || null);
      }
      setWantToSelect(false);
    }
  }, [sections, isSectionsLoaded, wantToSelect, selected]);

  const toggleIsSelected = () => {
    setWantToSelect(true);
    setIsSectionsLoaded(true);
  };
  const isSelected = selected !== null;

  return (
    <CourseItemProvider
      selected={selected}
      setSelected={setSelected}
      isSelected={isSelected}
      toggleIsSelected={toggleIsSelected}
    >
      <AccordionItem value={course.id.toString()}>
        <div className="flex items-center gap-x-2">
          <Checkbox
            className="border-muted-foreground"
            checked={isSelected}
            onCheckedChange={toggleIsSelected}
          />
          <AccordionTrigger>
            {capitalize(course.name)}
            <div className="flex gap-x-1 flex-1 justify-end">
              <Badge variant="secondary">
                <ScaleIcon />
                {course.credits}
              </Badge>
              <Badge variant="secondary">
                <CalendarRangeIcon />
                {course.cicle_number}
              </Badge>
            </div>
          </AccordionTrigger>
        </div>
        <AccordionContent>
          {!isLoading && sections ? (
            <Sections sections={sections} />
          ) : (
            <Skeleton className="h-20 w-full" />
          )}
        </AccordionContent>
      </AccordionItem>
    </CourseItemProvider>
  );
}

export { CourseItem };
