import { Accordion } from '@/modules/core/ui/accordion';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/core/ui/card';
import { Button } from '@/modules/core/ui/button';
import { Badge } from '@/modules/core/ui/badge';
import { CalendarRangeIcon, ScaleIcon } from 'lucide-react';
import { CourseItem } from '@/modules/dashboard/instituciones/matriculas/core/components/CourseItem';
import { useState } from 'react';
import type {
  EnrollmentCourse,
  SelectedCourse,
} from '@/modules/dashboard/instituciones/matriculas/core/types/courses';
import { actions } from 'astro:actions';
import { toast } from 'sonner';
import type { EnrollmentSection } from '@/modules/dashboard/instituciones/matriculas/core/types/process';

export default function CoursesList({
  courses,
}: {
  courses: EnrollmentCourse[];
}) {
  const [values, setValues] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>([]);
  const handleSelection = (
    section: EnrollmentSection,
    course: EnrollmentCourse,
  ) => {
    setSelectedCourses((prev) => [
      ...prev.filter((c) => c.id !== course.id),
      { ...course, section },
    ]);
  };
  const handleEnroll = async () => {
    console.log('Selected courses: ', selectedCourses);
    if (selectedCourses.length <= 0) return;
    const sectionIds = selectedCourses.map((course) => course.section.id);
    console.log(sectionIds);
    const { data, error } = await actions.courses.enroll(sectionIds);
    if (error || !data) {
      toast.error(
        'Error al matricularte en los cursos seleccionados. Por favor, intenta nuevamente.',
      );
      return;
    }
    if (data) {
      toast.success('¡Matriculado exitosamente!');
      setSelectedCourses([]);
    }
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex gap-x-2">
          Cursos disponibles
          <Badge variant="secondary">
            <ScaleIcon />
            Créditos
          </Badge>
          <Badge variant="secondary">
            <CalendarRangeIcon />
            Ciclo
          </Badge>
        </CardTitle>
        <CardDescription>
          Selecciona los turnos de los cursos para ver tu horario
        </CardDescription>
        <CardAction>
          <Button onClick={handleEnroll} disabled={selectedCourses.length <= 0}>
            Matricular
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Accordion
          type="multiple"
          className="w-full font-medium"
          onValueChange={setValues}
          value={values}
        >
          {courses.map((course) => (
            <CourseItem
              key={course.id}
              course={course}
              values={values}
              handleSelection={handleSelection}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
