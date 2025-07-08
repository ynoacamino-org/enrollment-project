import type { EnrollmentSection } from '@/modules/dashboard/instituciones/matriculas/core/types/process';
import { createContext, useContext } from 'react';

type CourseItemContextType = {
  isSelected: boolean;
  toggleIsSelected: () => void;
  selected: EnrollmentSection | null;
  setSelected: (section: EnrollmentSection | null) => void;
};

type CourseItemProviderProps = CourseItemContextType & {
  children: React.ReactNode;
};

const CourseItemContext = createContext<CourseItemContextType | undefined>(
  undefined,
);

const useCourseItem = () => {
  const context = useContext(CourseItemContext);
  if (!context) {
    throw new Error('useCourseItem must be used within a CourseItemProvider');
  }
  return context;
};

function CourseItemProvider({
  children,
  selected,
  isSelected,
  toggleIsSelected,
  setSelected,
}: CourseItemProviderProps) {
  return (
    <CourseItemContext.Provider
      value={{ isSelected, toggleIsSelected, selected, setSelected }}
    >
      {children}
    </CourseItemContext.Provider>
  );
}

export { CourseItemProvider, useCourseItem };
