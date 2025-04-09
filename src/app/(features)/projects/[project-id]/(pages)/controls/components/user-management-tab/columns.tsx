"use client";

import {
   User as UserIcon,
   ShieldUser,
   CircleUserRound,
   ChevronRight,
   UserCog,
} from "lucide-react";
import { Cell, Column, ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import React, { ComponentType, ReactNode, useState } from "react";

import { RemoveUserDialog } from "@features/projects/[project-id]/(pages)/controls/components/user-management-tab/components/RemoveUserDialog";
import { UserEditor } from "@features/projects/[project-id]/(pages)/controls/components/user-management-tab/components/UserEditor";

import { Button } from "@components/ui/button";
import {
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
   DropdownMenu,
} from "@components/ui/dropdown-menu";

import { cn } from "@utils/tailwindMerge";

import { Role } from "@configs/auth-permissions";

export type User = {
   id: string;
   fullName: string;
   email: string;
   role: string;
   lastSignedIn: string;
};

const RoleIcons: Record<
   Role,
   { icon: ComponentType<React.SVGProps<SVGSVGElement>>; label: string }
> = {
   superAdmin: { icon: ShieldUser, label: "Super Admin" },
   admin: { icon: ShieldUser, label: "Admin" },
   reader: { icon: CircleUserRound, label: "Reader" },
};

export const ActionButton = ({
   icon: Icon,
   color,
   children,
   onClick,
}: {
   icon: ComponentType<React.SVGProps<SVGSVGElement>>;
   color: string;
   children: ReactNode;
   onClick?: () => void;
}) => (
   <Button
      variant="link"
      className={`flex items-center gap-1 ${color}`}
      onClick={onClick}
   >
      <Icon className="size-4" />
      <span className="text-xs font-normal">{children}</span>
   </Button>
);

const RoleFilterDropdown = ({ column }: { column: Column<User> }) => {
   const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
   const [isOpen, setIsOpen] = useState(false);

   const roleOptions: Role[] = ["superAdmin", "admin", "reader"];

   const handleRoleToggle = (role: Role) => {
      const updatedRoles = selectedRoles.includes(role)
         ? selectedRoles.filter((r) => r !== role)
         : [...selectedRoles, role];

      setSelectedRoles(updatedRoles);

      column.setFilterValue(updatedRoles.length > 0 ? updatedRoles : undefined);
   };

   const clearFilters = () => {
      setSelectedRoles([]);
      column.setFilterValue(undefined);
   };

   return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
         <DropdownMenuTrigger asChild>
            <Button
               variant="ghost"
               className="flex h-8 gap-1 p-0 data-[state=open]:bg-accent"
            >
               <span>Role</span>
               <ChevronRight
                  className={cn(
                     "ml-1 size-4 transition-transform duration-200",
                     {
                        "rotate-90": isOpen,
                     },
                  )}
               />
               {selectedRoles.length > 0 && (
                  <span className="ml-1 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
                     {selectedRoles.length}
                  </span>
               )}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="start" className="w-40">
            {roleOptions.map((role) => {
               const { icon: Icon, label } = RoleIcons[role];

               return (
                  <DropdownMenuCheckboxItem
                     key={role}
                     className="flex items-center gap-2 capitalize"
                     checked={selectedRoles.includes(role)}
                     onCheckedChange={() => handleRoleToggle(role)}
                  >
                     <Icon className="size-4" />
                     {label}
                  </DropdownMenuCheckboxItem>
               );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
               className="justify-center text-center"
               onClick={clearFilters}
            >
               Clear filters
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

const ActionsCellComponent = ({ cell }: { cell: Cell<User, unknown> }) => {
   const [openUserEditor, setOpenUserEditor] = useState(false);

   return (
      <div className="flex max-w-96 items-center gap-3">
         <RemoveUserDialog />

         <ActionButton
            icon={UserCog}
            color="text-lime-600"
            onClick={() => setOpenUserEditor(true)}
         >
            Edit User Role
         </ActionButton>

         <UserEditor
            open={openUserEditor}
            setOpen={setOpenUserEditor}
            defaultValues={{
               email: cell.row.original.email,
               role: cell.row.original.role,
            }}
         />
      </div>
   );
};

export const columns: ColumnDef<User>[] = [
   {
      accessorKey: "fullName",
      header: "Full Name",
      cell: ({ row }) => (
         <div className="flex min-w-40 items-center gap-2">
            <UserIcon className="size-4" />
            <span className="text-sm font-medium">
               {row.getValue("fullName")}
            </span>
         </div>
      ),
   },
   {
      accessorKey: "email",
      header: "Email Address",
   },
   {
      accessorKey: "role",
      header: ({ column }) => <RoleFilterDropdown column={column} />,
      filterFn: (row, id, value: any) => {
         // If no filter value is set, show all rows
         if (!value || value.length === 0) return true;

         // Check if the row's role is in the array of selected roles
         const rowValue = row.getValue(id) as string;
         return value.includes(rowValue);
      },
      cell: ({ row }) => {
         const role: Role = row.getValue("role");
         const RoleComponent: {
            icon: ComponentType<React.SVGProps<SVGSVGElement>>;
            label: string;
         } = RoleIcons[role];

         return RoleComponent ? (
            <div className="flex min-w-40 items-center gap-2">
               <RoleComponent.icon className="size-4" />
               <span className="text-sm">{RoleComponent.label}</span>
            </div>
         ) : null;
      },
   },
   {
      accessorKey: "lastSignedIn",
      header: "Last Signed In",
      cell: ({ row }) => (
         <p className="min-w-50 text-sm text-old-silver">
            {format(row.getValue("lastSignedIn"), "hh:mma 'on' dd.MM.yyyy")}
         </p>
      ),
   },
   {
      id: "actions",
      header: () => <p className="ml-5 text-left">Actions</p>,
      cell: ({ cell }) => <ActionsCellComponent cell={cell} />,
   },
];
