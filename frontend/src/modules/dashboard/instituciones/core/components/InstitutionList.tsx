import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/core/ui/card';
import { Link } from '@/modules/core/ui/link';
import type { Institution } from '@/modules/dashboard/instituciones/core/types/institution';
import { getEnrollmentProcessesPath } from '@/modules/dashboard/instituciones/matriculas/core/lib/routes';
import { LANDING_ROUTE } from '@/modules/landing/core/lib/routes';
import { ArrowLeftIcon } from 'lucide-react';

interface InstitutionListProps {
  institutions: Institution[];
}

export function InstitutionList({ institutions }: InstitutionListProps) {
  return (
    <Card className="w-64 sm:w-md md:w-xl grow">
      <CardHeader className="gap-x-4 w-full">
        <CardAction className="col-end-1 row-span-2">
          <Link variant="ghost" href={LANDING_ROUTE.fullPath}>
            <ArrowLeftIcon />
          </Link>
        </CardAction>
        <CardTitle>Instituciones disponibles</CardTitle>
        <CardDescription>
          Selecciona una institución y revisa sus procesos de matrícula.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {institutions.length > 0 ? (
          institutions.map((institution) => (
            <Link
              key={institution.id}
              href={getEnrollmentProcessesPath({
                institucion_id: institution.id,
              })}
              className="items-center w-full"
              variant="ghost"
              size="lg"
            >
              {institution.logoUrl ? (
                <img
                  src={institution.logoUrl}
                  alt={institution.name}
                  className="h-full object-contain"
                />
              ) : (
                <span className="h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">No Logo</span>
                </span>
              )}
              {institution.name}
            </Link>
          ))
        ) : (
          <p>No tienes instituciones asignadas.</p>
        )}
      </CardContent>
    </Card>
  );
}
