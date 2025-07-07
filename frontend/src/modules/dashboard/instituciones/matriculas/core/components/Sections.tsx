import { Badge } from '@/modules/core/ui/badge';
import { Button } from '@/modules/core/ui/button';
import { useCourseItem } from '@/modules/dashboard/instituciones/matriculas/core/components/CourseItemContext';
import type { EnrollmentSection } from '@/modules/dashboard/instituciones/matriculas/core/types/process';
import { UserIcon } from 'lucide-react';

// TODO: Add time for section
function SectionItem({ section }: { section: EnrollmentSection }) {
  const { selected, setSelected } = useCourseItem();
  return (
    <Button
      key={section.id}
      variant={selected?.id === section.id ? 'accent' : 'outline'}
      disabled={section.taken_places >= section.total_places}
      size="lg"
      className="p-2"
      onClick={() => selected?.id !== section.id && setSelected(section)}
    >
      <span className="text-2xl text-primary">{section.section_name}</span>
      <Badge variant="secondary">
        <UserIcon />
        {section.taken_places < 10
          ? '0' + section.taken_places
          : section.taken_places}{' '}
        / {section.total_places}
      </Badge>
    </Button>
  );
}

function Sections({ sections }: { sections: EnrollmentSection[] }) {
  return (
    <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
      {sections.map((section) => (
        <SectionItem key={section.id} section={section} />
      ))}
    </div>
  );
}

export { Sections };
