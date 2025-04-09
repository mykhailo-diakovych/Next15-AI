import { ProjectDetailsTab } from "@features/projects/[project-id]/(pages)/controls/components/project-details-tab/ProjectDetailsTab";
import { FileManagementTab } from "@features/projects/[project-id]/(pages)/controls/components/file-management-tab/FileManagementTab";
import { UserManagementTab } from "@features/projects/[project-id]/(pages)/controls/components/user-management-tab/UserManagementTab";

export const tabs = [
   {
      name: "Project Details",
      value: "project-details",
      content: <ProjectDetailsTab />,
   },
   {
      name: "User Management",
      value: "user-management",
      content: <UserManagementTab />,
   },
   {
      name: "File Management",
      value: "file-management",
      content: <FileManagementTab />,
   },
];
