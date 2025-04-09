"use client";

import React, { useState } from "react";
import {
   DndContext,
   KeyboardSensor,
   PointerSensor,
   useSensor,
   useSensors,
   closestCorners,
   DragEndEvent,
} from "@dnd-kit/core";
import {
   arrayMove,
   SortableContext,
   sortableKeyboardCoordinates,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";

import { ReportSection } from "@features/workflows/(pages)/report-writer/components/ReportSection";
import { IReportSection } from "@features/workflows/(pages)/report-writer/interfaces/report-section";
import { ReportSectionEditor } from "@features/workflows/(pages)/report-writer/components/ReportSectionEditor";
import { useReportSectionsStore } from "@features/workflows/(pages)/report-writer/store/reports";

import { Button } from "@components/ui/button";

export const ReportSectionsList = () => {
   const [editorOpen, setEditorOpen] = useState(false);
   const [currentSection, setCurrentSection] = useState<IReportSection | null>(
      null,
   );

   const sections = useReportSectionsStore((state) => state.sections);
   const setSections = useReportSectionsStore((state) => state.setSections);

   const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
         coordinateGetter: sortableKeyboardCoordinates,
      }),
   );

   const addSection = (data: { title: string; description: string }) => {
      const newSection: IReportSection = {
         id: crypto.randomUUID(),
         title: data.title,
         description: data.description,
      };
      setSections([...sections, newSection]);
   };

   const updateSection = (data: { title: string; description: string }) => {
      if (!currentSection) return;

      const updatedSections = sections.map((section) =>
         section.id === currentSection.id
            ? {
                 ...section,
                 title: data.title,
                 description: data.description,
              }
            : section,
      );

      setSections(updatedSections);
   };

   const deleteSection = (sectionId: string) => {
      const filteredSections = sections.filter(
         (section) => section.id !== sectionId,
      );

      setSections(filteredSections);
   };

   const handleEditSection = (section: IReportSection) => {
      setCurrentSection(section);
      setEditorOpen(true);
   };

   const handleAddNewSection = () => {
      setCurrentSection(null);
      setEditorOpen(true);
   };

   const handleSaveSection = (data: { title: string; description: string }) => {
      if (currentSection) {
         updateSection(data);
      } else {
         addSection(data);
      }
   };

   const getSectionPos = (id: string) =>
      sections.findIndex((section) => section.id === id);

   const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const movedSections = () => {
         const originalPos = getSectionPos(active.id as string);
         const newPos = getSectionPos(over.id as string);

         return arrayMove(sections, originalPos, newPos);
      };

      setSections(movedSections());
   };

   return (
      <div className="grid max-w-screen-md flex-1 gap-2">
         <div className="no-scrollbar grid h-[calc(100dvh-14.75rem)] max-h-[46.25rem] content-start gap-2 overflow-auto rounded-lg border border-black p-2">
            <DndContext
               sensors={sensors}
               collisionDetection={closestCorners}
               onDragEnd={handleDragEnd}
            >
               <SortableContext
                  items={sections}
                  strategy={verticalListSortingStrategy}
               >
                  {sections.map((section) => (
                     <ReportSection
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        description={section.description}
                        onEdit={() => handleEditSection(section)}
                        deleteSection={deleteSection}
                     />
                  ))}
               </SortableContext>
            </DndContext>
         </div>
         <Button
            variant="outline"
            className="h-12 w-full rounded-lg border border-black"
            onClick={handleAddNewSection}
         >
            <Plus className="!size-5 text-green-600" />
            Add Section
         </Button>
         <ReportSectionEditor
            editorOpen={editorOpen}
            setEditorOpen={setEditorOpen}
            onSave={handleSaveSection}
            defaultValues={
               currentSection
                  ? {
                       title: currentSection.title,
                       description: currentSection.description,
                    }
                  : { title: "", description: "" }
            }
         />
      </div>
   );
};
