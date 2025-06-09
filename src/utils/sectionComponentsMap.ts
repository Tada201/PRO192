import { lazy } from 'react';

export const sectionComponentsLazyMap = {
  introduction: lazy(() => import('../components/sections/IntroductionSection')),
  introductionCourse: lazy(() => import('../components/sections/IntroductionCourseSection')),
  foundations: lazy(() => import('../components/sections/FoundationsCourseSection')),
  encapsulation: lazy(() => import('../components/sections/EncapsulationSection')),
  inheritance: lazy(() => import('../components/sections/InheritanceSection')),
  polymorphism: lazy(() => import('../components/sections/PolymorphismSection')),
  arrayofobjects: lazy(() => import('../components/sections/ArrayOfObjectsSection')),
  collection: lazy(() => import('../components/sections/CollectionsSection')),
  dynamicmemory: lazy(() => import('../components/sections/DynamicMemorySection')),
  exception: lazy(() => import('../components/sections/ExceptionSection')),
  io: lazy(() => import('../components/sections/FileIOSection')),
  welcome: lazy(() => import('../components/sections/WelcomeSection')),
  // Add more as needed
};