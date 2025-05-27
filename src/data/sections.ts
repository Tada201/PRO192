import  { Book, Code, Database, FileCode, GitBranch, Layers, Package, Shield, BookOpen, FileText, FolderOpen, AlertTriangle } from 'lucide-react';

export interface Section {
  id: string;
  icon: any;
  translationKey: string;
}

export const sections: Section[] = [
  {
    id: "welcome",
    icon: Book,
    translationKey: "welcome"
  },
  {
    id: "introductionCourse",
    icon: BookOpen,
    translationKey: "introductionCourse"
  },
  {
    id: "foundations",
    icon: Code,
    translationKey: "foundations"
  },
  {
    id: "encapsulation",
    icon: Shield,
    translationKey: "encapsulation"
  },
  {
    id: "inheritance",
    icon: GitBranch,
    translationKey: "inheritance"
  },
  {
    id: "polymorphism",
    icon: Layers,
    translationKey: "polymorphism"
  },
  {
    id: "arrayofobjects",
    icon: Package,
    translationKey: "arrayOfObjects"
  },
  {
    id: "collection",
    icon: FolderOpen,
    translationKey: "collections"
  },
  {
    id: "dynamicmemory",
    icon: Database,
    translationKey: "dynamicMemory"
  },
  {
    id: 'exception',
    icon: AlertTriangle,
    translationKey: 'exception'
  },
  {
    id: "io",
    icon: FileText,
    translationKey: "fileIO"
  }
];
