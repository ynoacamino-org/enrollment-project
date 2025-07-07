import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/modules/core/ui/card';
import {
  FileSpreadsheet,
  CalendarClockIcon,
  LibraryBigIcon,
  ArrowRight,
} from 'lucide-react';

import { getEnrollmentProcessPath } from '../lib/routes';

interface DashboardNavigationCardsProps {
  institutionId: string;
  matriculaId: string;
}

const navigationItems = [
  {
    title: 'Constancia',
    description: 'Visualiza y descarga tu constancia de matrícula',
    icon: FileSpreadsheet,
    path: 'constancia',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 hover:bg-orange-100',
  },
  {
    title: 'Horarios',
    description: 'Consulta los horarios de tus clases',
    icon: CalendarClockIcon,
    path: 'horarios',
    color: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100',
  },
  {
    title: 'Cursos',
    description: 'Explora los cursos disponibles en tu matrícula',
    icon: LibraryBigIcon,
    path: 'cursos',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100',
  },
];

export default function DashboardNavigationCards({
  institutionId,
  matriculaId,
}: DashboardNavigationCardsProps) {
  const basePath = getEnrollmentProcessPath({
    institucion_id: institutionId,
    matricula_id: matriculaId,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Card
            key={item.path}
            className={`transition-all duration-200 cursor-pointer hover:shadow-lg ${item.bgColor} border-2`}
          >
            <a href={`${basePath}/${item.path}`} className="block h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-full bg-white shadow-sm ${item.color}`}
                  >
                    <Icon size={24} />
                  </div>
                  <ArrowRight size={20} className="text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardTitle className="text-lg mb-2 text-gray-800">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardContent>
            </a>
          </Card>
        );
      })}
    </div>
  );
}
