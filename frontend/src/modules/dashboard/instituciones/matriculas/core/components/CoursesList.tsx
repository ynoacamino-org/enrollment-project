import { Accordion } from '@/modules/core/ui/accordion';
import type { EnrollmentCourse } from '../types/process';
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

export default function CoursesList({
  courses,
}: {
  courses: EnrollmentCourse[];
}) {
  const [values, setValues] = useState<string[]>([]);

  return (
    <Card>
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
          <Button>Matricular</Button>
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
            <CourseItem key={course.id} course={course} values={values} />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
