import React, { useEffect, useState } from "react";
import Sort from "@/assets/icons/sort-icon";

type DropdownPropsType = {
  onSelect: (key: any) => void;
  dropdownList: {[key: string]: String};
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
        relative
        flex items-center gap-1
        text-snow cursor-pointer"
      onClick={() => toggleShowList(!showList)}
    >
      {children}
      {
        showList &&
        <div
          className="dropdown-list absolute top-8 right-0
          flex flex-col items-start gap-2
          w-44
          p-3
          bg-rich-black rounded-sm"
        >
          {
            Object.entries(dropdownList).map(([key, val], i) => {
              return (
                <span key={key}
                  onClick={e => onSelect(key)}
                >
                  {val}
                </span>
              )
            })
          }
        </div>
      }
    </div>
  );
}
