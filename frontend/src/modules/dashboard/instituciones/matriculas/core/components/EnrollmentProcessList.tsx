import { capitalize } from '@/modules/core/lib/utils';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/core/ui/card';
import { Link } from '@/modules/core/ui/link';
import type { InstitutionWithProcesses } from '@/modules/dashboard/instituciones/core/types/institution';
import { getEnrollmentProcessPath } from '@/modules/dashboard/instituciones/matriculas/core/lib/routes';
import { LANDING_ROUTE } from '@/modules/landing/core/lib/routes';
import { ArrowLeftIcon } from 'lucide-react';

interface EnrollmentProcessListProps {
  institution: InstitutionWithProcesses;
}

export function EnrollmentProcessList({
  institution,
}: EnrollmentProcessListProps) {
  return (
    <Card className="w-64 sm:w-md md:w-xl grow">
      <CardHeader className="gap-x-4">
        <CardAction className="col-start-1 row-span-2">
          <Link variant="ghost" href={LANDING_ROUTE.fullPath}>
            <ArrowLeftIcon />
          </Link>
        </CardAction>
        <CardTitle>Procesos de matrícula en {institution.name}</CardTitle>
        <CardDescription>
          Selecciona un proceso y revisa todos sus detalles
        </CardDescription>
      </CardHeader>
      <CardContent>
        {institution.processes.length > 0 ? (
          institution.processes.map((process) => (
            <Link
              key={process.id}
              href={getEnrollmentProcessPath({
                institucion_id: institution.id,
                matricula_id: process.id,
              })}
              className="items-center w-full flex justify-center flex-col py-2 h-auto text-base gap-1"
              variant="ghost"
              size="lg"
            >
              {capitalize(process.name)}
              {process.startDay && process.endDay ? (
                <span className="text-xs text-gray-500">
                  {new Date(process.startDay).toLocaleDateString()} -{' '}
                  {new Date(process.endDay).toLocaleDateString()}
                </span>
              ) : null}
            </Link>
          ))
        ) : (
          <p>No tienes instituciones asignadas.</p>
        )}
      </CardContent>
    </Card>
  );
}
