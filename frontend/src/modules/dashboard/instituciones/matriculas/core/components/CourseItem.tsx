import { capitalize } from '@/modules/core/lib/utils';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/core/ui/accordion';
import { Badge } from '@/modules/core/ui/badge';
import { Checkbox } from '@/modules/core/ui/checkbox';
import { Skeleton } from '@/modules/core/ui/skeleton';
import { Sections } from '@/modules/dashboard/instituciones/matriculas/core/components/Sections';
import { useSections } from '@/modules/dashboard/instituciones/matriculas/core/services/useSection';
import type { EnrollmentCourse } from '@/modules/dashboard/instituciones/matriculas/core/types/process';
import { CalendarRangeIcon, ScaleIcon } from 'lucide-react';
import { createContext } from 'react';

const CourseItemContext = createContext<{}>();

function CourseItem({
  course,
  values,
}: {
  course: EnrollmentCourse;
  values: string[];
}) {
  const { sections, isLoading } = useSections(
    { courseId: course.id },
    { enabled: values.includes(`item-${course.id}`) },
  );

  return (
    <AccordionItem value={`item-${course.id}`}>
      <div className="flex items-center gap-x-2">
        <Checkbox className="border-muted-foreground" />
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
  );
}

export { CourseItem };
