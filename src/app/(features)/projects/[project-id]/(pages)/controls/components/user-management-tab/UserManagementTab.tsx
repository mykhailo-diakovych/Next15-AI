import React, { Suspense, useState } from "react";
import { FilePlus2 } from "lucide-react";

import { DataTable } from "@features/projects/[project-id]/(pages)/controls/components/user-management-tab/data-table";
import {
   columns,
   User,
} from "@features/projects/[project-id]/(pages)/controls/components/user-management-tab/columns";
import { UserEditor } from "@features/projects/[project-id]/(pages)/controls/components/user-management-tab/components/UserEditor";

import { SmallLoader } from "@components/shared/loader/SmallLoader";
import { Button } from "@components/ui/button";

export const users: User[] = [
   {
      id: "1",
      fullName: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      lastSignedIn: "2025-03-30T12:45:00Z",
   },
   {
      id: "2",
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      role: "reader",
      lastSignedIn: "2025-03-29T09:15:00Z",
   },
   {
      id: "3",
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "superAdmin",
      lastSignedIn: "2025-03-28T17:30:00Z",
   },
   {
      id: "4",
      fullName: "Bob Brown",
      email: "bob.brown@example.com",
      role: "admin",
      lastSignedIn: "2025-03-27T14:10:00Z",
   },
   {
      id: "5",
      fullName: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      role: "reader",
      lastSignedIn: "2025-03-26T08:55:00Z",
   },
   {
      id: "6",
      fullName: "David Miller",
      email: "david.miller@example.com",
      role: "superAdmin",
      lastSignedIn: "2025-03-25T19:20:00Z",
   },
   {
      id: "7",
      fullName: "Emma Davis",
      email: "emma.davis@example.com",
      role: "admin",
      lastSignedIn: "2025-03-24T15:40:00Z",
   },
   {
      id: "8",
      fullName: "Frank Thomas",
      email: "frank.thomas@example.com",
      role: "reader",
      lastSignedIn: "2025-03-23T11:05:00Z",
   },
   {
      id: "9",
      fullName: "Grace Lee",
      email: "grace.lee@example.com",
      role: "superAdmin",
      lastSignedIn: "2025-03-22T22:10:00Z",
   },
   {
      id: "10",
      fullName: "Henry Clark",
      email: "henry.clark@example.com",
      role: "admin",
      lastSignedIn: "2025-03-21T07:25:00Z",
   },
];

export const UserManagementTab = () => {
   const [openUserEditor, setOpenUserEditor] = useState(false);

   return (
      <div className="relative resize-none p-6">
         <Button
            variant="outline"
            className="absolute -top-12 right-0 flex items-center gap-1 border-lime-500 bg-lime-50"
            onClick={() => {
               setOpenUserEditor(true);
            }}
         >
            <FilePlus2 className="size-4" />
            <span>Add User</span>
         </Button>

         <Suspense fallback={<SmallLoader className="scale-125" />}>
            <DataTable columns={columns} data={users} />
         </Suspense>

         <UserEditor open={openUserEditor} setOpen={setOpenUserEditor} />
      </div>
   );
};
