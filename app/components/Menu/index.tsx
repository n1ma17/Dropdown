"use client";

import React from "react";
import styles from "./Menu.module.scss";
import { Check } from "lucide-react";
import clsx from "clsx";

type Option = {
  title: string;
  icon: React.FC<{ size?: number }>;
};

type Props = {
  options: Option[];
  selectedItems: Option[];
  handleSelect: (item: Option) => void;
};

const Menu: React.FC<Props> = ({ options, selectedItems, handleSelect }) => {
  return (
    <div className={styles["menu"]}>
      {options.map((option) => (
        <div
          key={option.title}
          className={clsx(styles["menu__option"], {
            [styles["selected"]]: selectedItems.some(
              (selected) => selected.title === option.title
            ),
          })}
          onClick={() => handleSelect(option)}
        >
          <div className={styles["menu__option__content"]}>
            {option.icon && <option.icon size={18} />}
            <span>{option.title}</span>
          </div>
          {selectedItems.some(
            (selected) => selected.title === option.title
          ) && <Check size={18} />}
        </div>
      ))}
    </div>
  );
};

export default Menu;
