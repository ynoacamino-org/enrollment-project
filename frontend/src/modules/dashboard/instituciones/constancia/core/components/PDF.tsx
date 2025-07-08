import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import type { User } from '@/modules/auth/core/types/user';
import { Button } from '@/modules/core/ui/button';

// type EnrollmentStudent = {
//   nombre: string;
//   codigo: string;
//   escuela: string;
// };

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: 'Helvetica' },
  title: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
  section: { marginBottom: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  tableHeader: { fontWeight: 'bold', backgroundColor: '#eee' },
  line: { borderBottom: '1 solid #000', marginVertical: 5 },
});

const courses = [
  { nombre: 'Cálculo en Varias Variables', seccion: 'A', creditos: 4 },
  { nombre: 'Estructura de Datos', seccion: 'B', creditos: 4 },
  { nombre: 'Base de Datos', seccion: 'A', creditos: 4 },
  { nombre: 'Inglés', seccion: 'C', creditos: 2 },
];

export default function PDF({
  user,
  // courses,
  date,
}: {
  user: User;
  // courses: EnrollmentCourse;
  date: number;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>CONSTANCIA DE MATRÍCULA</Text>

        {/* Datos del alumno */}
        <View style={styles.section}>
          <Text>
            Nombre: {user.name} {user.surname}
          </Text>
          <Text>Código: {user.email}</Text>
          <Text>Escuela: Ingenieria de Sistemas</Text>
          <Text>Fecha: {new Date(date).getTimezoneOffset()}</Text>
        </View>

        <View style={styles.line} />

        {/* Tabla de cursos */}
        <View style={styles.section}>
          <View style={[styles.row, styles.tableHeader]}>
            <Text style={{ width: '40%' }}>Curso</Text>
            <Text style={{ width: '20%' }}>Sección</Text>
            <Text style={{ width: '20%' }}>Créditos</Text>
          </View>

          {courses.map((course, i) => (
            <View key={i} style={styles.row}>
              <Text style={{ width: '40%' }}>{course.nombre}</Text>
              <Text style={{ width: '20%' }}>{course.seccion}</Text>
              <Text style={{ width: '20%' }}>{course.creditos}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export function ViewAndDownloadPDF({
  user,
  date = Date.now(),
}: {
  user: User;
  date?: number;
}) {
  return (
    <div className="flex flex-col gap-4 size-full items-center">
      <Button className="" asChild>
        <PDFDownloadLink
          document={<PDF user={user} date={date} />}
          fileName="archivo.pdf"
        >
          {({ loading }: { loading: boolean }) =>
            loading ? 'Generando PDF...' : 'Descargar PDF'
          }
        </PDFDownloadLink>
      </Button>
      <PDFViewer className="w-full h-full">
        <PDF user={user} date={date} />
      </PDFViewer>
    </div>
  );
}
