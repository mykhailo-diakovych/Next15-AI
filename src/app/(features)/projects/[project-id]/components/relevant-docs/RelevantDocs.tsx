import React, { useEffect, useMemo, useState } from "react";
import { useDebounce, useIntersectionObserver } from "@uidotdev/usehooks";
import { Minus, Plus, X } from "lucide-react";

import { IDocument } from "@features/projects/[project-id]/interfaces/docs";
import { useAnalyzeStore } from "@features/projects/[project-id]/store/analyze";
import { useFetchRelevantDocs } from "@features/projects/[project-id]/hooks/useFetchRelevantDocs";
import { RelevantFileTile } from "@features/projects/[project-id]/components/relevant-docs/RelevantFileTile";

import { Separator } from "@components/ui/separator";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { SearchInput } from "@components/shared/input/SearchInput";

import { useToast } from "@hooks/use-toast";

import { cn } from "@utils/tailwindMerge";

const SHOW_INITIAL_TAGS_COUNT = 3;

export const RelevantDocs = () => {
   const category = useAnalyzeStore((state) => state.category);
   const selectedDocs = useAnalyzeStore((state) => state.selectedDocs);
   const setSelectedDocs = useAnalyzeStore((state) => state.setSelectedDocs);
   const selectedTags = useAnalyzeStore((state) => state.selectedTags);
   const setSelectedTags = useAnalyzeStore((state) => state.setSelectedTags);
   const isComparingDocuments = useAnalyzeStore(
      (state) => state.isComparingDocsOpened,
   );
   const setIsComparingDocuments = useAnalyzeStore(
      (state) => state.setIsComparingDocsOpened,
   );
   const isRelevantDocsOpened = useAnalyzeStore(
      (state) => state.isRelevantDocsOpened,
   );
   const setIsRelevantDocsOpened = useAnalyzeStore(
      (state) => state.setIsRelevantDocsOpened,
   );

   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useFetchRelevantDocs({ tags: selectedTags });

   const { toast } = useToast();
   const [ref, entry] = useIntersectionObserver({
      threshold: 0.1, // Detect when 10% of the element is visible
   });
   const [showAllTags, setShowAllTags] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");

   const debouncedSearchTerm = useDebounce(searchQuery, 300);

   const pagesItems = data?.pages.flatMap((page) => page.items);
   const filteredItems = useMemo(() => {
      if (!debouncedSearchTerm) return pagesItems;

      return pagesItems?.filter(
         (item) =>
            item.title
               ?.toLowerCase()
               .includes(debouncedSearchTerm.toLowerCase()) ||
            item.filename
               ?.toLowerCase()
               .includes(debouncedSearchTerm.toLowerCase()),
      );
   }, [pagesItems, debouncedSearchTerm]);

   const uniqueTags = Array.from(
      new Set(pagesItems?.flatMap((item) => item.tags)),
   ).filter((tag) => !!tag);
   const tags = uniqueTags.slice(
      0,
      showAllTags ? undefined : SHOW_INITIAL_TAGS_COUNT,
   );
   const tagsCount = useMemo(() => {
      return pagesItems
         ?.flatMap((item) => item.tags)
         .filter((tag): tag is string => !!tag)
         .reduce<Record<string, number>>((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
         }, {});
   }, [pagesItems]);

   const isDocumentSelected = (document: IDocument) =>
      selectedDocs.find((doc) => doc.id === document.id);

   const handleSelectDocument = (document: IDocument) => {
      if (
         isComparingDocuments &&
         selectedDocs.length == 5 &&
         !isDocumentSelected(document)
      ) {
         toast({
            variant: "destructive",
            title: "Error",
            description: "Maximum of 5 files can be selected",
         });

         return;
      }

      if (isDocumentSelected(document)) {
         setSelectedDocs(selectedDocs.filter((doc) => doc.id !== document.id));
      } else {
         setSelectedDocs([...selectedDocs, document]);
      }
   };

   const handleCloseRelevantDocs = () => {
      setIsRelevantDocsOpened(false);
      setIsComparingDocuments(false);
      setSelectedDocs([]);
      setSelectedTags([]);
   };

   const handleTagClick = (tag: string) => {
      if (selectedTags.includes(tag)) {
         setSelectedTags(selectedTags.filter((t) => t !== tag));
      } else {
         setSelectedTags([...selectedTags, tag]);
      }
   };

   useEffect(() => {
      if (entry?.isIntersecting && hasNextPage) {
         fetchNextPage();
      }
   }, [entry, fetchNextPage, hasNextPage]);

   return (
      <section
         className={`absolute right-0 top-0 h-full w-[36rem] transform transition-all duration-300 ease-in-out 2xl:w-[48rem] ${
            isRelevantDocsOpened ? "translate-x-0" : "translate-x-full"
         }`}
      >
         <div className="flex h-full w-full flex-col overflow-hidden border-l-2 border-gray-100 bg-white p-8">
            <div className="flex items-center justify-between gap-8">
               <p className="text-2xl capitalize text-black-bean">{category}</p>
               <Button
                  variant="ghost"
                  onClick={handleCloseRelevantDocs}
                  className="flex size-7 items-center justify-center p-0"
               >
                  <X className="size-6" />
               </Button>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
               <div className="mb-4 flex items-center justify-between gap-8">
                  <h5 className="text-xl text-black-bean">Relevant Docs</h5>

                  <SearchInput
                     value={searchQuery}
                     onChange={setSearchQuery}
                     className="max-w-72"
                  />
               </div>

               <Separator className="mb-4" />

               <div className="no-scrollbar flex-1 overflow-y-auto">
                  <div className="grid grid-cols-2 content-start gap-2 2xl:grid-cols-3">
                     {filteredItems?.map((document) => (
                        <RelevantFileTile
                           key={document.id}
                           document={document}
                           handleSelectDocument={handleSelectDocument}
                           isDocumentSelected={isDocumentSelected}
                        />
                     ))}
                     {hasNextPage && (
                        <div ref={ref} className="h-1 w-full opacity-0" />
                     )}
                  </div>
                  {isFetchingNextPage && (
                     <p className="text-center text-sm">Loading more...</p>
                  )}
               </div>

               <Separator className="my-4" />

               <div className="no-scrollbar flex flex-wrap items-center gap-2 overflow-y-auto pb-4">
                  {tags.map((tag) => (
                     <Badge
                        onClick={() => handleTagClick(tag)}
                        className={cn(
                           "flex cursor-pointer items-center gap-1.5 border-lime-500 bg-lime-50 px-3 py-2 text-sm font-normal",
                           {
                              "bg-lime-200": selectedTags.includes(tag),
                           },
                        )}
                        variant="outline"
                        key={tag}
                     >
                        <span>{tag}</span>
                        {tagsCount && (
                           <p className="grid h-7 w-7 place-items-center rounded border-none bg-lime-500 p-1">
                              {tagsCount[tag]}
                           </p>
                        )}
                     </Badge>
                  ))}
                  {uniqueTags.length > SHOW_INITIAL_TAGS_COUNT && (
                     <>
                        <Separator orientation="vertical" className="h-4" />
                        <Badge
                           onClick={() =>
                              setShowAllTags((prevState) => !prevState)
                           }
                           className="cursor-pointer border-lime-500 bg-lime-50 px-3 py-2.5 text-sm font-normal"
                           variant="outline"
                        >
                           {showAllTags ? (
                              <Minus className="h-4 w-4" />
                           ) : (
                              <Plus className="h-4 w-4" />
                           )}
                        </Badge>
                     </>
                  )}
               </div>
            </div>
         </div>
      </section>
   );
};
