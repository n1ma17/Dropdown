"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./DropDown.module.scss";
import { ChevronDown, PlusCircle } from "lucide-react";
import clsx from "clsx";
import Menu from "../Menu";

type Option = {
  title: string;
  icon: React.FC<{ size?: number }>;
};

type Props = {
  options: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  selectedItems: Option[];
  onNewItem: (newItem: Option) => void;
};

const DropDown: React.FC<Props> = ({
  options,
  onChange,
  placeholder = "Select...",
  onNewItem,
  selectedItems,
}) => {
  const [menuOptions, setMenuOptions] = useState<Option[]>(options);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOptions(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: Option) => {
    const isSelected = selectedItems.some(
      (selected) => selected.title === item.title
    );
    const newSelected = isSelected
      ? selectedItems.filter((selected) => selected.title !== item.title)
      : [...selectedItems, item];

    onChange(newSelected);
  };

  const handleAddNewItem = () => {
    if (inputValue.trim() === "") return;

    const newItem: Option = { title: inputValue.trim(), icon: PlusCircle };

    if (!menuOptions.some((option) => option.title === newItem.title)) {
      setMenuOptions([...menuOptions, newItem]);
      onNewItem(newItem);
    }

    handleSelect(newItem);

    setInputValue("");
  };


  return (
    <div
      className={clsx(styles["drop-down"], {
        [styles["focused"]]: isFocused || isDropdownOpen,
      })}
      ref={dropdownRef}
      onClick={() => setIsDropdownOpen(true)}
    >
      <div className={styles["drop-down__input"]}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddNewItem()}
          placeholder={placeholder}
          onFocus={() => {
            setIsFocused(true);
            setIsDropdownOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          onClick={(e) => e.stopPropagation()}
        />
        <ChevronDown
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen((prev) => !prev);
          }}
          className={clsx(styles["drop-down__arrow"], {
            [styles["open"]]: isDropdownOpen,
          })}
        />
      </div>
      {isDropdownOpen && (
        <Menu
          options={menuOptions}
          selectedItems={selectedItems}
          handleSelect={(e) => handleSelect(e)}
        />
      )}
    </div>
  );
};

export default DropDown;
