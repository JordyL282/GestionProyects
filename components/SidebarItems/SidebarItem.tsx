import { SidebarItemProps } from "./SidebarItem.types";

export function SidebarItem({ item }: { item: SidebarItemProps }) {
  const { icon: Icon, label, href } = item;

  return (
    <a href={href} className="flex items-center p-2 hover:bg-gray-100">
      <Icon className="mr-2" />
      {label}
    </a>
  );
}
