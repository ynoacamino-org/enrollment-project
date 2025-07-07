import { Badge } from '@/modules/core/ui/badge';
import { Button } from '@/modules/core/ui/button';
import type { EnrollmentSection } from '@/modules/dashboard/instituciones/matriculas/core/types/process';
import { UserIcon } from 'lucide-react';

// TODO: Add time for section
function SectionItem({ section }: { section: EnrollmentSection }) {
  return (
    <Button key={section.id} variant="outline" size="lg" className="p-2">
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
