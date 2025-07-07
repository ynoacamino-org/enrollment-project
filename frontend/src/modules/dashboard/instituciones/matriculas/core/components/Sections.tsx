import { cn } from '@/modules/core/lib/utils';
import { Badge } from '@/modules/core/ui/badge';
import { Checkbox } from '@/modules/core/ui/checkbox';
import { useCourseItem } from '@/modules/dashboard/instituciones/matriculas/core/components/CourseItemContext';
import type { EnrollmentSection } from '@/modules/dashboard/instituciones/matriculas/core/types/process';
import { TicketsIcon } from 'lucide-react';

function SectionItem({ section }: { section: EnrollmentSection }) {
  const { selected, setSelected } = useCourseItem();
  return (
    <div
      className={cn('flex border rounded-md p-2 items-center gap-x-2', {
        'bg-accent': selected?.id === section.id,
        'bg-secondary': section.taken_places >= section.total_places,
        'cursor-pointer': !section.taken_places || selected?.id === section.id,
      })}
    >
      <Checkbox
        className="border-muted-foreground"
        checked={selected?.id === section.id}
        disabled={section.taken_places >= section.total_places}
        onCheckedChange={() =>
          setSelected(selected?.id === section.id ? null : section)
        }
      />
      <span className="text-2xl text-primary">{section.section_name}</span>
      <Badge variant="secondary">
        <TicketsIcon />
        {section.total_places - section.taken_places}
      </Badge>
      {/* TODO: Events on dialog */}
    </div>
  );
}

function Sections({ sections }: { sections: EnrollmentSection[] }) {
  return (
    <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
      {sections.map((section) => (
        <SectionItem key={section.id} section={section} />
      ))}
    </div>
  );
}

export { Sections };
