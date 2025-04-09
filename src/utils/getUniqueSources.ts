import {
   IFile,
   IMessage,
} from "@features/projects/[project-id]/interfaces/message";

export const getUniqueSources = (messages: IMessage[]) =>
   Array.from(
      new Map(
         messages
            .flatMap((message: IMessage) => message.usedFiles || [])
            .filter((file: IFile) => file !== undefined)
            .map((file: IFile) => [file.id, file]),
      ).values(),
   );
