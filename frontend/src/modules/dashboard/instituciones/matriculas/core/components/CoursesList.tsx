import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/modules/core/ui/accordion';
import type { EnrollmentCourse, EnrollmentSection } from '../types/process';
import { capitalize } from '@/modules/core/lib/utils';
import { useSeccions } from '../services/useSection';
import { useState } from 'react';
import { Skeleton } from '@/modules/core/ui/skeleton';

function SectionInfo({ section }: { section: EnrollmentSection }) {
  return (
    <div key={section.id} className="border-2 border-border rounded-md p-4">
      <div className="w-full flex justify-between items-center">
        <span className="text-2xl text-primary">{section.section_name}</span>
        <span>
          Plazas ocupadas:{' '}
          {section.taken_places < 10
            ? '0' + section.taken_places
            : section.taken_places}{' '}
          / {section.total_places}
        </span>
      </div>
    </div>
  );
}

function CourseAcordionItem({
  course,
  values,
}: {
  course: EnrollmentCourse;
  values: string[];
}) {
  const { sections, isLoading } = useSeccions(
    { courseId: course.id },
    { enabled: values.includes(`item-${course.id}`) },
  );

  return (
    <AccordionItem value={`item-${course.id}`}>
      <AccordionTrigger>{capitalize(course.name)}</AccordionTrigger>
      <AccordionContent>
        <p>Créditos: {course.credits}</p>
        <p>Ciclo: {course.cicle_number}</p>
        <h3>Secciones disponibles:</h3>
        {!isLoading && sections ? (
          <div className="mb-2 flex flex-col gap-4 mt-2">
            {sections.map((section) => (
              <SectionInfo key={section.id} section={section} />
            ))}
          </div>
        ) : (
          <Skeleton className="h-20 w-full" />
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export default function CoursesList({
  courses,
}: {
  courses: EnrollmentCourse[];
}) {
  const [values, setValues] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full flex items-center justify-center flex-col gap-4 pt-10">
        <h2 className="text-xl text-start w-full max-w-4xl font-medium">
          Lista de cursos disponible
        </h2>
        <Accordion
          type="multiple"
          className="w-full max-w-4xl font-medium"
          onValueChange={setValues}
          value={values}
        >
          {courses.map((course) => (
            <CourseAcordionItem
              key={course.id}
              course={course}
              values={values}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
}
