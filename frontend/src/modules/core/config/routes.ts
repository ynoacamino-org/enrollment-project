import {
  CalendarClockIcon,
  FileSpreadsheet,
  GraduationCapIcon,
  House,
  LibraryBigIcon,
} from '@lucide/astro';
import type { Route } from '../types/route';

export const routesConfig: Route = {
  name: 'landing',
  title: 'Tuitions - Administra tus matrículas',
  path: '',
  fullPath: '/',
  sub: [
    {
      name: 'not-found',
      title: 'Página no encontrada',
      path: 'not-found',
      fullPath: '/not-found',
    },
    {
      name: 'unauthorized',
      title: 'No autorizado',
      path: 'unauthorized',
      fullPath: '/unauthorized',
    },
    {
      name: 'dashboard',
      title: 'Panel de control',
      path: 'dashboard',
      icon: House,
      fullPath: '/dashboard',
      sub: [
        {
          name: 'dashboard-instituciones',
          title: 'Instituciones - Panel de control',
          path: 'instituciones',
          fullPath: '/dashboard/instituciones',
          sub: [
            {
              name: 'dashboard-instituciones-one',
              title: 'Institución - Panel de control',
              dynamic: true,
              param: 'institucion_id',
              fullPath: '/dashboard/instituciones/:institucion_id',
              sub: [
                {
                  name: 'dashboard-instituciones-one-matriculas',
                  title: 'Matrículas - Institución - Panel de control',
                  path: 'matriculas',
                  fullPath:
                    '/dashboard/instituciones/:institucion_id/matriculas',
                  sub: [
                    {
                      name: 'dashboard-instituciones-one-matriculas-crear',
                      title: 'Crear matrícula - Institución - Panel de control',
                      path: 'crear',
                      fullPath:
                        '/dashboard/instituciones/:institucion_id/matriculas/crear',
                      sub: [
                        {
                          name: 'dashboard-instituciones-one-matriculas-crear-inicio',
                          title:
                            'Inicio - Crear matrícula - Institución - Panel de control',
                          path: 'inicio',
                          fullPath:
                            '/dashboard/instituciones/:institucion_id/matriculas/crear/inicio',
                        },
                        {
                          name: 'dashboard-instituciones-one-matriculas-crear-subirDatos',
                          title:
                            'Subir Datos - Crear matrícula - Institución - Panel de control',
                          path: 'subir-datos',
                          fullPath:
                            '/dashboard/instituciones/:institucion_id/matriculas/crear/subir-datos',
                        },
                        {
                          name: 'dashboard-instituciones-one-matriculas-crear-listos',
                          title:
                            'Todo listo - Crear matrícula - Institución - Panel de control',
                          path: 'listos',
                          fullPath:
                            '/dashboard/instituciones/:institucion_id/matriculas/crear/listos',
                        },
                      ],
                    },
                    {
                      name: 'dashboard-instituciones-one-matriculas-one',
                      title: 'Matrícula - Institución - Panel de control',
                      dynamic: true,
                      param: 'matricula_id',
                      fullPath:
                        '/dashboard/instituciones/:institucion_id/matriculas/:matricula_id',
                      sub: [
                        {
                          name: 'dashboard-instituciones-one-matriculas-one-constancia',
                          title:
                            'Constancia - Matrícula - Institución - Panel de control',
                          path: 'constancia',
                          fullPath:
                            '/dashboard/instituciones/:institucion_id/matriculas/:matricula_id/constancia',
                          icon: FileSpreadsheet,
                        },
                        {
                          name: 'dashboard-instituciones-one-matriculas-one-horarios',
                          title:
                            'Horarios - Matrícula - Institución - Panel de control',
                          path: 'horarios',
                          fullPath:
                            '/dashboard/instituciones/:institucion_id/matriculas/:matricula_id/horarios',
                          icon: CalendarClockIcon,
                        },
                        {
                          name: 'dashboard-instituciones-one-matriculas-one-cursos',
                          title:
                            'Cursos - Matrícula - Institución - Panel de control',
                          path: 'cursos',
                          fullPath:
                            '/dashboard/instituciones/:institucion_id/matriculas/:matricula_id/cursos',
                          icon: LibraryBigIcon,
                          sub: [
                            {
                              name: 'dashboard-instituciones-one-matriculas-one-cursos-one',
                              title:
                                'Curso - Matrícula - Institución - Panel de control',
                              dynamic: true,
                              param: 'curso_id',
                              fullPath:
                                '/dashboard/instituciones/:institucion_id/matriculas/:matricula_id/cursos/:curso_id',
                            },
                          ],
                        },
                        {
                          name: 'dashboard-instituciones-one-matriculas-one-estudiantes',
                          title:
                            'Estudiantes - Matrícula - Institución - Panel de control',
                          path: 'estudiantes',
                          fullPath:
                            '/dashboard/instituciones/:institucion_id/matriculas/:matricula_id/estudiantes',
                          icon: GraduationCapIcon,
                          sub: [
                            {
                              name: 'dashboard-instituciones-one-matriculas-one-estudiantes-one',
                              title:
                                'Estudiante - Matrícula - Institución - Panel de control',
                              dynamic: true,
                              param: 'estudiante_id',
                              fullPath:
                                '/dashboard/instituciones/:institucion_id/matriculas/:matricula_id/estudiantes/:estudiante_id',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'dashboard-instituciones-crear',
          title: 'Crear institución - Panel de control',
          path: 'crear',
          fullPath: '/dashboard/instituciones/crear',
          sub: [
            {
              name: 'dashboard-instituciones-crear-bienvenido',
              title: 'Bienvenido - Crear institución - Panel de control',
              path: 'bienvenido',
              fullPath: '/dashboard/instituciones/crear/bienvenido',
            },
            {
              name: 'dashboard-instituciones-crear-nombre',
              title: 'Nombre - Crear institución - Panel de control',
              path: 'nombre',
              fullPath: '/dashboard/instituciones/crear/nombre',
            },
          ],
        },
      ],
    },
  ],
};
