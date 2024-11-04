import React, { useEffect, useState } from "react";
import Sort from "@/assets/icons/sort-icon";

type DropdownPropsType = {
  onSelect: () => void;
  dropdownList: string[];
  children: React.ReactNode
};

export default function Dropdown({
  onSelect,
  dropdownList,
  children
}: DropdownPropsType) {
  const [showList, toggleShowList] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("click", (e: MouseEvent) => {});
  }, []);

  return (
    <div
      className="sort-icon-wrapper
        flex items-center gap-1
        text-snow cursor-pointer"
      onClick={() => toggleShowList(!showList)}
    >
      {children}
    </div>
  );
}
